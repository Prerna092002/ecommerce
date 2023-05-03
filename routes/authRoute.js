import express from 'express';
const router=express.Router();
import {registerController,loginController,testController} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
//routing
//register || method POST
router.post('/register',registerController);

//login || method post
router.post('/login',loginController);

//test Controller
router.get('/test',requireSignIn,isAdmin,testController);
export default router;