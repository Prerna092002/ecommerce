import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
// import cors from 'cors'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [phone,setPhone]=useState('');
  const [address,setAddress]=useState('');
  const navigate=useNavigate();
  const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log(name,email,password,phone,address);
        try{
          const res= await axios.post(`${process.env.REACT_APP_API}/api/v4/auth/register`,
          {name,email,password,phone,address});
          if(res && res.data.success){
            toast.success(res.data.message);
            navigate('/login');
          }else{
            toast.error(res.data.message);
          }
        }catch(error){
          console.log(error)
          toast.error('Something went wrong')
        }
  }
  return (
    <Layout>
      <div className="register">
        <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input
     type="Name"
      className="form-control"
      id="exampleInputName"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      placeholder='Enter your Name' required/>
  </div>
  <div className="mb-3">
    <input
     type="Email"
      className="form-control"
      id="exampleInputEmail"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      placeholder='Enter your email' required/>
  </div>
  
  <div className="mb-3">
    <input type="password"
     className="form-control"
     value={password}
     onChange={(e)=>setPassword(e.target.value)}
     placeholder='Enter your password' required/>
  </div>
  <div className="mb-3">
    <input type="number"
     className="form-control"
     value={phone}
     onChange={(e)=>setPhone(e.target.value)}
    placeholder='Enter your phone' required/>
  </div>
  <div className="mb-3">
    <input type="text"
     className="form-control"
     value={address}
     onChange={(e)=>setAddress(e.target.value)}
     placeholder='Enter your address' required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      </div>
    </Layout>
  )
}

export default Register
