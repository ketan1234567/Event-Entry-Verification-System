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

module.exports = { loginCheck };