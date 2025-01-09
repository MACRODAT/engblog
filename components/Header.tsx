//  @ts-nocheck

import React, { useEffect, useState } from 'react'
import { useThemeContext } from '../store/themeProvider'
import { useSelector, useDispatch, connect } from 'react-redux'
import { selectCurrentThemeState, setThemeState } from '../store/themeSlice'

import { auth } from '../mock/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { async } from '@firebase/util';
import { useAuthState } from 'react-firebase-hooks/auth';
import { setLogin, setUserFromGoogleAuth } from '../store/sessionSlice';
import { makePublicRouterInstance, Router, useRouter } from 'next/router';


const Header = ({scrolled} : 
					{scrolled : boolean, switchTheme : any,currentTheme : any}) => {

	let loggedIn_ = useSelector(state => state.auth.loggedIn);
	let [loggedInState, setLoggedInState] = useState(loggedIn_);
	const [user, setUser ] = useAuthState(auth);

	let dispatch = useDispatch();

	// THEMING
	let theme = useSelector(state => state.theming.current);

	const switchTheme = () => {
		if (theme == 'light'){
			dispatch(setThemeState('dark'))
		}else{
			dispatch(setThemeState('light'))
		}
	}

	let getHeaderTitleStyle = () => {
		
		if (scrolled) 
		{ 
			return "m-0 md:mt-1 md:mb-1 animateHeader ita flex-grow text-center text-lg md:text-xl lg:text-2xl  \
				\
				\
				\
				\
				\
			" 
		}
		else{
			return "mr-10 ml-10 mt-2 md:mt-1 md:mb-1 ita \
				uppercase text-xl md:text-2xl lg:text-4xl underline \
				decoration-double font-thin \
				basis-7/12 \
				text-center \
				flex-grow \
				\
			" 
		}
	}

	// AUTH
	const googleAuth = new GoogleAuthProvider();
	const loginFunction = async() => {
		const result = await signInWithPopup(auth, googleAuth);
	};

	useEffect(( ) => {
		if (user){
			setLoggedInState(true);
			dispatch(setLogin(true));
			dispatch(setUserFromGoogleAuth(user));
		}
	}, [user]);

	useEffect(() => {
		setLoggedInState(loggedIn_)
	}, [loggedIn_]);

	let router = useRouter();


    return (
        <div id='header'
			className={"mr-0 p-0 w-full pl-2 pr-2 flex justify-center items-center content-center " + 
            	(scrolled ? 
							(
								theme == 'light' ?
								'fg-p bg-p border-b-1 border-black \
								drop-shadow-[0_1px_4px_rgba(0,0,0,0.75)]' 
								:
								'fg-p bg-p border-b-1 border-white \
								drop-shadow-[0_1px_8px_rgba(20,255,40,0.25)]' 

							)
							: 
							'bg-transparent')}
          > 
				<div 
						onClick={switchTheme}
						className='hidden md:block mx-1 my-0 cursor-pointer hover:animate-pulse w-2'>
						<i 	
								className={theme=='dark' ? "fa-solid fa-sun" : "fa-solid fa-moon"}
								onClick={switchTheme}> 
						</i>
				</div>
				<h1 className={getHeaderTitleStyle()}>
					The engineer blog
				</h1>
				
				<h3 className={ 
						scrolled ? 
							'flex-initial text-center font-thin p-2 \
							cursor-pointer \
							hover:ease-out hover:bg-indigo-900/50 hover:border-dashed hover:border-orange-900 hover:text-slate-50 \
							' 
							:  
							('flex-initial text-center cursor-pointer p-2 m-0 \
							\
							hover:ease-in  hover:border-indigo-500 \
							'
							.concat(loggedInState ? '' : '')
							.concat(theme == 'light' ? 'hover:text-slate-900 hover:bg-indigo-100' 
											: 'hover-text-slate-50 hover:bg-sky-900')
							)}>
						{
							loggedInState ? 
							(
								<div onClick={() => {router.push('/account')}}>
									<i className='fa fa-md fa-person-shelter mx-2' />
									My account
								</div>
							):
							(
								<div onClick={loginFunction}>
									<i className='fa fa-sm fa-user' />
									<span className='hidden md:inline mx-4'>
										Login
									</span>
								</div>
							)
						}
				</h3>
        </div>
    )
}

export default (Header);