const pool = require('../config/db'); // Your promise-based pool

// Helper function to expire code (Internal)
const checkAndExpireCode = async (codeId) => {
    try {
        // 1. Check if the code is still active
        const [rows] = await pool.query("SELECT * FROM gate_passes WHERE id = ? AND is_active = 1", [codeId]);

        if (rows.length > 0) {
            // 2. If active, it means it wasn't used. Expire it.
            await pool.query("UPDATE gate_passes SET is_active = 0, is_used = 'expired' WHERE id = ?", [codeId]);
            console.log(`Code ID ${codeId} expired after 50 seconds.`);
        }
    } catch (error) {
        console.error("Error in expiration check:", error);
    }
};

// Controller: Generate and Fetch a Gate Pass
const getGatePass = async (req, res) => {

    //console.log("USER:🛺🛺🚕",req.user);

    try {
        // 1. Find an available code
        //Pahila - const findSql = "SELECT * FROM gate_passes WHERE is_active = 0 AND is_used IS NULL LIMIT 1";
        const findSql = "SELECT * FROM gate_passes WHERE is_active = 0 AND is_used IS NULL ORDER BY RAND() LIMIT 1";

        const [results] = await pool.query(findSql);

        if (results.length === 0) {
            return res.status(404).json({ error: "No available codes found" });
        }


        const gateRole = req.user.role;//Taken from access token
        const codeRow = results[0];
        const codeId = codeRow.id;
        const gateCode = codeRow.gate_code;

        // 2. Update code: Set is_active = 1 and generated_on = NOW()
        const updateSql = "UPDATE gate_passes SET is_active = 1, gate_role= ?, generated_on = NOW() WHERE id = ?";
        await pool.query(updateSql, [gateRole, codeId]);

        // Return the code to the frontend
        res.json({
            success: true,
            code: gateCode,
            id: codeId
        });

        // 3. Set the 50-second Expiration Timer (Run in background)
        setTimeout(() => {
            checkAndExpireCode(codeId);
        }, 50000);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
};

// Controller: Verify Code
// Controller: Verify Code
const verifyCode = async (req, res) => {
    try {
        // 1. Get inputs (added gate_number)
        const { code, employeeId } = req.body;

        // 2. Get a connection from the pool
        const connection = await pool.getConnection();

        try {
            // 3. Start the Transaction
            await connection.beginTransaction();

            // 4. Check if code exists and is active
            const sql = "SELECT * FROM gate_passes WHERE gate_code = ? AND is_active = 1";
            const [results] = await connection.execute(sql, [code]);

            if (results.length > 0) {
                const codeData = results[0];

                // 5. Mark Gate Pass as Used (FIXED: Use NOW() for DATETIME)
                const updateSql = "UPDATE gate_passes SET is_used = NOW(), is_active = 0 WHERE id = ?";
                await connection.execute(updateSql, [codeData.id]);

                // ==========================================
                // 6. CHECK EMPLOYEE STATUS & LOGIC
                // ==========================================
                
                if (employeeId) {
                    // Check if employee is currently inside (has entry but no exit)
                    const [existingLogs] = await connection.execute(
                        "SELECT id FROM entry_logs WHERE employee_id = ?   ORDER BY id DESC LIMIT 1",
                        [employeeId]
                    );

                    if (existingLogs.length > 0) {
                        // CASE: ALREADY EXISTS -> UPDATE (Mark Exit)
                        const logId = existingLogs[0].id;
                        await connection.execute(
                            `UPDATE entry_logs 
                             SET entry_time = NOW(), status = 'entered', gate_code = ? 
                             WHERE id = ?`,
                            [code, logId]
                        );
                    } else {
                        // CASE: NOT EXISTS -> INSERT (Mark Entry)
                        await connection.execute(
                            `INSERT INTO entry_logs 
                            (employee_id, gate_code, verification_method, status,entry_time) 
                            VALUES (?,  ?, 'Gate Pass', 'entered', NOW())`,
                            [employeeId, code]
                        );
                    }
                } else {
                   throw new Error('employeeId not passed to api.');
                }

                // 7. Commit the Transaction
                await connection.commit();

                res.json({ success: true, message: "Code Verified!" });
            } else {
                await connection.rollback();
                res.status(400).json({ success: false, message: "Invalid or Expired Code" });
            }
        } catch (err) {
            await connection.rollback();
            console.error(err);
            res.status(500).json({ error: "DB Error" });
        } finally {
            connection.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Connection Error" });
    }
};

module.exports = {
    getGatePass,
    verifyCode
};