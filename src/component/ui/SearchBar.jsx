/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { FiSearch } from "react-icons/fi";

function Searchbar({ search, setSearch, action }) {
  return (
    <>
      <div className=" w-full flex md:gap-2  ">
        <div className="hidden md:flex items-center pl-3 justify-end w-full">
          <div className="flex py-3">
            <input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-[24px] border-[1px] md:px-2 md:py-[7px] text-xs rounded-r-none border-gray-300 outline-none "
            />
          </div>
          <div className="flex items-center cursor-pointer bg-secoundary rounded-md p-2 rounded-l-none border border-gray-300 px-1 py-[2px] md:px-2 md:py-[7px]">
            <FiSearch
              className="w-3 h-3  md:w-4 md:h-4  text-xs text-black"
              onClick={() => action(search)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Searchbar;
