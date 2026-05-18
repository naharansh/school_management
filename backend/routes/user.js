const express=require('express')
const user=require('../controllers/user_controllers')
const router=express.Router()
router.get('/all',user.ALLUser).get('/single/:id',user.User).patch('/update/:id',user.UpdateUser).delete('/delete/:id',user.DeleteUser).post('/create',user.createUser).post('/login',user.Login).post('/verify',user.Verify_OTP).post('/mobile',user.Mobile_Number)
module.exports=router;