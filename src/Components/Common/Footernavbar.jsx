import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import Config from '../../utils/Config';

const Footernavbar = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`${Config.BASE_URL}/api/users/profile`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.error("Error fetching user information:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      {/* <!-- Navbar For small screen--> */}
      <nav
        className="navbar navbar-expand-lg   fixed-bottom d-lg-none d-md-none d-sm-block  shadow-0"
      >
        <div className="container-fluid d-flex justify-content-around  align-items-center p-1">
          {/*  */}
          <Link className="text-center" style={{ fontSize: "1.4rem" }} to="/gallery">
          <i className="fi fi-sr-house-chimney"></i>
          </Link>

          <Link className="text-center" style={{ fontSize: "1.4rem" }} to="/items/camera">
            <i className="fi fi-rr-camera iconColor"></i>
          </Link>
          <Link
            className="text-center"
            style={{ fontSize: "1.4rem" }}
            to="/items/lens"
          >
            <i className="fi fi-sr-aperture iconColor"></i>
          </Link>

          <Link
            className="text-center"
            style={{ fontSize: "1.4rem" }}
            to="/items/accessories"
          >
            <i className="fi fi-sr-scarf iconColor"></i>
          </Link>



          <button className="navbar-toggler border rounded-circle">
            {user ? (
              <>
                <Link to="/profile">
                  <img
                    src={
                      user.image || (
                        <i className="fi fi-ss-user text-primary"></i>
                      )
                    }
                    className="rounded-circle border"
                    style={{ height: "15px" }}
                    alt="."
                    loading="lazy"
                  />
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <div className="rounded-circle pt-2 ">
                    <i className="fi fi-ss-user iconColor"></i>
                  </div>
                </Link>
              </>
            )}
          </button>
        </div>
      </nav>
    </>
  )
}

export default Footernavbar