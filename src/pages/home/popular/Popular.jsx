  import React, {useState} from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../components/hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const Popular = ({watchL,likedMovies,setLikedMovies,setWatchL,watchLTv,likedTv,setUpdate}) => {
    const [endpoint, setEndpoint] = useState("movie");

    const {data, loading} =useFetch(`/${endpoint}/popular`);
    
    const onTabChange =(tab)=>{
        setEndpoint(tab === "Movies" ? "movie" : "tv")
    };
  return (
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">What's Popular</span>
            <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endpoint={endpoint} watchL={watchL} likedMovies={likedMovies} setLikedMovies={setLikedMovies} setWatchL={setWatchL} likedTv={likedTv} watchLTv={watchLTv} setUpdate={setUpdate}/>
    </div>
  )
}

export default Popular;