// backend/src/controllers/gateCodeController.js
const pool = require('../config/db');

async function verifyGateCode(req, res, next) {
  try {
    const { employeeId, gateCode } = req.body;

    if (!employeeId || !gateCode) {
      return res.status(400).json({ error: 'MISSING_FIELDS' });
    }

    const now = new Date();

    const [rows] = await pool.execute(
      `SELECT id, expires_at, used
         FROM employee_gate_codes
        WHERE employee_id = ? AND gate_code = ?
        ORDER BY created_at DESC
        LIMIT 1`,
      [employeeId, gateCode]
    );

    if (!rows.length) {
      return res.status(400).json({ error: 'INVALID_CODE' });
    }

    const record = rows[0];

    if (record.used) {
      return res.status(400).json({ error: 'CODE_ALREADY_USED' });
    }

    if (new Date(record.expires_at) < now) {
      return res.status(400).json({ error: 'CODE_EXPIRED' });
    }

    // Mark as used
    await pool.execute(
      'UPDATE employee_gate_codes SET used = 1 WHERE id = ?',
      [record.id]
    );

    // Return minimal info for success page redirect
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { verifyGateCode };