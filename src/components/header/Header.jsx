import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { AiOutlineLogin } from "react-icons/ai";
import { SiGnuprivacyguard } from "react-icons/si";
import "./header.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/logo-no-background.svg";


const Header = ({showLogin,setShowLogin,setNavigate, navigateto,loggedIn,setLoggedIn}) => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
   
   
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(()=>{
      window.scrollTo(0,0);
    },[location])

   

    const handleCircleUserClick = (event) => {
      console.log('Clicked user icon'); // Add debug log
      event.preventDefault();
      setShowLogin(prev => !prev);
    };

    const controlNavbar = () =>{
        if(window.scrollY > 200){
          if(window.scrollY> lastScrollY && !mobileMenu){
            setShow("hide");
            setShowLogin(false)
          } else {
            setShow("show");
          }
        } else{
          setShow("top"); 
        }
        setLastScrollY(window.scrollY);
    }

    useEffect(()=>{
      window.addEventListener("scroll",controlNavbar)
      return ()=>{
        window.removeEventListener("scroll",controlNavbar)
      }
    },[lastScrollY])
    
    const searchQueryHandler =(event)=>{
      if(event.key === "Enter" && query.length>0){
          navigate(`/search/${query}`);
          setTimeout(()=>{
            setShowSearch(false);
          }, 1000)
      }
   }

    const openSearch = () =>{
      setMobileMenu(false);
      setShowSearch(true);
    } 

    const openMobileMenu = () =>{
      setMobileMenu(true);
      setShowSearch(false);
    }

    const navigationHandler = (type) =>{
      if(type === "liked" || type === "watched"){
        navigate(`/${type}`);
        return;
      }
         navigate(`/explore/${type}`);
         setMobileMenu(false);
    }

    const handleReturn =(path)=>{
      if(location.pathname !== "/signin" && location.pathname !== "/signup"){
        console.log(location.pathname);
        setNavigate(location.pathname);
      }
      setShowLogin(false)
      navigate(path)
    }

    const handleLogout= () =>{
      localStorage.removeItem("userInfo");
      setLoggedIn(false);
      window.location.reload();
      navigate("/signin");
    }

   
    return (
       <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
        <ContentWrapper>
          <div className="logo" onClick={()=> navigate("/")}>
            <img src={logo} alt="" />
          </div>
          <ul className="menuItems">
            <li className="menuItem" onClick={()=>navigationHandler("movie")}>Movies</li>
            <li className="menuItem" onClick={()=>navigationHandler("tv")}>Tv Shows</li>
            {loggedIn && 
            <>
            <li className="menuItem" onClick={()=>navigationHandler("liked")}>Liked</li>
            <li className="menuItem" onClick={()=>navigationHandler("watched")}>Watchlist</li>
            <li className="menuItem"><HiOutlineSearch onClick={openSearch}/></li>
            </>
            }
            <FaCircleUser style={{fontSize:"1.6rem", color:"white", cursor:"pointer", marginLeft:"1.4rem"}} onClick={handleCircleUserClick}/>
            {showLogin && loggedIn === false ? (
            <div className="signInUpCont">
              <div className="signIn" onClick={() => handleReturn("/signin")}>
                <AiOutlineLogin style={{ color: "Green" }} />
                Sign in
              </div>
              <hr />
              <div className="signUp" onClick={() => handleReturn("/signup")}>
                <SiGnuprivacyguard style={{ color: "Blue" }} />
                Sign up
              </div>
            </div>
          ) : null}

             { showLogin && loggedIn &&
               <div className="signInUpCont">
                <div className="signUp" onClick={handleLogout}><SiGnuprivacyguard style={{color:"Blue"}}/>Logout</div>
               </div>
             }
          </ul>
          <div className="mobileMenuItems">
            <HiOutlineSearch onClick={openSearch}/>
            {mobileMenu ? (
              <VscChromeClose onClick={()=>setMobileMenu(false)}/>
            ):(
              <SlMenu onClick={openMobileMenu}/>
            )}
          </div>
        </ContentWrapper>

      { showSearch &&(
       <div className="searchBar">
          <ContentWrapper>
              <div className="searchInput">
                <input 
                type="text"
                placeholder='Search for movie or show...' 
                onKeyUp={searchQueryHandler}
                onChange={(e)=>setQuery(e.target.value)}
                />
                <VscChromeClose onClick={()=>setShowSearch(false)}/>
          </div>
          </ContentWrapper>
        </div>
        )}  
       </header>
    );
};

export default Header;