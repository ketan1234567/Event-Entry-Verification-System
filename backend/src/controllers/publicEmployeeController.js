const pool = require('../config/db');

async function verifyEmployee(req, res, next) {
  try {
    const { employeeId } = req.body;

    if (!employeeId) {
      return res.status(400).json({ error: 'EMPLOYEE_ID_REQUIRED' });
    }

    const [rows] = await pool.execute(
      'SELECT id, employee_id, first_name, last_name, department, status FROM employees WHERE employee_id = ?',
      [employeeId.trim()]
    );

    if (!rows.length || rows[0].status !== 'active') {
      return res.status(404).json({ error: 'EMPLOYEE_NOT_FOUND_OR_BLOCKED' });
    }

    return res.json({ employee: rows[0] });
  } catch (err) {
    return next(err);
  }
}

module.exports = { verifyEmployee };
