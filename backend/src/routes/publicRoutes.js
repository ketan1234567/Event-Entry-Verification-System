const express = require('express');
const router = express.Router();

// Import Middleware
const authMiddleware = require('../middleware/authMiddleware');



// Import Controllers
const { loginCheck, getMe,getVerificationLogs } = require('../controllers/loginController');
const { verifyEmployee } = require('../controllers/publicEmployeeController');
const { signupSelfie, checkEmployeeId } = require('../controllers/signupController');
const { getEmployeeProfile } = require('../controllers/employeeProfileController');
const { verifyGateCode } = require('../controllers/gateCodeController');

// ⚠️ IMPORTANT: Ensure this function is actually exported in getEmployeeIdController.js
const { checkEmployeeExists } = require('../controllers/getEmployeeIdController');

// QR Controller
const { generateQR,verifyQRScan } = require('../controllers/qrController');

// Gate Pass Controller
// ⚠️ IMPORTANT: Ensure this filename matches your actual file (e.g. getPasssgenerateController.js)
const { getGatePass, verifyCode } = require('../controllers/getPasssgenerateController');

// ---------------------------------------------------------
// PUBLIC ROUTES
// ---------------------------------------------------------
router.post('/login', loginCheck);   
router.get('/me', authMiddleware, getMe);       
router.post('/signup', signupSelfie);       
//router.get('/check-employee/:id', checkEmployeeId); 

// ---------------------------------------------------------
// PROTECTED ROUTES
// ---------------------------------------------------------
router.post('/employee/verify', authMiddleware, verifyEmployee);
router.get('/employee/profile', authMiddleware, getEmployeeProfile);

// This was likely Line 33 where the error occurred. 
// checkEmployeeExists must be exported in its controller.
router.get("/check-employee/:id", checkEmployeeExists);

router.post('/gate/verify-code', authMiddleware, verifyGateCode);

// --- Gate Pass Routes ---
// Ensure 'getGatePass' is exported from getPasssgenerateController.js
router.get('/get-gate-pass',authMiddleware, getGatePass);

router.post('/verify-code', verifyCode);

// --- QR Route ---
router.post("/generate-qr", generateQR);

// Route for Admin/Gate to scan and verify
router.post('/verify-qr-scan', verifyQRScan);

router.get('/verification-logs', getVerificationLogs);

module.exports = router;