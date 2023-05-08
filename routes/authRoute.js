import express from 'express';
const router=express.Router();
import {registerController,loginController,testController,forgotPasswordController} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
//routing
//register || method POST
router.post('/register',registerController);

//login || method post
router.post('/login',loginController);

//test Controller
router.get('/test',requireSignIn,isAdmin,testController);


//protected route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
        res.status(200).send({ok:true});
});


//forget-password
router.post('/forgot-password',forgotPasswordController);

export default router;