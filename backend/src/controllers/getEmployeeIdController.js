// GET /get-employee-id - fetch employee ID and name from employees (signup) table
const pool = require('../config/db');

async function getEmployeeId(req, res, next) {
  try {
    const { employeeId } = req.query;

    if (!employeeId) {
      return res.status(400).json({ error: 'EMPLOYEE_ID_REQUIRED' });
    }

    const [rows] = await pool.execute(
      `SELECT employee_id, first_name, last_name
       FROM employees
       WHERE employee_id = ?`,
      [employeeId.trim()]
    );

    if (!rows.length) {
      return res.status(404).json({ error: 'EMPLOYEE_NOT_FOUND' });
    }

    const emp = rows[0];
    const name = [emp.first_name, emp.last_name].filter(Boolean).join(' ').trim() || null;

    res.json({
      employeeId: emp.employee_id,
      name: name || emp.employee_id,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getEmployeeId };
