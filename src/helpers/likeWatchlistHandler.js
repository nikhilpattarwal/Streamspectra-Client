import React from 'react';
import axios from 'axios';
import { homeActions } from '../redux/homeReducer';
import { BASE_URL } from '../utils/baseurl';


const handleLikeWatchlistClick = async (e,movieID,query,type, userID, setLikedMovies, setWatchL,dispatch,navigate)=>{
    e.stopPropagation();
    try{
      const userInfo = localStorage.getItem("userInfo");
      const storageData = JSON.parse(userInfo);
      const loggedIn = storageData?.id

      if(!loggedIn){
       navigate("/signin");
       return
      }
      
      console.log(loggedIn)
      // debugger;
      const config = {
        headers:{
          "Content-type":"application/json"
        }
      }
      const  response= await axios.post(`${BASE_URL}/api/${query}`,{movieID,userID,type}, config);
      // console.log( response);
      if(response.status==200 && query === "likes"){
        // console.log(likedMovies);
        setLikedMovies(prevLiked => [...prevLiked, movieID]);
        dispatch(homeActions.LIKE(movieID));
      }else if (response.status ==200 && query === "watchlist"){
        setWatchL(prevWatchL => [...prevWatchL, movieID]);
        dispatch(homeActions.WATCH(movieID));
      }
    }catch(err){
      console.log(err);
       
    }
  }



  export default handleLikeWatchlistClick;