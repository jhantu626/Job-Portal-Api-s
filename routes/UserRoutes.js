const express=require('express')
const router=express.Router();
const {jwtMiddleWare}=require('./../middleware/jwt')
const {profileController,updateController,
    updatePassword,deleteProfile}=require('./../controller/UserController')

//PROFILE || GET
router.get('/profile',jwtMiddleWare,profileController);


//UPDATE || PUT
router.put('/update-profile',jwtMiddleWare,updateController);

//UPDATE-PASSWORD || PUT
router.put('/update-password',jwtMiddleWare,updatePassword)

//DELETE || DELETE

router.delete('/delete-profile',jwtMiddleWare,deleteProfile);

module.exports=router