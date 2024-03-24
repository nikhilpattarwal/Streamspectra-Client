// import React, { useEffect, useRef, useState } from "react";
// import {BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill,} from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch} from "react-redux";
// import dayjs from "dayjs";
// import ContentWrapper from "../contentWrapper/ContentWrapper"
// import Img from "../lazyLoadImage/Img";
// import PosterFallback from "../../assets/no-poster.png";
// import "./carousel.scss";
// import { homeSelector } from "../../redux/homeReducer";
// import CircleRating from "../circleRating/CircleRating";
// import Genres from "../genres/genres";
// import { CgPlayListAdd } from "react-icons/cg";
// import { RiHeartAddLine } from "react-icons/ri";
// import { FcLike } from "react-icons/fc";
// import { CgPlayListCheck } from "react-icons/cg";
// import axios from "axios";
// import { homeActions } from "../../redux/homeReducer";

// const Carousel = ({data, loading, endpoint, title, watchL, likedMovies, setLikedMovies, setWatchL}) => {
//   const carouselContainer = useRef();
//   const {url,watchListMovies,heartMovies} = useSelector(homeSelector);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [userID, setUserId] = useState();
//   // console.log(watchL,likedMovies);
//   // console.log("watchListMovies",watchListMovies);
//   // console.log("heartMovies",heartMovies);
  

 



//   const navigation = (dir) =>{
//     const container = carouselContainer.current;
//     const scrollAmount = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);

//     container.scrollTo({
//       left: scrollAmount,
//       behavior: "smooth"
//     })
//   };

//   const store = localStorage.getItem("userInfo");
//   useEffect(()=>{
//     const user = JSON.parse(store);
//     if(user?.id ){
//       setUserId(user?.id);
//     }
//   },[store]);

//   // console.log("data",data)


//   const handleLikeWatchlistClick = async (e,movieID,query,type)=>{
//     e.stopPropagation();
//     console.log("query",type)
//     try{
//       const config = {
//         headers:{
//           "Content-type":"application/json"
//         }
//       }
//       const  response= await axios.post(`http://localhost:3000/api/${query}`,{movieID,userID,type}, config);
//       // console.log( response);
//       if(response.status==200 && query === "likes"){
//         // console.log(likedMovies);
//         setLikedMovies(prevLiked => [...prevLiked, movieID]);
//         dispatch(homeActions.LIKE(movieID));
//       }else if (response.status ==200 && query === "watchlist"){
//         setWatchL(prevWatchL => [...prevWatchL, movieID]);
//         dispatch(homeActions.WATCH(movieID));
//       }
//     }catch(err){
//       console.log(err);

//     }
//   }
//   // console.log(likedMovies);

  

//   const skItem =()=>{
//    return(  
//       <div className="skeletonItem">
//         <div className="posterBlock skeleton" ></div>
//         <div className="textBlock skeleton" >
//           <div className="title skeleton" ></div>
//           <div className="date skeleton" ></div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="carousel">
//       <ContentWrapper>
//         {title && <div className="carouselTitle">{title}</div>}
//       <BsFillArrowLeftCircleFill
//                     className="carouselLeftNav arrow"
//                     onClick={() => navigation("left")}
//                 />
//                 <BsFillArrowRightCircleFill
//                     className="carouselRighttNav arrow"
//                     onClick={() => navigation("right")}
//                 />
//                 {!loading ?(
//                   <div className="carouselItems" ref={carouselContainer}>
//                     {data?.map((item)=>{
//                       const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
//                       const isInWatchList = watchL?.includes(String(item.id))  === true;
//                       const isInLikedMovies = likedMovies?.includes(String(item.id))  === true;
//                       const isWatched = watchListMovies?.includes(item.id) === true;
//                       const isLiked = heartMovies?.includes(item.id)  === true;
//                       // console.log(isWatched,item.id);
//                       // console.log(isLiked,item.id);
//                       // console.log(isLiked);
//                       // console.log(watchListMovies);
//                       return(
//                         <>
//                         <div className="carouselItem" key={item.id} onClick={()=>navigate(`/${item.media_type || endpoint}/${item.id}`)}>
//                           <div className="posterBlock">
//                             <Img src={posterUrl}/>
//                             <CircleRating rating={item.vote_average.toFixed(1)}/>
//                             <Genres data={item.genre_ids.splice(0,2)}/>
//                           </div>
//                           <div className="iconsListAdd">
//                             {isLiked || isInLikedMovies === true ?(
//                               <FcLike className="heart"/>
//                             ):(
//                               <RiHeartAddLine className="heart" onClick={(e)=>handleLikeWatchlistClick(e,item.id,"likes",item.media_type || endpoint,setLikedMovies)}/>
//                             )}
//                             {isWatched || isInWatchList === true?(
//                               <CgPlayListCheck className="list"/>
//                             ):(
//                               <CgPlayListAdd className="list" onClick={(e)=>handleLikeWatchlistClick(e,item.id,"watchlist",item.media_type || endpoint,setWatchL)}/>
//                             )}
//                           </div>
//                           <div className="textBlock" >
//                             <span className="title">{item.title|| item.name}</span>
//                              <span className="date">{dayjs(item.release_Date).format("MMM D, YYYY")}</span>
//                           </div>
//                         </div>
//                         </>
//                       )
//                     })}
//                   </div>
//                 ) : (
//                  <div className="loadingSkeleton">
//                   {skItem()}
//                   {skItem()}
//                   {skItem()}
//                   {skItem()}
//                   {skItem()}
//                  </div>
//                 )}
//       </ContentWrapper>
//     </div>
//   )
// }

