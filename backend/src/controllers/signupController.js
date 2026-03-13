// backend/src/controllers/signupSelfieController.js
const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

async function signupSelfie(req, res, next) {
  try {
    const { employeeId, selfieData } = req.body;

    if (!employeeId || !selfieData) {
      return res.status(400).json({ error: 'MISSING_FIELDS' });
    }

    const matches = selfieData.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({ error: 'INVALID_IMAGE_DATA' });
    }
    const mimeType = matches[1];
    const base64Data = matches[2];

    let ext = '.png';
    if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') ext = '.jpg';
    if (mimeType === 'image/webp') ext = '.webp';

    const uploadsDir = path.join(__dirname, '..', '..', 'uploads', 'selfies');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const fileName = `selfie_${employeeId}_${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

    const relativePath = path.join('uploads', 'selfies', fileName).replace(/\\/g, '/');

    await pool.execute(
      'INSERT INTO employee_selfies (employee_id, selfie_path) VALUES (?, ?)',
      [employeeId, relativePath]
    );

    res.json({ success: true, selfiePath: relativePath });
  } catch (err) {
    next(err);
  }
}

module.exports = { signupSelfie };