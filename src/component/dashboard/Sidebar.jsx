import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoPricetagsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const SideBar = () => {
  const sideBarData = [
    {
      title: "Dashboard",
      Icon: <AiOutlineHome className="w-7 h-7" />,
      link: "/dashboard",
    },
    {
      title: "Tag",
      Icon: <IoPricetagsOutline className="w-7 h-7" />,
      link: "/tag",
    },
  ];
  return (
    <div className="flex flex-col w-full h-screen p-4 mt-4 gap-3">
      {sideBarData?.map((data, i) => {
        return (
          <Link
            to={data?.link}
            className="flex gap-5 w-full cursor-pointer mt-4 px-3"
            key={i}
          >
            <span className="w-6 h-6 flex items-center justify-center">
              {data.Icon}
            </span>
            <div className="text-lg font-medium w-full text-black">
              {data?.title}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SideBar;
