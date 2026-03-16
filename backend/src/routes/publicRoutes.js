const express = require('express');
const router = express.Router();
const { verifyEmployee } = require('../controllers/publicEmployeeController');
const { signupSelfie,checkEmployeeId } = require('../controllers/signupController');
const { getEmployeeProfile } = require('../controllers/employeeProfileController');
const { verifyGateCode } = require('../controllers/gateCodeController');
const { getEmployeeId } = require('../controllers/getEmployeeIdController');


// NEW: Route to check ID existence
// GET check employee ID
router.get('/check-employee/:id', checkEmployeeId);

router.get('/employee/profile', getEmployeeProfile);
router.get('/get-employee-id', getEmployeeId);
router.post('/gate/verify-code', verifyGateCode);

router.post('/employee/verify', verifyEmployee);
router.post('/signup', signupSelfie);

// In your Node.js routes file (e.g., routes/public.js)

module.exports = router;
