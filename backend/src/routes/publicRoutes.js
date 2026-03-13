const express = require('express');
const router = express.Router();
const { verifyEmployee } = require('../controllers/publicEmployeeController');
const { signupSelfie } = require('../controllers/signupController');
const { getEmployeeProfile } = require('../controllers/employeeProfileController');
const { verifyGateCode } = require('../controllers/gateCodeController');
const { getEmployeeId } = require('../controllers/getEmployeeIdController');

router.post('/employee/verify', verifyEmployee);
router.post('/signup', signupSelfie);

router.get('/employee/profile', getEmployeeProfile);
router.get('/get-employee-id', getEmployeeId);
router.post('/gate/verify-code', verifyGateCode);

module.exports = router;
