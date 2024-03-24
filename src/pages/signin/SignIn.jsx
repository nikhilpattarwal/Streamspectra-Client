import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./signin.scss";
import axios from 'axios';
import {PropagateLoader} from "react-spinners"
import { Alert } from '@mui/material';
import { BASE_URL } from '../../utils/baseurl';

const SignIn = ({navigateto,setLoggedIn,setUser_id}) => {
  
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });
  const[loading,setLoading] = useState(false);
  const [isDisabled, setIsdisabled] = useState(true);
  const[message, setMessage] = useState({severity:"",msg:""});

  const navigate = useNavigate();

  const handleInputClick = (e) => {
    e.stopPropagation();
  };
  
  const handleGoBack = () => {
    console.log("going back",navigateto)
    navigate(navigateto);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  

  useEffect(()=>{
    if ( !userData.email || !userData.password) {
      setIsdisabled(true);
    } else {
      setIsdisabled(false);
    }
  },[userData]);

  const handleSignIn = async () => {
    console.log('Signup data:', userData);
    try {
      const config = {
        headers:{
          "Content-type":"application/json"
        }
      }
      setLoading(true);
      const {data} = await axios.post(`${BASE_URL}/api/users/signin`,{userData}, config);
      console.log(data);
      if(data){
        localStorage.setItem("userInfo", JSON.stringify(data));
      }
      setLoading(false);
      setLoggedIn(true);
      setUser_id(data._id);
      setMessage((prevData)=>({
        ...prevData,
        severity:"success",
        msg:"Logged in Successfully"
      }));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setMessage((prevData)=>({
        ...prevData,
        severity:"error",
        msg:error.response.data.message
      }));
    }
  };

  return (
    <>
  
      <div onClick={handleGoBack} className={ "mainCont"} >
      <div className={ "cont"} onClick={handleInputClick}>
      {loading && 
           <PropagateLoader color="#367fd6" />
          }

          {message.msg !=="" &&
            <Alert severity={message.severity}>{message.msg}</Alert>
          }
            <input type="text" 
            placeholder='Email'
            name="email"
            value={userData.name}  
            onChange={handleInputChange} 
            /> 
            <input type="password" 
            placeholder='Password'
            name="password" 
            value={userData.password}  
            onChange={handleInputChange}
            />
            <button className={isDisabled ?"notButton" : "button"} onClick={handleSignIn} disabled={isDisabled}>Sign in</button>
            <p onClick={()=>{navigate('/signup');}}>Not a user? Sign up</p>
        </div>
      </div>
   
    </>
  )
}

export default SignIn