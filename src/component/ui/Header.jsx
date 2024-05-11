import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

const Header = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="bg-secoundary px-2">
        <div className="py-2 lg:py-5 flex items-center justify-between  lg:max-w-[1000px] xl:max-w-[1250px] 2xl:max-w-[1400px] mx-auto px-4 ">
          <div className="flex gap-3 cursor-pointer">
            <img src={logo} className="w-24" />
          </div>
          <div
            onClick={logoutHandler}
            className="text-lg font-medium text-white cursor-pointer"
          >
            Logout
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
