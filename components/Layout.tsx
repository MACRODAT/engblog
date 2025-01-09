//  @ts-nocheck
import React, { useEffect, useState } from 'react'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Head from 'next/head'
import LinkCard from './Card'
import Header from './Header'
import SideNav from './sidenav'
import { useSelector, useDispatch } from 'react-redux'
import { fetchNavIfNoNav } from '../store/userSlice'
import { useRouter } from 'next/router'
import { setThemeState } from '../store/themeSlice'
import SearchNav from './Search'
import SearchPage from './SearchPage'

import {  setSearchFocus as sf } from '../store/userSlice';

const Layout = ({ children } : {children : any}) => {

  let [scrolled, setScrolled] = useState(false);

  let styles = {
    backgroundColor : 'var(--color-bg-p)',
    color: 'var(--color-fg-p)',
    "--fontSizeMultiplier" : 1,
  }

  let [stylers, setStylers] = useState(styles);
  const mainScreen = useFullScreenHandle();
  const sideScreen = useFullScreenHandle();
  
  const router_ = useRouter();

  let dispatch = useDispatch();
  dispatch(fetchNavIfNoNav());

  

  let t = useSelector(state => state.theming.theme);
  // let theme = useSelector(state => state.theming.current);
  useEffect(() => {
    // console.log("Setting new theme")
    Object.entries(t).forEach((ind) => {
      document.documentElement.style.setProperty(ind[0], ind[1])
    });

  }, [t])

  let sz = useSelector(state => state.theming.fontSize);

  useEffect(() => {
    setStylers({
      ...stylers,
      "--fontSizeMultiplier" : sz
    });
  }, [sz])

  let theme = useSelector(state => state.theming.current);

	const switchTheme = () => {
		if (theme == 'light'){
			dispatch(setThemeState('dark'))
		}else{
			dispatch(setThemeState('light'))
		}
	}

  let showNav = () => {
    return true;
    return ! ['/','/about','/login','/account'].includes(router_.route)
  }

  let [isSearchFocused, setSearchFocus] = useState(false);
  let _searchfocus = useSelector(state => state.user.searchFocus);
  useEffect( () => {
    setSearchFocus(_searchfocus)
  }, [_searchfocus]);

  useEffect(() => {
    const handleScroll = () => {
      // setScrollPosition(window.scrollY); // Get the scroll position of the body
      var scrollpos = (window.scrollY) || 0
      // console.log(scrollpos, scrolled)
      setScrolled((prevScrolled) => {
        if (scrollpos > 12 && !prevScrolled) {
          return true;
        } else if (scrollpos <= 12 && prevScrolled) {
          return false;
        }
        return prevScrolled; // No change
      });
    };

    // Attach the scroll event to the window
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
      <>
        <Head>
              <title>The engineer blog</title>
              <meta name="google-site-verification" content="6eaL9fiBZUv9Qss66rr9LnoPyNEv5e5rdfO7_GqQwVc" />
              <meta name="apple-mobile-web-app-capable" content="yes" />
              <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
              <link rel="icon" href="/favicon.ico" />
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
              <link 
                rel="stylesheet" 
                href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
                crossOrigin="anonymous" />
              <link href="https://fonts.googleapis.com/css2?family=Charm:wght@400;700&family=Fira+Code:wght@300..700&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        </Head>
        <div className='w-full flex flex-col overflow-x-clip m-0 p-0'>
            <div className="sticky relative top-0  m-0 p-0 z-50 w-full h-auto ">
                <Header scrolled={scrolled}  />
            </div>
            <div className="w-full flex flex-grow min-h-screen m-0 p-0 overflow-x-clip" style={stylers}
                      onClick={
                            (_) => {
                                          
                                          if ( isSearchFocused ) {
                                            dispatch(sf(false));
                                          } 
                              }
                            }
                  >
              
              
              <div className="w-full min-h-screen overflow-x-clip" id="rooter">
                <div id='content' 
                      onScroll={
                        (e) => {
                            // var scrollpos = (document.getElementById('content')?.scrollTop) || 0
                            // var scrollpos = (document.getElementsByTagName('body').item(0)?.scrollTop) || 0
                            // var scrollpos = (window.scrollY) || 0
                            // console.log(window.scrollY)
                            // if (scrollpos > 4 && !scrolled){
                            //     setScrolled(true);
                            //     // mainScreen.enter();
                            // }else if (scrollpos < 90 && scrolled){
                            //     setScrolled(false)
                            // }
                        }
                      } 
                      className="flex flex-col space-y-0.5 overflow-x-clip
                                px-0 pt-10 m-0 
                                w-full
                                relative top-0 -translate-y-8 left-0
                                ">
                      
                      <div className="flex lg:flex-row flex-col flex-grow m-0 space-x-3 space-y-0.5 self-center w-full "
                                >
                        {
                          isSearchFocused ? 
                                  <SearchPage /> 
                                  : 
                                  (
                                    <div className="flex-1 lg:flex-auto grow order-last lg:order-first 
                                                    lg:min-width-[70%] lg:w-9/12 w-full 
                                                    h-30 lg:h-full">
                                        {
                                          children  
                                        }
                                    </div>
                                  )
                        }
                        
                        <div id='aside' className="
                                      lg:sticky order-first lg:order-last
                                      w-full lg:w-3/12 xs:w-full sm:w-full 
                                      lg:block hidden md:block
                                      top-20 ml-2 mb-10 flex-grow
                                      lg:h-screen h-min
                                      "
                                      onClick={(e) => e.stopPropagation()}
                                      >
                              <LinkCard mainScreen={mainScreen} sideScreen={sideScreen}  />
                              <SearchNav />
                              { 
                                showNav() && !isSearchFocused ? 
                                  <SideNav /> : ""
                              }
                            {/* <div 
                              // style={{width: "--webkit-fill-available"}}
                              className="lg:h-screen max-h-screen lg:w-fill p-2 pr-0">
                              
                            </div> */}
                        </div>

                      </div>
                      <div 
                          id='footer' 
                          style={{minHeight: "200px"}}
                          className='flex-auto block bg-s fg-s pb-3 pt-2 border-t-2 border-dotted
                                    border-teal-800/40
                                    '
                                    >
                        <div className='lg:hidden block'>
                            {
                              theme == 'dark' ? 
                              <i 	
                                  
                                  className='fa-solid fa-sun mx-3 my-0 cursor-pointer hover:animate-pulse float-right'
                                  onClick={switchTheme}> 
                              </i>
                              :
                              <i className='fa-solid fa-moon mx-3 my-0 text-lg cursor-pointer hover:animate-pulse float-right' 
                                  onClick={switchTheme}> </i>

                            }
                        </div>
                        <h3 className='text-right mr-3 ml-2'>
                            Made by Macrodat 2023
                        </h3>
                      </div>

                  </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default Layout