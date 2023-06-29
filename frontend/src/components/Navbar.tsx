import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import "../styles/Navbar.scss";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { authToken, setAuthToken } = useContext(AuthContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const handleIconClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setDropdownVisible(false);
    navigate("/logout");
  };

  const handleCreatePodcast = () => {
    setDropdownVisible(false);
    navigate("/create-podcast");
  };

  return (
    //<div className='navbar'>
    <div className="navbar">
      <Link to="/" className="logo">
        Oudioo
      </Link>
      <div className="nav-links">
        {authToken ? (
          <>
            <AiOutlineUser className="user-icon" onClick={handleIconClick} />
            {dropdownVisible && (
              <div className="dropdown-menu">
                <Link to="/create-podcast" onClick={handleCreatePodcast}>
                  Create Podcast
                </Link>
                <Link to="/logout" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="nav-items">
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
    //</div>
  );
};

export default Navbar;
