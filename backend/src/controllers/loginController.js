const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db')
const mysql = require('mysql2/promise'); // Use promise wrapper for async/await

const JWT_SECRET = 'ondirect_super_secret_key_2024_secure_!@#$';

const loginCheck = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find user in Database
        const [rows] = await pool.query('SELECT * FROM admin WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const user = rows[0];

        // 2. Compare Password (Plain text vs Hashed DB password)
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // 3. Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role }, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );

        // 4. Send Response
        res.json({
            success: true,
            message: 'Login successful',
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// --- NEW FUNCTION TO ADD ---
const getMe = async (req, res) => {
    try {
        // req.user is set by the authMiddleware
        const user = req.user; 

        // Optionally fetch fresh data from DB
        const [rows] = await pool.query('SELECT id, username, email, role FROM admin WHERE id = ?', [user.id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ 
            success: true, 
            user: rows[0] 
        });

    } catch (error) {
        console.error('GetMe Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getVerificationLogs = async (req, res) => {
    try {
        // ✅ UPDATED SQL: Join using 'emp_id' instead of 'id'
        const sql = `
            SELECT 
                el.id, 
                el.employee_id, 
                el.entry_time, 
                el.status, 
                el.gate_code, 
                e.name AS employee_name,
                e.emp_id
            FROM entry_logs el
            LEFT JOIN employees e ON el.employee_id = e.emp_id 
            ORDER BY el.entry_time DESC
        `;

        const [rows] = await pool.query(sql);

        const formattedLogs = rows.map(log => {
            // If name is still null, display Visitor
            const displayName = log.employee_name || 'Visitor';
            const logId = `#LOG${String(log.id).padStart(3, '0')}`;

            return {
                ...log,
                employee_name: displayName,
                log_id: logId
            };
        });

        res.json({
            success: true,
            data: formattedLogs
        });

    } catch (error) {
        console.error("Error fetching logs:", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = { getVerificationLogs };


module.exports = { loginCheck,getMe,getVerificationLogs };