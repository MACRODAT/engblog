import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChevronDown, faChevronRight, faClose } from '@fortawesome/free-solid-svg-icons';

const MobileMenu = ({hideMobile} : {hideMobile: any}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (index: number) => {
    setExpandedMenu(expandedMenu === index ? null : index);
  };

  const menus = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { 
      name: "Services", 
      href: "#", 
      submenus: [
        { name: "Web Development", href: "#" },
        { name: "App Development", href: "#" },
        { name: "SEO", href: "#" },
      ]
    },
    { name: "Map", href: "#" },
    { 
      name: "Contact", 
      href: "#", 
      submenus: [
        { name: "Email", href: "#" },
        { name: "Phone", href: "#" },
      ]
    },
  ];

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
            {menus.map((menu, index) => (
              <li key={index} className=''>
                <div className="flex items-center justify-between px-4 py-2 rounded-md bg-p hover:bg-s hover:fg-ss">
                  <a href={menu.href} className="block w-full">
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
