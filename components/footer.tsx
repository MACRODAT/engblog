import Link from "next/link";
import React from "react";
import { setThemeState } from '../store/themeSlice'
import { useDispatch, useSelector } from "react-redux";

export default function Footer() {


	let dispatch = useDispatch();

	let theme = useSelector((state: any) => state.theming.current);

	const switchTheme = () => {
		if (theme == 'light'){
			dispatch(setThemeState('dark'))
		}else{
			dispatch(setThemeState('light'))
		}
	}

	return (
	  <footer className="bg-p fg-p text-sm">
		{/* Top Section */}
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-gray-300">
		  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
			<div className="mx-10">
				<div className='lg:hidden block'>
					{
						theme == 'dark' ? 
						<i 	
							
							className='fp-p fa-solid fa-sun mx-3 my-0 cursor-pointer hover:animate-pulse float-right'
							onClick={switchTheme}> 
						</i>
						:
						<i className='fa-solid fa-moon mx-3 my-0 text-lg cursor-pointer hover:animate-pulse float-right' 
							onClick={switchTheme}> </i>

					}
				</div>
				<h3 className="font-semibold text-gray-900 dark:text-gray-400 mb-4">
					Who is this blog for?
				</h3>
				<p>
					This blog is <em>primarly</em> aimed for fellow mechanical engineers.
					It is a place for sharing of ideas, our common curiosity on how things
					<em>-should-</em> work, and much more.
					Thank you for stopping by! I hope you enjoy exploring this corner of the internet as much as I enjoy creating it. 
					Let’s build, innovate, and inspire together!
					Feel free to reach out or share your thoughts — I’d love to connect!					
				</p>
			</div>
			<div className="mx-10">
			  <h3 className="font-semibold text-gray-900 dark:text-gray-400 mb-4">About me</h3>
			  <ul className="space-y-2">
				<li><Link href={"/about"} className="hover:underline">About me</Link></li>
				<li><Link href={"/about"} className="hover:underline">Contact</Link></li>
				<li><Link href={"/about"} className="hover:underline">Have stories? Post here!</Link></li>
				<li><Link href={"/about"} className="hover:underline">My IT blog</Link></li>
			  </ul>
			</div>
		  </div>
		</div>
		
		{/* Bottom Section */}
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
		  <p className="text-center text-xs text-gray-500 dark:text-gray-400">
			© 2025 Macrodat
		  </p>
		</div>
	  </footer>
	);
  }
  