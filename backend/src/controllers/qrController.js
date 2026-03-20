const jwt = require("jsonwebtoken");
const QRCode = require("qrcode");
const pool = require("../config/db");

const JWT_SECRET = "ondirect_super_secret_key_2024_secure_!@#$";

// 1. Generate QR (Existing Function)
async function generateQR(req, res) {
  const { emp_id } = req.body;

  if (!emp_id) {
    return res.status(400).json({
      success: false,
      message: "Employee ID required"
    });
  }

  try {
    const [rows] = await pool.query(
      "SELECT * FROM employees WHERE emp_id = ?",
      [emp_id]
    );

    if (rows.length === 0) {
      return res.json({
        success: false,
        message: "Employee not found"
      });
    }

    const employee = rows[0];
    const employeeDbId = employee.id; // Important: Use DB ID

    const token = jwt.sign(
      { emp_id },
      JWT_SECRET,
      { expiresIn: "30s" }
    );

    const expires_at = new Date(Date.now() + 30 * 1000);

    await pool.query(
      `INSERT INTO qr_tokens 
      (employee_id, token, status, expires_at)
      VALUES (?, ?, ?, ?)`,
      [employeeDbId, token, "active", expires_at]
    );

    const qr = await QRCode.toDataURL(token);

    res.json({
      success: true,
      qr_code: qr,
      token: token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

// 2. NEW: Verify QR Scan & Log Entry
async function verifyQRScan(req, res) {
  const { token, gate_number } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, message: "Token is required" });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Step 1: Verify JWT Token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      await connection.rollback();
      return res.status(401).json({ success: false, message: "Invalid or Expired Token" });
    }

    // Step 2: Check if Token exists and is Active in DB (Prevent Reuse)
    const [tokenRows] = await connection.execute(
      `SELECT * FROM qr_tokens WHERE token = ? AND status = 'active' AND expires_at > NOW()`,
      [token]
    );

    if (tokenRows.length === 0) {
      await connection.rollback();
      return res.json({ success: false, message: "QR Code Already Used or Expired" });
    }

    const tokenData = tokenRows[0];
    const employeeDbId = tokenData.employee_id;

    // Step 3: Get Employee Details (for response)
    const [empRows] = await connection.execute(
      `SELECT emp_id, name FROM employees WHERE id = ?`,
      [employeeDbId]
    );

    if (empRows.length === 0) {
      await connection.rollback();
      return res.json({ success: false, message: "Employee not found" });
    }

    const employee = empRows[0];

    // Step 4: Insert into entry_logs
    await connection.execute(
      `INSERT INTO entry_logs (employee_id, entry_status, verification_method, gate_number) 
       VALUES (?, 'entered', 'QR Code', ?)`,
      [employeeDbId, gate_number || null]
    );

    // Step 5: Mark Token as Used
    await connection.execute(
      `UPDATE qr_tokens SET status = 'used' WHERE id = ?`,
      [tokenData.id]
    );

    // Commit Transaction
    await connection.commit();

    res.json({
      success: true,
      message: "Entry Verified Successfully",
      employee: {
        id: employee.emp_id,
        name: employee.name
      }
    });

  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  } finally {
    connection.release();
  }
}

module.exports = {
  generateQR,
  verifyQRScan
};