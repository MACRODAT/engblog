//  @ts-nocheck

import { Router, useRouter } from 'next/router'
import React from 'react'

const LinkCard = () => {
    const router_ = useRouter();
    let router = (path : string) => router_.push(path); 

    let buttoner = (title : string, link : string) =>  {
        let pth = (router_.pathname == link) ? ' bg-p fg-p ' : 'bg-s fg-s ';
        return (
            <button 
                    onClick={() => router(link)}
                    className={"\
                            min-w-fit w-40   \
                            flex-auto \
                            p-2  \
                            relative border-box pr-0 \
                            mr-0 ml-auto pl-auto \
                            right-0 \
                            border-l-2 \
                            transition-all \
                            hover:ease-out hover:duration-100 \
                            hover:bg-zinc-300 \
                            hover:sepia \
                            \
                            " + pth
                            }
                            >
                {title}
            </button>
            )
        }
    let showAllSideNav = () => {
        // console.log(router.route)
        // console.log( ['/','/about','/login'].includes(router_.route))
        return ['/','/about','/login'].includes(router_.route)
    }
    // let showAllVar = showAll();

    return (
        <div className='relative w-full p-1 m-0
                flex hidden md:flex
                bg-transparent-100
                backdrop-blur-lg drop-shadow-md'>
            {buttoner('Home', '/')}
            {
                showAllSideNav()
                ? 
                (
                    <>
                        {
                            buttoner('Login', '/login')
                        }
                        {
                            buttoner('About', '/about')
                        }
                    </>
                ) 
                : 
                ''
            }
            
        </div>
    )
}

export default LinkCard 