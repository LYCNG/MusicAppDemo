import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

import { HiOutlineMenu } from "react-icons/hi";
import { logo } from "../assets";
import { links } from "../assets/constants";

const NavLinks = ({ handleClick }: { handleClick?: () => void }) => (
  <div className="mt-10 ">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <React.Fragment>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks />
      </div>
      <div className="absolute md:hidden block right-3 top-6">
        {showMobileMenu ? (
          <RiCloseLine
            className="w-6 h-6 text-white mr-2"
            onClick={() => setShowMobileMenu(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 text-white mr-2"
            onClick={() => setShowMobileMenu(true)}
          />
        )}
        <div
          className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 
          p-6 md:hidden transition-transform duration-500 ease-out-in transform
          ${showMobileMenu ? "translate-x-full" : "translate-x-0"}`}
        >
          <img src={logo} alt="logo" className="w-full h-14 object-contain" />
          <NavLinks handleClick={() => setShowMobileMenu(false)} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
