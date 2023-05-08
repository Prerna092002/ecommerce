import authRoute from "../routes/authRoute.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";

//register controller
export const registerController = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, phone, address,answer } = req.body;
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone No is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }
    //check user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered please login",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer
    }).save();
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(`${error}`);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

//login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
        // error
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Password is incorrect",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id:user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};



// forgot-password
export const forgotPasswordController= async (req,res)=>{
      try{
        const {email,answer,newPassword}=req.body;
        if(!email){
          res.status(400).send({success: false, message:"Email is required"});
        }
        if(!answer){
          res.status(400).send({success: false, message:"answer is required"});
        }
        if(!newPassword){
          res.status(400).send({success: false, message:"Password is required"});
        }
        const user=await userModel.findOne({email,answer});
        if(!user){
          return res.status(404).send({success: false, message:"Email or answer is incorrect"})
        }
        const hashed=await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password:hashed});
        res.status(200).send({success: true, message:"Password reset successfully"});

      }catch(error){
        console.log(error);
        res.status(500).send({
          message: "Something went wrong",
          success: false,
          error,
        })
      }
}

//test controller
export const testController = (req, res) => {
  // console.log("Protected route");
  res.send("Protected route");
};
