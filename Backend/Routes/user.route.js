const express=require('express');
const router=express.Router();
const {registerUsercontroller, loginUsercontroller} = require('../Controllers/user.controller.js');
router.post('/register',registerUsercontroller);
router.post('/login',loginUsercontroller);
module.exports=router;