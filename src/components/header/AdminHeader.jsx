import React from "react";
import "./../header/header.css";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ellipseImg } from "../../assets/images";
import { toast } from "react-toastify";

export default function AdminHeader() {
  const logout = () => {
    const aa = toast.loading("Please Wait");

    setTimeout(() => {
      localStorage.clear();
      window.location.pathname = "/admin";
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
      <div className="site-navbar-wrap">
        <div className="site-navbar site-navbar-target js-sticky-header">
          <div className="container">
            <div className="menu-area">
              <div className="row align-items-center">
                <div className="col-lg-2 col-md-4 col-sm-9 col-8 main-logo">
                  <h3 className="mb-0">Rent Out</h3>
                  <img src={ellipseImg} alt="" />
                </div>
                <div className="col-lg-10 col-md-8 col-sm-3 col-4">
                  <nav className="site-navigation text-right" role="navigation">
                    <div className="container">
                      <div className="d-inline-block d-lg-none ml-md-0 mr-auto py-3 mb-d-none">
                        <Link
                          to="/"
                          className="site-menu-toggle js-menu-toggle text-white"
                        >
                          <span className="icon-menu h3">
                            <FaBars />
                          </span>
                        </Link>
                      </div>
                      <div className="search-bar">
                        {localStorage.getItem("admin_token") && (
                          <div className="header-btn" onClick={logout}>
                            <button>Logout</button>
                          </div>
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
