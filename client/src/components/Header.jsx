import React from "react";
import { popularSearch } from "../utils/data";
import { HeroImage } from "../assets";
import { AiOutlineSearch } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { CustomButton, SearchInput } from "./";

const Header = ({
  title,
  type,
  handleClick,
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
}) => {
  return (
    <div className="bg-[#f7fdfd] ">
      <div
        className={` max-[330px]:pt-[9rem]  container mx-auto px-5 ${
          type ? "h-[500px]" : "h-[400px]"
        } flex items-center relative`}
      >
        <div className="w-full z-10">
          <div className="mb-8">
            <p className="text-slate-700 font-bold text-4xl sm:w-[64%] lg:w-full">{title}</p>
          </div>

          <div className="w-full flex items-center justify-around bg-white px-2 md:px-5 py-2.5 md:py-6 shadow-2xl rounded-full">
            <SearchInput
              placeholder="Job Title or Keywords"
              icon={<AiOutlineSearch className="text-gray-600 text-2xl" />}
              value={searchQuery}
              setValue={setSearchQuery}
            />

            <SearchInput
              placeholder="Add Country or City"
              icon={<CiLocationOn className="text-gray-900 text-2xl" />}
              value={location}
              setValue={setLocation}
              styles={"hidden md:flex"}
            />

            <div>
              <CustomButton
                onClick={handleClick}
                title="Search"
                containerStyles={
                  "text-white py-2 md:py3 px-3 md:px-10 focus:outline-none  transition ease-in-out duration-500 bg-orange-400  hover:bg-orange-900 rounded-full md:rounded-md text-sm md:text-base"
                }
              />
            </div>
          </div>

          {/* popular searches */}
          <div className="max-[330px]:pb-[8rem] w-full flex flex-wrap gap-3 md:gap-6 pt-10 ">
            {popularSearch.map((search, index) => (
              <span
                key={index}
                className="bg-[#1953fb78] text-white py-1.5 px-4 rounded-xl text-sm md:text-base"
              >
                {search}
              </span>
            ))}
          </div>
        </div>

        <div className='hidden sm:inline-block w-1/3 h-full absolute top-[4.5rem] md:top-6 lg:-top-14 right-16 2xl:right-[5rem] 2xl:-top-[4.5rem] '>
          <img src={HeroImage} className='object-contain' />
        </div>
      </div>
    </div>
  );
};

export default Header;
