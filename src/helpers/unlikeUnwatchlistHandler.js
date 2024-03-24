import React from 'react';
import axios from 'axios';
import { homeActions } from '../redux/homeReducer';
import { BASE_URL } from '../utils/baseurl';

const handleUnlikeUnwatchlistClick = async (e,movieID,query,type, userID, setLikedMovies, setWatchL,dispatch,navigate,setUpdate) =>{
    e.stopPropagation();
    try {
      const userInfo = localStorage.getItem("userInfo");
      const storageData = JSON.parse(userInfo);
      const loggedIn = storageData?.id

      if(!loggedIn){
       navigate("/signin");
       return
      }

      const config = {
        headers:{
          "Content-type":"application/json"
        }
      }
      const  response= await axios.post(`${BASE_URL}/api/${query}`,{movieID,userID,type}, config);
      // console.log( response);
      if(response.status==200 && query === "unlike"){
        setLikedMovies(prevLiked => prevLiked.filter(id => id !== movieID));
        dispatch(homeActions.UNLIKE(movieID));
        setUpdate(prev => !prev);
      }else if (response.status ==200 && query === "unwatchlist"){
        console.log("entered")
        setWatchL(prevLiked => prevLiked.filter(id => id !== movieID));
        console.log("entered2")
        dispatch(homeActions.UNWATCH(movieID));
        console.log("entered3")
        setUpdate(prev => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  }

  export default handleUnlikeUnwatchlistClick;