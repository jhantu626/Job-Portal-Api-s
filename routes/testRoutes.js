const express=require('express')
const router=express.Router();
const{testPostController}=require('./../controller/testController.js')


//post test routes 
router.post('/test-post',testPostController);


module.exports=router;