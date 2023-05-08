import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
// import JWTToken from "
export const requireSignIn= async (req,res,next)=>{
    try{
        const decode=JWT.verify(req.headers.authorization,process.env.JWT_secret);
        req.user=decode;
        next();
    }
    catch(err){
        console.log(err)
    }
}
export const isAdmin =async (req,res,next)=>{
    try{
      const user=await userModel.findById(req.user._id);
      if(user.role!==1){
        return res.status(401).send({
            success:false,
            message:'Unauthorized access'
        })
      }else{
        next();
      }
    }catch(err){
        console.log(err)
        res.status(401).send({
            success:false,
            message:"error in admin middleware",
            err,
         })
    }
}