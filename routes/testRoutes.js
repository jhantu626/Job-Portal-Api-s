const express=require('express')
const router=express.Router();
const{testPostController}=require('./../controller/testController.js')
const {jwtMiddleWare}=require('./../middleware/jwt.js')

//post test routes 
router.post('/test-post',jwtMiddleWare,testPostController);


module.exports=router;