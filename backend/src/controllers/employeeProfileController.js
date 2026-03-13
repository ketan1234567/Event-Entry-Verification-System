// backend/src/controllers/employeeProfileController.js
const pool = require('../config/db');

async function getEmployeeProfile(req, res, next) {
  try {
    const { employeeId } = req.query;
    if (!employeeId) {
      return res.status(400).json({ error: 'EMPLOYEE_ID_REQUIRED' });
    }

    const [rows] = await pool.execute(
      `SELECT e.employee_id, e.first_name, e.last_name,
              s.selfie_path
       FROM employees e
       LEFT JOIN employee_selfies s
         ON s.employee_id = e.employee_id
       WHERE e.employee_id = ?
       ORDER BY s.created_at DESC
       LIMIT 1`,
      [employeeId]
    );

    if (!rows.length) {
      return res.status(404).json({ error: 'EMPLOYEE_NOT_FOUND' });
    }

    const emp = rows[0];
    const fullName = [emp.first_name, emp.last_name].filter(Boolean).join(' ');

    res.json({
      employeeId: emp.employee_id,
      fullName,
      selfiePath: emp.selfie_path || null,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getEmployeeProfile };