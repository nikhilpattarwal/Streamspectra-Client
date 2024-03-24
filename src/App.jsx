
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useSelector,useDispatch } from "react-redux";
import { homeActions,homeSelector } from "./redux/homeReducer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Error, Details,Explore, Home, SearchResults } from "./pages/imports";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import axios from "axios";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import Liked from "./pages/liked/Liked";
import Watched from "./pages/watched/watched";
import { BASE_URL } from "./utils/baseurl";

function App() {


  const [showLogin,  setShowLogin] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [navigateto, setNavigate] = useState(null);
  const [loggedIn,setLoggedIn] = useState(false);
  const [user_id, setUser_id] = useState();
  const [likedMovies, setLikedMovies] = useState([]);
  const [watchL, setWatchL] = useState([]);
  const [likedTv, setLikedTv] = useState();
  const [watchLTv, setWatchLTv] = useState();
  const [update, setUpdate] = useState(false);
  const userInfo = localStorage.getItem("userInfo");
  // console.log(JSON.parse(userInfo));
  const dispatch = useDispatch();
  
  useEffect(()=>{
    const storageData = JSON.parse(userInfo);
    if(storageData?.id){
      setUser_id(storageData.id);
      setLoggedIn(true);
    }
  },[userInfo])
  
  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  },[]);


  // const {url} = useSelector(homeSelector);

  const gettingData = async() =>{
    try {    
      await axios.get(`${BASE_URL}/api/likes-data?userid=${user_id}`)
        .then(response => {
          // const movies =response.data.foundLikes.movies;
          setLikedMovies(response.data.foundLikes.movies);
          setLikedTv(response.data.foundLikes.tv)
        })
        await axios.get(`${BASE_URL}/api/watchlist-data?userid=${user_id}`)
        .then(response => {
          // const movies =response.data.foundWatchlist.movies
          setWatchL(response.data.foundWatchlist.movies);
          setWatchLTv(response.data.foundWatchlist.tv);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    gettingData();
  },[user_id,update])




  const fetchApiConfig =()=>{
    fetchDataFromApi('/configuration')
    .then((res)=>{
     
      const url ={
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }
      dispatch(homeActions.getApiConfiguration(url));
    })
}

    const genresCall = async () =>{
      let promises = [];
      let endPoints = ["tv", "movie"];
      let allGenres = {};
      
      endPoints.forEach((url)=>{
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
      })

      const data = await Promise.all(promises);
      data.map(({genres})=>{
        return genres.map((item)=>(allGenres[item.id] = item))
      })

      dispatch(homeActions.getGenres(allGenres));
    };

    return (
      
      <BrowserRouter>
         <Header setShowLogin={setShowLogin} showLogin={showLogin} setNavigate={setNavigate} navigateto={navigateto} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>

        <Routes>
          {/* Routes with layout (Header and Footer) */}
          <Route
            path="/"
            element={<Home setShowLogin={setShowLogin} showLogin={showLogin} watchL={watchL} likedMovies={likedMovies} setWatchL={setWatchL} setLikedMovies={setLikedMovies} likedTv={likedTv} watchLTv={watchLTv} setUpdate={setUpdate}/>}
          />
          <Route
            path="/:mediaType/:id"
            element={<Details setShowLogin={setShowLogin} showLogin={showLogin} />}
          />
          <Route
            path="/search/:query"
            element={<SearchResults setShowLogin={setShowLogin} showLogin={showLogin} />}
          />
          <Route path="/explore/:mediaType" element={<Explore likedMovies={likedMovies} likedTv={likedTv} watchLTv={watchLTv} watchL={watchL} setLikedMovies={setLikedMovies} setWatchL={setWatchL} setUpdate={setUpdate}  />}/>
        
          {/* Route without layout (Header and Footer) */}
          <Route path="/signup" element={<SignUp showSignup={showSignup} setShowSignup={setShowSignup} navigateto={navigateto} setUser_id={setUser_id} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>}  />

          <Route path="/signin" element={<SignIn showSignin={showSignin} setShowSignin={setShowSignin} navigateto={navigateto} setUser_id={setUser_id} setLoggedIn={setLoggedIn} loggedIn={loggedIn} />} />
          
          {user_id &&
          (
            <>
          <Route
            path="/liked"
            element={<Liked likedMovies={likedMovies} likedTv={likedTv} watchLTv={watchLTv} watchL={watchL} setLikedMovies={setLikedMovies} setWatchL={setWatchL} setUpdate={setUpdate}/>}
          />
           <Route
            path="/watched"
            element={<Watched likedMovies={likedMovies} likedTv={likedTv} watchLTv={watchLTv} watchL={watchL} setLikedMovies={setLikedMovies} setWatchL={setWatchL} setUpdate={setUpdate}/>}
          />
          </>
          )
           }
          {/* Fallback route */}
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
}

export default App
