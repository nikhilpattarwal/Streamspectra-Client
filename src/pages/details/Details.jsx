import React from 'react';
import "./details.scss";
import useFetch from '../../components/hooks/useFetch';
import { useParams } from 'react-router-dom';
import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './cast/Cast';
import VideosSection from './videosSection/VideosSection';
import Similar from './carousels/Similar';
import Recommendation from './carousels/Recommendation';

const Details = ({showLogin,setShowLogin,likedMovies,likedTv,watchL,watchLTv, setLikedMovies, setWatchL, setUpdate}) => {
  const {mediaType, id} = useParams();
  const {data, loading} = useFetch(`/${mediaType}/${id}/videos`);
  const {data: credits, loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`);
  console.log(data);

  const handleContainerClick = () => {
    setShowLogin(false);
  };
  
  return (
    <div onClick={handleContainerClick}>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} likedMovies={likedMovies} likedTv={likedTv} watchLTv={watchLTv} watchL={watchL} setLikedMovies={setLikedMovies} setWatchL={setWatchL} setUpdate={setUpdate}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  )
}

export default Details