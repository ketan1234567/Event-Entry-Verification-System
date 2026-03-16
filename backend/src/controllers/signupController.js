// backend/src/controllers/signupSelfieController.js

const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

// --- 1. Signup Function ---
async function signupSelfie(req, res, next) {
  try {
    const { employeeId, selfieData } = req.body;

    if (!employeeId || !selfieData) {
      return res.status(400).json({ error: 'MISSING_FIELDS' });
    }

    // Validate Base64 image
    const matches = selfieData.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({ error: 'INVALID_IMAGE_DATA' });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    let ext = '.jpg';
    if (mimeType === 'image/png') ext = '.png';
    if (mimeType === 'image/webp') ext = '.webp';

    const uploadsDir = path.join(__dirname, '..', '..', 'uploads', 'selfies');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const fileName = `selfie_${employeeId}_${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
    const relativePath = `uploads/selfies/${fileName}`;

    // Check Duplicate
    const [rows] = await pool.execute(
      'SELECT id FROM employee_selfies WHERE employee_id = ?',
      [employeeId]
    );

    if (rows.length > 0) {
      return res.status(400).json({
        error: 'Employee_ID_already_exists',
        message: 'Employee ID already exists.'
      });
    }

    // Insert New Record
    await pool.execute(
      'INSERT INTO employee_selfies (employee_id, selfie_path) VALUES (?, ?)',
      [employeeId, relativePath]
    );

    res.json({
      success: true,
      message: 'Selfie stored successfully',
      selfiePath: relativePath
    });

  } catch (err) {
    console.error(err);
    next(err);
  }
}

// --- 2. Check Employee ID Function (NEW) ---
async function checkEmployeeId(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'ID_REQUIRED' });
    }

    const [rows] = await pool.execute(
      'SELECT id FROM employee_selfies WHERE employee_id = ?',
      [id]
    );

    if (rows.length > 0) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'SERVER_ERROR' });
  }
}



// --- EXPORT BOTH FUNCTIONS ---
module.exports = { signupSelfie, checkEmployeeId };