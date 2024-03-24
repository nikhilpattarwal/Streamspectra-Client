import React, { useEffect } from 'react'
import useFetch from '../../../components/hooks/useFetch';
import { useState } from 'react';
import WatchProviderIcons from '../../../components/watchProviderIcons/WatchProviderIcons';
import { Link, useNavigate } from 'react-router-dom';

import "./watchproviders.scss"

const WatchProviders = ({id,mediaType}) => {
      const navigate = useNavigate();
      const { data, loading } = useFetch(`/${mediaType}/${id}/watch/providers`);
      console.log(data);
      if (!loading && data && data.results && data.results.IN && data.results.IN.buy && data.results.IN.link) {
        const link = data.results.IN.link;
        console.log("link", link)
        const newdata = data.results.IN.buy.map((item) => ({
          provider_id: item.provider_id,
          logo_path: item.logo_path,
          provider_name:item.provider_name
        }));
        console.log(newdata);
     
  return (
    <>
    <h3>Watch Now</h3>
    {newdata?(
    <div className="allIcons">
      {newdata?.map((item,Index)=>(
        <div key={Index} className="wrapper">
          <Link to={link} target="_blank" rel="noopener noreferrer">
        <WatchProviderIcons link={item.logo_path} name={item. provider_name}/>
          </Link>
        <div className="providerName">{item.provider_name === "Google Play Movies"? item.provider_name.slice(0,-7): item.provider_name}</div>
        </div>
      ))}
      </div>
    ):
      <>
      <div className="main">
        <div className="cont">
          <div className="profile skeleton"></div>
          <div className="name skeleton"></div>
        </div>
        <div className="cont">
          <div className="profile skeleton"></div>
          <div className="name skeleton"></div>
        </div>
        <div className="cont">
          <div className="profile skeleton"></div>
          <div className="name skeleton"></div>
        </div>
        <div className="cont">
          <div className="profile skeleton"></div>
          <div className="name skeleton"></div>
        </div>
        <div className="cont">
          <div className="profile skeleton"></div>
          <div className="name skeleton"></div>
        </div>
        <div className="cont">
          <div className="profile skeleton"></div>
          <div className="name skeleton"></div>
        </div>
        </div>
      </>
      }
      </>
  )
}
}

export default WatchProviders;