const pool = require('../config/db');




async function checkEmployeeExists(req, res) {

    // const { emp_id } = req.params.id;

    const emp_id = req.params.id;

//console.log(emp_id);

    if (!emp_id) {
        return res.status(400).json({
            message: "Employee ID is required"
        });
    }

    try {
        // ✅ UPDATED: Added 'id' to the SELECT list
        const [rows] = await pool.query(
            "SELECT id, emp_id, name, photo FROM employees WHERE emp_id = ?",
            [emp_id]
        );

        if (rows.length > 0) {
            return res.json({
                exists: true,
                employee: rows[0] // Now returns: { id, emp_id, name, photo }
            });
        }

        res.json({
            exists: false
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Database error"
        });
    }
}

module.exports = { checkEmployeeExists };