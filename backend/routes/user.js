const express = require('express')
const user = require('../controllers/user_controllers')
const authenticate = require('../middleware/authication')
const authorize = require('../middleware/authorization')
const router = express.Router()
router.get('/all', authenticate, authorize('admin'), user.ALLUser).get('/single/:id', authenticate, authorize('admin'), user.User).patch('/update/:id', authenticate, authorize('admin'), user.UpdateUser).delete('/delete/:id', authenticate, authorize('admin'), user.DeleteUser).post('/create', authenticate, authorize('admin'), user.createUser).post('/login', user.Login).post('/verify', user.Verify_OTP).post('/mobile', user.Mobile_Number)
module.exports = router;