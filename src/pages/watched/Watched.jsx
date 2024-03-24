import React, { useState, useEffect } from "react";
import "./watched.scss";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import { fetchDataFromApi } from "../../utils/api";
import SwitchTabs from "../../components/switchTabs/SwitchTabs";





const Liked = ({watchL,watchLTv,likedMovies,likedTv,setUpdate, setLikedMovies, setWatchL}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [mediaType, setMediaType] = useState("movie")
    // console.log(likedTv);
    const fetchingData = async () => {
        try {
            setLoading(true);
        
            const validResults = [];
            const finalResult =[];
            if(mediaType === "movie"){
            for (let i = 0; i < watchL?.length; i++) {
              const movieId = watchL[i];
              try {
                const result = await fetchDataFromApi(`/movie/${movieId}`);
                // console.log(result.response);
                if(result){
                    validResults.push(result);
                }
              } catch (error) {
                console.error(`Error fetching data for movie ${movieId}:`, error);
              }
            }
        }else   if(mediaType === "tv"){
            for (let i = 0; i < watchLTv?.length; i++) {
              const movieId = watchLTv[i];
              try {
                const result = await fetchDataFromApi(`/tv/${movieId}`);
                // console.log(result.response);
                if(result){
                    validResults.push(result);
                }
              } catch (error) {
                console.error(`Error fetching data for movie ${movieId}:`, error);
              }
            }
        }
            if(validResults){
                // finalResult.length=0;
                for(let v of validResults){
                    if(v?.response?.status !==404){
                        finalResult.push(v)
                    }
                }
            }
            setData([]);
            setData((prev) => [...prev, ...finalResult]);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        }

    useEffect(() => {
          fetchingData();
    }, []);

    useEffect(()=>{
      setUpdate(prev=>!prev)
    },[])   
  
    useEffect(() => {
        fetchingData();
    }, [mediaType]);
    

  //  console.log(data);

   const onTabChange =(tab)=>{
    // setEndpoint(tab === "Movies" ? "Movies" : "TV Show")
    setMediaType(tab === "Movies" ? "movie" : "tv")
    setUpdate(prev=>!prev)
}

const skItem =()=>{
  return(  
     <div className="skeletonItem">
       <div className="posterBlock skeleton" ></div>
       <div className="textBlock skeleton" >
         <div className="title skeleton" ></div>
         <div className="date skeleton" ></div>
       </div>
     </div>
   )
 }

  return (
    <div className="explorePage">
    <ContentWrapper>
        <div className="pageHeader">
            <div className="pageTitle">
               Watchlisted {mediaType === "movie" ? "Movies" : "Tv Shows"}
            </div>
            <SwitchTabs data={["Movies", "TV Show"]} onTabChange={onTabChange} />
        </div>
        {loading && 
        (<>
          {/* <Spinner initial={true} /> */}
          <div className="loadingSkeleton">
           {skItem()}
           {skItem()}
           {skItem()}
           {skItem()}
           {skItem()}
          </div>
          <div className="loadingSkeleton">
          {skItem()}
          {skItem()}
          {skItem()}
          {skItem()}
          {skItem()}
         </div>
         <div className="loadingSkeleton">
         {skItem()}
         {skItem()}
         {skItem()}
         {skItem()}
         {skItem()}
        </div>
        </>)
        }
        {!loading && (
            <div className='wholeWrapper'>
                 { data && data?.length > 0 ? (
                    
                    data?.map((item, index) => {
                            return (
                                <MovieCard
                                    key={index}
                                    data={item}
                                    mediaType={mediaType}
                                    watchL={watchL}
                                    watchLTv={watchLTv}
                                    likedTv={likedTv}
                                    likedMovies={likedMovies}
                                    setLikedMovies={setLikedMovies}
                                    setWatchL={setWatchL}
                                    setUpdate={setUpdate}
                                />
                            );
                        })
    
                ) : (
                    <span className="resultNotFound">
                        Sorry, Results not found!
                    </span>
                )} 
            </div>
        )}
    </ContentWrapper>
</div>
  )
}

export default Liked