const express=require('express')
const router=express.Router();
const {registerController}=require('./../controller/authController')
const {body,validationResult}=require('express-validator')

//This file will be responsible to register and login user!

//ResigerUser
router.post('/register',[
    body('name').isLength({min: 3,max:30}),
    body('email','Email Should Be in Email Format').isEmail(),
    body('password','Password Must atlest 6 Character!')
    .isLength({min: 6,max: 15})
],registerController);




module.exports=router;