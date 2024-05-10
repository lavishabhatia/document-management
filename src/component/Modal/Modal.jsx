/* eslint-disable react/prop-types */
import { IoCloseOutline } from "react-icons/io5";

const Modal = ({ closeModalHandler, modalName, modalTitle, children }) => {
    return (
      <div className="bg-black/[.50] fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full flex justify-center items-center">
        <div className="relative p-2 w-full max-w-xl  md:h-auto">
          <div className="relative bg-white rounded-lg shadow w-full">
            <button
              onClick={closeModalHandler}
              type="button"
              className="absolute top-3 right-2.5 text-gray-800 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              data-modal-toggle="authentication-modal"
            >
              <IoCloseOutline />
              <span className="sr-only">Close modal</span>
            </button>
  
            <div className="p-2">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="my-2 text-center text-lg font-semibold tracking-tight sm:text-gray-900 ">
                  {modalName}{" "}
                  <span className="text-blueButton">{modalTitle}</span>{" "}
                </h2>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  