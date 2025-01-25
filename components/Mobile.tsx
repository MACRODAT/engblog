import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChevronDown, faChevronRight, faClose } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { linkDict } from '../services';
import { mainpages } from '../mock/mainpages';

// Define a type for the menu structure
interface MenuItem {
  name: string;
  href: string;
  submenus?: MenuItem[]; // Optional submenus
}

const MobileMenu = ({hideMobile} : {hideMobile: any}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(-1);
  let [menus, setMenus] = useState(new Map<String, boolean>());
  const [menusSimpler, setMenusSimpler] = useState(Array<MenuItem>());

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (index: number) => {
    setExpandedMenu(index);
  };

  let router = useRouter();
  let nav_ = useSelector((state : any) => state.user.navigation);
  let [nav, setNav] = useState(nav_);

  useEffect(() => {
    setNav(nav_);
    compiler();
  }, [nav_]);
  
  let compiler = () => {
    console.log(nav_);
    if (nav === null || nav === undefined){
      return;
    }else{
      try {
        // let navs = nav_;
        let navs = Array.from(nav_.keys());
        navs.reverse();

        let findAllNodes = (whichPost: any) => {
          let allposts : Array<string> = [];

          let pusher = (_post: any, posts2: any, allposts: any) => {
            if (posts2.get(_post) != undefined && posts2.get(_post) != ''){
              Array.from(posts2.get(_post)).forEach(post => {
                allposts.push(post);
              })
            }
          } 

          pusher(whichPost, nav_, allposts);
          return allposts;
        }

        let builder = (el : any, parent: any) =>
        { 
          if (menus.get(el) == undefined){
            menus.set(el, false); 
          }
          let link = linkDict.get(el);
          let children = findAllNodes(el);
          console.log(link, children);
          addMenu(el, parent, link);
          children.map((el2) => {
            return builder(el2,el);
          })
        }

        const menusSimple: Array<MenuItem> = [
          { name: "Home", href: "#" },
          { name: "About", href: "/about" },
          { 
            name: "Contact", 
            href: "#", 
            submenus: [
              { name: "Email", href: "#" },
              { name: "Phone", href: "#" },
            ]
          },
        ];

        const addMenu = (menu: string, parentName:string, link:string) => {
          if (parentName) {
            // Find the parent menu
            const parentMenu = menusSimple.find(item => item.name === parentName);
            if (parentMenu) {
              // Check if parent has submenus, if not initialize it
              if (!parentMenu.submenus) {
                parentMenu.submenus = [];
              }
              // Add the new menu to submenus
              parentMenu.submenus.push({name: menu, href: link});
            } else {
              console.warn(`Parent menu "${parentName}" not found. Adding "${menu}" as a root menu.`);
              menusSimple.push({name: menu, href: link});
            }
          } else {
            // Add as a root menu if no parent is specified
            menusSimple.push({name: menu, href: link});
          }
        }

        navs.map((el: any) => {
          let my_link = linkDict.get(el);
          if (mainpages.includes(my_link))
          {
            builder(el, "");
          }
        });

        setMenusSimpler(menusSimple);

      } catch (error) {
        return;
      }
    }
  }

  return (
    <div className="absolute top-12 left-0 w-full bg-p fg-p shadow-lg rounded-lg p-4 z-50">
          <ul className="space-y-2 md:p-10 p-4 list-none w-full">
            <li key={-1} className=''>
              <div className="flex items-center justify-center px-4 py-2 rounded-md bg-p hover:bg-s hover:fg-ss">
                
                <button
                  className="focus:outline-none"
                  onClick={() => hideMobile()}
                  >
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <a onClick={() => hideMobile()} className="block mx-3">
                  Close
                </a>
              </div>
                  
            </li>
            {menusSimpler.map((menu, index) => (
              <li key={index} className=''>
                <div className="flex items-center justify-between px-4 py-2 rounded-md bg-p hover:bg-s hover:fg-ss">
                  <a href={"/post/"+menu.href} className="block w-full">
                    {menu.name}
                  </a>
                  {menu.submenus && (
                    <button
                      className="focus:outline-none"
                      onClick={() => toggleSubmenu(index)}
                    >
                      <FontAwesomeIcon icon={expandedMenu === index ? faChevronDown : faChevronRight} />
                    </button>
                  )}
                </div>
                {menu.submenus && expandedMenu === index && (
                  <ul className="ml-6 mt-2 space-y-2 list-none">
                    {menu.submenus.map((submenu, subIndex) => (
                      <li key={subIndex}>
                        <a
                          href={submenu.href}
                          className="block px-4 py-2 rounded-md bg-p hover:bg-sl hover:fg-ss"
                        >
                          {submenu.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
  );
};

export default MobileMenu;
