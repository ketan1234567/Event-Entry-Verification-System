// GET /get-employee-id - fetch employee ID and name from employees (signup) table
const pool = require('../config/db'); // You named it 'pool'

async function getEmployeeId(req, res) {
    const { employeeId } = req.query;

    if (!employeeId) {
        return res.status(400).json({ error: 'Employee ID is required' });
    }

    try {
        // Correct SQL query
        const query = 'SELECT employeeId, name FROM employees WHERE employeeId = ?';
        
        // ✅ FIX: Use 'pool' here, not 'db'
        const [rows] = await pool.query(query, [employeeId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const employee = rows[0];

        res.json({
            employeeId: employee.employeeId,
            name: employee.name 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
}

module.exports = { getEmployeeId };