import React from 'react';
import { useSelector } from 'react-redux';
import { homeSelector } from '../../redux/homeReducer';
import Img from '../lazyLoadImage/img';
import "./watchprovidericon.scss"

const WatchProviderIcons = ({link, name}) => {
    const {url} = useSelector(homeSelector);
    console.log(url);
    console.log(link)
    let newLink = url.profile + link;
    if(name === "Google Play Movies"){
        newLink ="https://www.techspot.com/images2/downloads/topdownload/2022/08/2022-08-11-ts3_thumbs-68b-p_256.webp";
    }
  return (
           <Img src={newLink} className={"styles"}/>
  )
}

export default WatchProviderIcons