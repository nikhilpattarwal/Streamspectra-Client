import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./moviecard.scss";
import Img from "../lazyLoadImage/img"
import CircleRating from "../circleRating/CircleRating"
import Genres from "../genres/Genres"
import PosterFallback from "../../assets/no-poster.png"
import { homeSelector } from "../../redux/homeReducer";
import { CgPlayListAdd } from "react-icons/cg";
import { RiHeartAddLine } from "react-icons/ri";
import { FcLike } from "react-icons/fc";
import { CgPlayListCheck } from "react-icons/cg";
import handleLikeWatchlistClick from "../../helpers/likeWatchlistHandler";
import handleUnlikeUnwatchlistClick from "../../helpers/unlikeUnwatchlistHandler";

const MovieCard = ({ data, fromSearch, mediaType,likedMovies,likedTv,watchL,watchLTv, setLikedMovies,setWatchL,setUpdate}) => {
    const [userID, setUserId] = useState();

    const { url,watchListMovies,heartMovies } = useSelector(homeSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;
        const isInLikedMovies = likedMovies &&  likedMovies.includes(String(data.id)) === true;
        const isInLikedTv = likedTv?.includes(String(data.id)) === true;
        const isLiked = heartMovies?.includes(data.id)  === true;
        const isInWatchList = watchL && watchL?.includes(String(data.id)) === true;
        const inInWatchLTv = watchLTv?.includes(String(data.id)) === true;
        const isWatched = watchListMovies?.includes(data.id) === true;



        const store = localStorage.getItem("userInfo");
        useEffect(() => {
            const user = JSON.parse(store);
            if (user?.id) {
                setUserId(user?.id);
            }
        }, [store]);

    return (
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />
                {!fromSearch && (
                    <React.Fragment>
                        <CircleRating rating={data?.vote_average.toFixed(1)} />
                        <Genres data={data?.genre_ids?.slice(0, 2)} />
                    </React.Fragment>
                )}
            </div>
            <div className="iconsListAdd">
                            {isLiked || isInLikedMovies || isInLikedTv === true ?(
                              <FcLike className="heart" onClick={(e)=>handleUnlikeUnwatchlistClick(e, data.id, "unlike", data.media_type || mediaType, userID, setLikedMovies, null,dispatch,navigate,setUpdate)}/>
                            ):(
                              <RiHeartAddLine className="heart" onClick={(e) => handleLikeWatchlistClick(e, data.id, "likes", data.media_type || mediaType, userID, setLikedMovies, null,dispatch,navigate,setUpdate)} />
                            )}
                             {isWatched || isInWatchList || inInWatchLTv === true?(
                              <CgPlayListCheck className="list" onClick={(e)=>handleUnlikeUnwatchlistClick(e, data.id, "unwatchlist", data.media_type || mediaType, userID, null, setWatchL,dispatch,navigate,setUpdate)} />
                            ):(
                              <CgPlayListAdd className="list" onClick={(e) => handleLikeWatchlistClick(e, data.id, "watchlist", data.media_type || mediaType, userID, null,  setWatchL, dispatch,navigate,setUpdate)}/>
                            )}
                          </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;