// export default Carousel

import React, { useEffect, useRef, useState } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../contentWrapper/ContentWrapper"
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import "./carousel.scss";
import { homeSelector } from "../../redux/homeReducer";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/genres";
import { CgPlayListAdd } from "react-icons/cg";
import { RiHeartAddLine } from "react-icons/ri";
import { FcLike } from "react-icons/fc";
import { CgPlayListCheck } from "react-icons/cg";
import handleLikeWatchlistClick from '../../helpers/likeWatchlistHandler'; // Import the function
import handleUnlikeUnwatchlistClick from "../../helpers/unlikeUnwatchlistHandler";

const Carousel = ({ data, loading, endpoint, title, watchL, likedMovies, setLikedMovies, setWatchL,watchLTv,likedTv,setUpdate }) => {
    const carouselContainer = useRef();
    const { url, watchListMovies, heartMovies } = useSelector(homeSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userID, setUserId] = useState();
    console.log(watchL?.length);
    console.log(watchL);

    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scrollAmount = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        })
    };

    const store = localStorage.getItem("userInfo");
    useEffect(() => {
        const user = JSON.parse(store);
        if (user?.id) {
            setUserId(user?.id);
        }
    }, [store]);

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock skeleton">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                            const isInWatchList = watchL?.includes(String(item.id)) === true;
                            const isInLikedMovies = likedMovies?.includes(String(item.id)) === true;
                            const isWatched = watchListMovies?.includes(item.id) === true;
                            const isLiked = heartMovies?.includes(item.id) === true;
                            const inInWatchLTv = watchLTv?.includes(String(item.id)) === true;
                            const isInLikedTv = likedTv?.includes(String(item.id)) === true;

                            return (
                                <>
                                    <div className="carouselItem" key={item.id} onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                                        <div className="posterBlock">
                                            <Img src={posterUrl} />
                                            <CircleRating rating={item.vote_average.toFixed(1)} />
                                            <Genres data={item.genre_ids.splice(0, 2)} />
                                        </div>
                                        <div className="iconsListAdd">
                                            {isLiked || isInLikedMovies || isInLikedTv === true ? (
                                                <FcLike className="heart" onClick={(e)=>handleUnlikeUnwatchlistClick(e, item.id, "unlike", item.media_type || endpoint, userID, setLikedMovies, null,dispatch,navigate,setUpdate)} />
                                            ) : (
                                                <RiHeartAddLine className="heart" onClick={(e) => handleLikeWatchlistClick(e, item.id, "likes", item.media_type || endpoint, userID, setLikedMovies, null,dispatch,navigate,setUpdate)} />
                                            )}
                                            {isWatched || isInWatchList || inInWatchLTv === true ? (
                                                <CgPlayListCheck className="list"  onClick={(e)=>handleUnlikeUnwatchlistClick(e, item.id, "unwatchlist", item.media_type || endpoint, userID, null, setWatchL,dispatch,navigate,setUpdate)} />
                                            ) : (
                                                <CgPlayListAdd className="list" onClick={(e) => handleLikeWatchlistClick(e, item.id, "watchlist", item.media_type || endpoint, userID, null,  setWatchL, dispatch,navigate,setUpdate)} />
                                            )}
                                        </div>
                                        <div className="textBlock" >
                                            <span className="title">{item.title || item.name}</span>
                                            <span className="date">{dayjs(item.release_Date).format("MMM D, YYYY")}</span>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    )
}

export default Carousel;
