const express = require('express');
const router = express.Router();

// Import Middleware
const authMiddleware = require('../middleware/authMiddleware');

// Import Controllers
const { loginCheck } = require('../controllers/loginController');
const { verifyEmployee } = require('../controllers/publicEmployeeController');
const { signupSelfie, checkEmployeeId } = require('../controllers/signupController');
const { getEmployeeProfile } = require('../controllers/employeeProfileController');
const { verifyGateCode } = require('../controllers/gateCodeController');
const { getEmployeeId } = require('../controllers/getEmployeeIdController');

// ---------------------------------------------------------
// PUBLIC ROUTES (No Middleware needed)
// ---------------------------------------------------------
router.post('/login', loginCheck);          // Anyone can access
router.post('/signup', signupSelfie);       // Anyone can access
router.get('/check-employee/:id', checkEmployeeId); // Public check

// ---------------------------------------------------------
// PROTECTED ROUTES (Add authMiddleware as 2nd argument)
// ---------------------------------------------------------

// Example: Only logged-in users can verify employees
router.post('/employee/verify', authMiddleware, verifyEmployee);

// Example: Only logged-in users can get profile
router.get('/employee/profile', authMiddleware, getEmployeeProfile);

router.get('/get-employee-id', authMiddleware, getEmployeeId);
router.post('/gate/verify-code', authMiddleware, verifyGateCode);

module.exports = router;