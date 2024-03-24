import React from 'react'
import "./home.scss";
import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending';
import Popular from './popular/Popular';
import TopRated from './topRated/TopRated';

const Home = ({setShowLogin,showLogin,watchL,likedMovies, setLikedMovies, setWatchL, watchLTv,likedTv,setUpdate}) => {

    const handleContainerClick = (event) => {
      setShowLogin(false);
    };
  return (
    <div onClick={handleContainerClick}>
        <HeroBanner/>
        <Trending watchL={watchL} likedMovies={likedMovies} setLikedMovies={setLikedMovies} setWatchL={setWatchL} likedTv={likedTv} watchLTv={watchLTv} setUpdate={setUpdate}/>
        <Popular watchL={watchL} likedMovies={likedMovies} setLikedMovies={setLikedMovies} setWatchL={setWatchL} likedTv={likedTv} watchLTv={watchLTv} setUpdate={setUpdate} />
        <TopRated watchL={watchL} likedMovies={likedMovies} setLikedMovies={setLikedMovies} setWatchL={setWatchL} likedTv={likedTv} watchLTv={watchLTv} setUpdate={setUpdate} />
    </div>
  )
}


export default Home;