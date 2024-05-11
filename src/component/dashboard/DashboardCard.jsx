import React from "react";
import { FiPlus } from "react-icons/fi";
import { state } from "../../data/state";

const DashboardCard = () => {
  
  const openModal = () => {
    state.uploadFile = true;
  };

  return (
    <div className="flex justify-between items-center m-5">
      <span className="text-[#b47035]  text-xl font-medium">Document File</span>
      <button
        onClick={openModal}
        className="bg-[#b47035] rounded-md py-1.5 px-3 text-white text-md font-normal flex gap-3 items-center justify-center"
      >
        <FiPlus />
        Upload
      </button>
    </div>
  );
};

export default DashboardCard;
