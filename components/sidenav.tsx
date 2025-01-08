//  @ts-nocheck

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { linkDict } from '../services';
import { mainpages } from '../mock/mainpages';


let selectedNav_ = "";

export default function SideNav(){
  // let [user, _] = useUserContext();
  let [menus, setMenus] = useState(new Map<String, boolean>());
  let [flag, setFLag] = useState(false);
  let nav_ = useSelector(state => state.user.navigation);

  // if (nav_ == undefined || nav_ == null || nav_ == []){
  //   let data = await compileNavigationAlgo();
  // }
  let [nav, setNav] = useState(nav_);

  useEffect(() => {
    setNav(nav_)
  }, [nav_]);

  // let navigation = useSelector(state => state.user.navigation);
  let router = useRouter();
  
  let compiler = () => {
    // console.log(nav_);
    if (nav === null || nav === undefined || nav == [] || nav == {}){
      return ''
    }else{
      try {
        // let navs = nav_;
        let navs = Array.from(nav_.keys());
        navs.reverse();

        let findAllNodes = (whichPost) => {
          let allposts = [];

          let pusher = (_post, posts2, allposts) => {
            if (posts2.get(_post) != undefined && posts2.get(_post) != ''){
              Array.from(posts2.get(_post)).forEach(post => {
                allposts.push(post);
                // pusher(post, posts2, allposts);
              })
            }
          } 

          pusher(whichPost, nav_, allposts);

          return allposts;
        }

        
        
        let builder = (el) =>
            { 
                  // console.log(el);
                  if (menus.get(el) == undefined){
                    menus.set(el , false); 
                  }
                  let link = linkDict.get(el);
                  let children = findAllNodes(el);
                  // console.log(children)
                  return <li key={el} className={
                                    'w-full pl-5 grid grid-cols-5'
                                  }
                            onClick={(e) => {
                              menus = menus.set(el, !menus.get(el));
                              // menus.set(el, !menus.get(el));
                              // console.log(el)
                              setMenus(new Map(menus));
                              e.stopPropagation();
                            }}
                            
                        >
                          <p 
                            className={
                              el == selectedNav_ ?  
                              'col-span-4 cursor-pointer p-1 text-left mx-1 underline decoration-dashed'
                              :
                              'col-span-4 cursor-pointer p-1 text-left mx-1'
                            }
                            onClick={(e) => {
                              // navigate to this link
                              router.push('/post/' + link)
                              selectedNav_ = el;
                              e.stopPropagation()
                            }}
                            onMouseOver={ (e) => {
                              if (el != selectedNav_)
                              {
                                e.currentTarget.classList.add('decoration-solid');
                                e.currentTarget.classList.add('underline');
                                e.currentTarget.classList.remove('no-underline');
                              }
                              e.stopPropagation();
                            }}
                            onMouseLeave={ (e) => {
                              if (el != selectedNav_)
                              {
                                e.currentTarget.classList.remove('decoration-solid');
                                e.currentTarget.classList.remove('underline');
                                e.currentTarget.classList.add('no-underline');
                              }
                              
                              e.stopPropagation();
                            }}
                            >
                            {el}
                          </p>

                          {
                          children?.length > 0 ?
                            !menus.get(el) ?
                            <i className='col-span-1 p-0 m-0 text-base cursor-pointer fa-solid fa-angle-down mx-2 
                                          iconaligncenter'
                            ></i>
                            :
                            <i className='col-span-1 p-0 m-0 text-base cursor-pointer fa-solid fa-angle-up mx-2 
                                          iconaligncenter'
                            ></i> : <i className='col-span-1 p-0 m-0'></i>
                          }

                          {
                            menus.get(el) ?
                              <ul className='col-span-5 '>
                              {
                                children.map((el2) => {
                                  return builder(el2)
                                })
                              }
                              </ul> 
                              :
                              ''
                          }
                    </li>
            }
        return navs.map((el) => {
          let my_link = linkDict.get(el);
          if (mainpages.includes(my_link))
          {
            return builder(el);
          }
          return null;
        })
      } catch (error) {
        // console.log(error)
        return ''
      }
    }
  }
 
  return (
    <div id="sidenav"
        className='border border-slate-200/30 fg-p text-sm md:text-lg
                p-2 m-1 text-center
                right-0 mr-0
                w-full'
        >
            {
              (nav === null || nav === undefined) ? '...' : (
                <ul className='marker:text-sky-700 transition-all p-1 ease-in duration-150'>
                    <li key={'1'} id='focused' className='hover:underline hover:decoration-solid text-left fg-p font-bold'>Blog Content</li>
                    {
                      compiler()
                    }
                </ul>
              )
            } 


            
    </div>
  )
}


// export async function getServerSideProps(context){
//   let data : any = (await compileNavigationAlgo() as any) || "";
//   console.log(data)
//   return {
//     props : { 
//       nav : data
//     }
//   };
// }





