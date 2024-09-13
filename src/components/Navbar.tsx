import { Link } from "react-router-dom";
import logo from "/src/assets/gmdLogo.png"
import { useAuth } from "../Context/useAuth";
import { isAdmin } from "../Services/ApiService";


const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="relative bg-white w-full flex justify-center  mx-auto p-2">
      <div className="flex items-center justify-between w-4/5">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img className="h-10" src={logo} alt="" />
          </Link>
          <div className="hidden font-bold lg:flex pl-5">
            <Link to="/home" className="px-4 py-1.5 font-bold rounded bg-lightGreen hover:opacity-70">
              Home
            </Link>
          </div>
          {isLoggedIn()  && (
          <>
          <div className="hidden font-bold lg:flex">
            <Link to="/me" className="px-4 py-1.5 font-bold rounded hover:opacity-70">
             My Profile
             </Link>
          </div>
          {isAdmin() &&(
          <div className="hidden font-bold lg:flex">
            <Link to="/users" className="px-4 py-1.5 font-bold rounded bg-lightGreen hover:opacity-70">
              Users
            </Link>
          </div>)}
          </>
)}

</div>
       

{isLoggedIn() ? (
      <div className="hidden lg:flex items-center space-x-6 text-black">
        <a
          onClick={logout}
          className="px-4 py-1.5 font-bold rounded bg-slate-400 hover:opacity-70">
          Logout
        </a>
      </div>
    ) : (
      <div className="hidden lg:flex items-center space-x-6">
        <Link to="/login" className="px-4 py-1.5 font-bold rounded bg-slate-400 hover:opacity-70">
          Login
        </Link>
      </div>
    )}
      </div>


    </nav>
  );
};

export default Navbar;