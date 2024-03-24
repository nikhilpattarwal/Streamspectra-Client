import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./signup.scss"
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import {PropagateLoader} from "react-spinners"
import { Alert } from '@mui/material';
import { BASE_URL } from '../../utils/baseurl';

const SignUp = ({navigateto,setLoggedIn,setUser_id}) => {

  const navigate = useNavigate();
  const unique_id = uuid();

  const handleGoBack = () => {
    console.log("going back", navigateto)
    navigate(navigateto);
  };

  const uniqueID =()=>{
    const date = new Date();
    console.log(date);

  }
  uniqueID();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    id:unique_id
  });
  const[loading,setLoading] = useState(false);
  const[message, setMessage] = useState({severity:"",msg:""});
  const [isDisabled, setIsdisabled] = useState(true);

  const handleInputClick = (e) => {
    e.stopPropagation();
  };


  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  useEffect(()=>{
    if ( !userData.name || !userData.email || !userData.password || !userData.confirmPassword ||  userData.password !== userData.confirmPassword) {
      setIsdisabled(true);
    } else {
      setIsdisabled(false);
    }
  },[userData])

  const handleSignUp = () => {
    if(  userData.password !== userData.confirmPassword){
      return;
    }
    console.log('Signup data:', userData);
    signUpUser();
  };

  const signUpUser= async()=>{
    try{
      const config = {
        headers:{
          "Content-type":"application/json"
        }
      }
      setLoading(true);
      const {data} = await axios.post(`${BASE_URL}/api/users/signup`,{userData}, config);
      console.log(data);
      if(data){
        localStorage.setItem("userInfo", JSON.stringify(data));
      }
      setLoading(false);
      setLoggedIn(true)
      setUser_id(data._id);
      setMessage((prevData)=>({
        ...prevData,
        severity:"success",
        msg:"Logged in Successfully"
      }));
       navigate("/");
    }catch(err){
      console.log(err)
      setLoading(false);
      setMessage((prevData)=>({
        ...prevData,
        severity:"error",
        msg:err.response.data.message
      }));
    }
  }

  return (
    <>
      <div onClick={handleGoBack} className="mainCont">
        <div className="cont" onClick={handleInputClick}>
          {loading && 
           <PropagateLoader color="#367fd6" />
          }

          {message.msg !=="" &&
            <Alert severity={message.severity}>{message.msg}</Alert>
          }
            <input type="text"
             placeholder='Name' 
             name="name"
             value={userData.name}  
             onChange={handleInputChange}/>

            <input type="email" 
            placeholder='Email' 
            name="email" 
            value={userData.email}  
            onChange={handleInputChange}/>

            <input type="password" 
            placeholder='Create new Password' 
            name="password" 
            value={userData.password}  
            onChange={handleInputChange}/>

            <input type="password" 
            placeholder='Confirm password' 
            name="confirmPassword" 
            value={userData.confirmPassword}  
            onChange={handleInputChange}/>
            
            <button className={isDisabled ?"notButton" : "button"} onClick={handleSignUp} disabled={isDisabled}>Sign up</button>
            <p onClick={()=>{navigate('/signin');}}>Already a user? Sign in</p>
        </div>
      </div>
   
    </>
  )
}

export default SignUp