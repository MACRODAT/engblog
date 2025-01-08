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
			return "mx-8 mt-2 md:mt-1 md:mb-1 animateHeader ita flex-1 text-xl md:text-2xl  \
				\
				\
				\
				\
				\
			" 
		}
		else{
			return "mr-10 ml-10 mt-2 md:mt-1 md:mb-1 ita \
				uppercase text-xl md:text-2xl font-thin \
				transition ease-out duration-100 \
				hover:ease-in hover:scale-105 \
				motion-safe  \
				basis-7/12 \
				text-center \
				flex-grow \
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
			className={"mr-0 p-0 flex justify-center items-center content-center " + 
            	(scrolled ? 'backdrop-blur-sm drop-shadow-md brightness-100 border-b-4' : 'bg-transparent')}
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
							'flex-initial text-end  font-thin p-2 \
							cursor-pointer \
							transition ease-out duration-100 \
							hover:ease-out hover:bg-indigo-900/50 hover:border-dashed hover:border-orange-900 hover:text-slate-50 \
							' 
							:  
							('flex-initial text-end cursor-pointer p-2 m-0 \
							border-indigo-500  border-b \
							transition ease-out duration-100 \
							hover:ease-in  hover:border-indigo-500 \
							'
							.concat(loggedInState ? 'bg-sky-100' : '')
							.concat(theme == 'light' ? 'hover:text-slate-900 hover:bg-indigo-100 bg-white' : 'hover-text-slate-50 bg-black hover:bg-sky-900')
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
								<div onClick={loginFunction}><i className='fa fa-sm fa-user' /> Login </div>
							)
						}
				</h3>
        </div>
    )
}

export default (Header);