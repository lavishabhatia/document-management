import React from "react";
import { AiOutlineHome } from "react-icons/ai";

const SideBar = () => {
  const sideBarData = [
    { title: "Dashboard", Icon: <AiOutlineHome className="w-7 h-7" /> },
    { title: "Offers" },
    { title: "Broadcast" },
    { title: "Customers" },
    { title: "Profile" },
  ];
  return (
    <div className="flex flex-col w-full h-screen p-4">
      {sideBarData?.map((data, i) => {
        return (
          <div className="flex gap-5 w-full cursor-pointer mt-4 px-3" key={i}>
            <span className="w-6 h-6 flex items-center justify-center">
              {data.Icon}
            </span>
            <div className="text-lg font-medium w-full text-black">
              {data?.title}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SideBar;
