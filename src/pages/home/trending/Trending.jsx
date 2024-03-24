import React, {useState} from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../components/hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const Trending = ({watchL,likedMovies,setLikedMovies,setWatchL,likedTv,watchLTv, setUpdate}) => {
    const [endpoint, setEndpoint] = useState("day");
    const {data, loading} = useFetch(`/trending/all/${endpoint}`);

    const onTabChange =(tab)=>{
        setEndpoint(tab === "Day" ? "day" : "week")
    };
  return (
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">Trending</span>
            <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} watchL={watchL} likedMovies={likedMovies} setLikedMovies={setLikedMovies} setWatchL={setWatchL} likedTv={likedTv} watchLTv={watchLTv} setUpdate={setUpdate} />
    </div>
  )
}

export default Trending;