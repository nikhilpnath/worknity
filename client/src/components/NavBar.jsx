import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

import { CustomButton, MenuList } from "./";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

const NavBar = () => {
  const { user } = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false); //navbar display - mobile size

  const dispatch = useDispatch();

  
  // localstorage change detecting and logging outing the user
  window.addEventListener("storage", () => {
    console.log("localStorage change detected!");
    dispatch(logout());
  });

  return (
    <div className="relative bg-[#f7fdfd] z-50">
      <nav className="container  mx-auto flex items-center justify-between p-5 ">
        <div>
          <Link to="/" className="text-[#9f6464] font-bold text-3xl ">
            Worknity
          </Link>
        </div>

        <ul className="hidden lg:flex gap-10 text-md font-bold">
          <li>
            <Link to="/">
              {user?.accountType === "seeker" ? "Find Jobs" : "Jobs"}
            </Link>
          </li>
          {user?.accountType == "seeker" ? (
            <li>
              <Link to="/companies">Companies </Link>
            </li>
          ) : (
            <li>
              <Link to="/upload-job">Upload Job</Link>
            </li>
          )}

          <li>
            <Link to="/about-us">About</Link>
          </li>
        </ul>

        {/* if user does not have a token(didnt created an account) or doesnt have a token */}
        <div className=" hidden lg:block">
          {!user?.token ? (
            <Link to="/user-auth">
              <CustomButton
                title="Sign In"
                containerStyles=" bg-red-900 text-white py-1.5 px-5 focus:outline-none border-none rounded-full text-base border "
              />
            </Link>
          ) : (
            <div>
              <MenuList user={user} position={`absolute`} />
            </div>
          )}
        </div>

        {/* ham burger and close icon */}
        <button
          className="block lg:hidden text-slate-900"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <AiOutlineClose size={26} /> : <HiMenuAlt3 size={26} />}
        </button>
      </nav>

      {/* mobile size navbar */}

      <div
        className={`${
          isOpen ? "absolute flex bg-[#f7fdfd]" : "hidden"
        }  w-full mx-auto lg:hidden flex-col pl-8 gap-3 py-5`}
      >
        <Link to="/" onClick={()=>setIsOpen(false)}>
          {user?.accountType === "seeker" ? "Find Job" : "Jobs"}
        </Link>

        {user?.accountType == "seeker" ? (
          <Link to="/companies"  onClick={()=>setIsOpen(false)}>Companies </Link>
        ) : (
          <Link to="/upload-job" onClick={()=>setIsOpen(false)}>Upload Job</Link>
        )}

        <Link to="/about-us"  onClick={()=>setIsOpen(false)}>About</Link>

        <div className="w-full py-10">
          {!user?.token ? (
            <Link to="/user-auth">
              <CustomButton
                title="Sign In"
                containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
              />
            </Link>
          ) : (
            <div>
              <MenuList user={user} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
