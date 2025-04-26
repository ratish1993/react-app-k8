import React, { useEffect, useState } from "react";
import "./../header/header.css";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { default_avatar, ellipseImg } from "../../assets/images";
import { toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import { TbLogout } from "react-icons/tb";
import { MdAccountBox, MdOutlineFavorite } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import axios from "../../helper/axios";
import config from "../../helper/config ";
// import { getFMCToken } from "../../firebase.config";
import { BUCKET_DOMAIN } from "../../helper/Helper";
import { FaHeart } from "react-icons/fa";
import { HiOutlineChatAlt } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";

export default function Header() {
  let location = useLocation();
  let path = location?.pathname;
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("userDetails");
    if (data) {
      setUserDetails(JSON.parse(data));
      // requestPermission();
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // getMyNotificationToken();
    }
  }, []);

  const requestPermission = () => {
    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          // getMyNotificationToken();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getMyNotificationToken = () => {
    // getFMCToken()
    //   .then((new_token) => {
    //     if (new_token) {
    //       const current_token = localStorage.getItem("fmc_token");
    //       // console.log("new_token", new_token);
    //       // console.log("current_token", current_token);
    //       if (current_token !== new_token) {
    //         // updateFmcToken(new_token);
    //       }
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  const updateFmcToken = (fmc_token) => {
    axios
      .post("notification/update-fmc-token", { fmc_token }, config)
      .then((res) => {
        if (res.data.success) {
          // set token in local storage
          localStorage.setItem("fmc_token", fmc_token);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const logout = () => {
    const aa = toast.loading("Please Wait");

    setTimeout(() => {
      localStorage.clear();
      window.location.pathname = "/login";
      toast.done(aa);
    }, 1500);

    // const hideMessage = message.loading("Please wait ...", 0);
    // let userdata = JSON.parse(localStorage.getItem("userdata"));
    // const formData = {
    //   hash_id: userdata.hash_id,
    //   platform: "web",
    // };

    // axios
    //   .post("/logout", formData, config)
    //   .then((res) => {

    //     if (res.data.status === "1") {
    //       toast.success(res.data.message);
    //     }
    //     this.removeLocalStorage();
    //   })
    //   .catch((err) => {

    //     toast.error("Something went wrong!!");
    //     console.error(err);
    //   });
  };

  return (
    <>
      {/* <div className="header-top">
        <div className="container">
          <div className="row border-b">
            <div className="col-sm-6">
              <div className="left-bar">
                <select>
                  <option value="">English</option>
                  <option value="">1</option>
                  <option value="">2</option>
                </select>
                <select>
                  <option value="">US Dollar</option>
                  <option value="">1</option>
                  <option value="">2</option>
                </select>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="right-bar">
                <Link to="/">Become a renter !</Link>
                <Link to="/">Login</Link>
                <Link to="/">Helpline +01 112 345 9877</Link>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close mt-3">
            <span className="icon-close2 js-menu-toggle">
              <RxCross1 />
            </span>
          </div>
        </div>
        <div className="site-mobile-menu-body" />
      </div>
      <div className="site-navbar-wrap">
        <div className="site-navbar site-navbar-target js-sticky-header">
          <div className="container">
            <div className="menu-area">
              <div className="row align-items-center">
                <div className="col-lg-2 col-md-4 col-sm-4 col-5 main-logo">
                  <h3 className="mb-0">Rent Out</h3>
                  <img src={ellipseImg} alt="" />
                </div>
                <div className="col-lg-10 col-md-8 col-sm-8 col-7">
                  <nav className="site-navigation text-right" role="navigation">
                    <div className="container">
                      {/* <div className="d-inline-block d-lg-none ml-md-0 mr-auto py-3 mb-d-none">
                        <Link
                          to="/"
                          className="site-menu-toggle js-menu-toggle text-white"
                        >
                          <span className="icon-menu h3">
                            <FaBars />
                          </span>
                        </Link>
                      </div> */}
                      <div className="search-bar">
                        {/* <div className="form-search">
                          <input type="text"
                            placeholder="Search" />
                          <IoSearch />
                        </div> */}
                        {/* <ul className="site-menu main-menu js-clone-nav d-none d-lg-block">
                          <li className="active">
                            <Link to="/" className="nav-link">
                              Home
                            </Link>
                          </li>
                          <li>
                            <Link to="/equipments" className="nav-link">
                              Equipments
                            </Link>
                          </li>
                          <li>
                            <Link to="/companies" className="nav-link">
                              Companies
                            </Link>
                          </li>
                          <li>
                            <Link to="/contact-us" className="nav-link">
                              Contact Us
                            </Link>
                          </li>
                        </ul> */}

                        {localStorage.getItem("token") && (
                          <Dropdown className="myprofiles-sec gap-2">
                            {/* <span className="messages">
                              <TbMessageCircle2Filled />
                              <label className="messagescount">1</label>
                            </span> */}
                            <Link to="/all-chats">
                              <span className="chat-icon">
                                <HiOutlineChatAlt />
                              </span>
                            </Link>
                            {userDetails.user_type === 2 && (
                              <Link to="/my-favorite-equipment">
                                <span className="favorites">
                                  <MdOutlineFavorite />
                                  {/* <label className="favoritescount">1</label> */}
                                </span>
                              </Link>
                            )}
                            <Dropdown.Toggle
                              id="dropdown-basic"
                              className="pb-0"
                            >
                              {userDetails.avatar ? (
                                <img
                                  src={BUCKET_DOMAIN + userDetails.avatar}
                                  alt="Profile Image"
                                />
                              ) : (
                                <img src={default_avatar} alt="Profile Image" />
                              )}

                              <button className="myprofiles-sec-title">
                                {userDetails.full_name}
                              </button>
                            </Dropdown.Toggle>
                            <span className="notifications">
                              <IoNotifications />
                              {/* <label className="notificationcount">1</label> */}
                              {/* add class count morthen 9  className="notificationcount mothenten" */}
                            </span>
                            <Dropdown.Menu>
                              <Dropdown.Item>
                                <MdAccountBox />{" "}
                                <Link
                                  style={{
                                    textDecoration: "none",
                                    color: "#000",
                                  }}
                                  to="/my-profile"
                                >
                                  My Profiles
                                </Link>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <FaHeart />{" "}
                                <Link
                                  style={{
                                    textDecoration: "none",
                                    color: "#000",
                                  }}
                                  to="/my-wishlist"
                                >
                                  My Wishlist
                                </Link>
                              </Dropdown.Item>
                              <Dropdown.Item onClick={logout}>
                                <TbLogout /> Logout
                              </Dropdown.Item>
                            </Dropdown.Menu>
                            <button
                              style={{ color: "#000" }}
                              className="btn btn-primary header-collaspes"
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#offcanvasExample"
                              aria-controls="offcanvasExample"
                            >
                              <FaBars />
                            </button>
                            <div
                              className="offcanvas offcanvas-start"
                              tabIndex="-1"
                              id="offcanvasExample"
                              aria-labelledby="offcanvasExampleLabel"
                            >
                              <div className="offcanvas-header">
                                <h5
                                  className="offcanvas-title"
                                  id="offcanvasExampleLabel"
                                >
                                  &nbsp;
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close text-reset"
                                  data-bs-dismiss="offcanvas"
                                  aria-label="Close"
                                >
                                  <RxCross1 />
                                </button>
                              </div>
                              <div className="offcanvas-body">
                                <Link
                                  data-bs-dismiss="offcanvas"
                                  aria-label="Close"
                                  to="/firm-dashboard"
                                  className={
                                    path === "/" || path === "/firm-dashboard"
                                      ? "active list-group-item list-group-item-action border-0 align-items-center mb-2"
                                      : "list-group-item list-group-item-action border-0 align-items-center mb-2"
                                  }
                                >
                                  <span className="ml-2">Dashboard</span>
                                </Link>
                                {userDetails.user_type === 1 && (
                                  <Link
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                    to="/my-equipment"
                                    className={
                                      path === "/my-equipment"
                                        ? "active list-group-item list-group-item-action border-0 align-items-center"
                                        : "list-group-item list-group-item-action border-0 align-items-center"
                                    }
                                  >
                                    <span className="ml-2">My Equipment</span>
                                  </Link>
                                )}
                              </div>
                            </div>
                          </Dropdown>
                        )}
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
