const express=require('express')
const router=express.Router();
const {registerController}=require('./../controller/authController')

//This file will be responsible to register and login user!

//ResigerUser
router.post('/register',registerController);




module.exports=router;