const Roles=require('../controllers/roles_controllers')
const express=require('express')
const router=express()
router.post('/create',Roles.createRole).get('/all',Roles.AllRole).get('/single/:id',Roles.Role).patch('/update/:id',Roles.Update_Roles).delete('/delete/:id',Roles.Delete_Roles)
module.exports=router