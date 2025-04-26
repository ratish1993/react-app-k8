import React from "react";
import { Link } from "react-router-dom";
import "./../footer/Footer.css";
import { NewsLetterImg, ellipseImg } from "../../assets/images";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-5">
              <div className="footer_logo">
                <h2>Rent Out</h2>
                <img src={ellipseImg} alt="" />
              </div>
              <div className="footer_content d-flex gap-4">
                <Link to="/">Facebook</Link>
                <Link to="/">Instagram</Link>
                <Link to="/">Linkedin</Link>
                <Link to="/">Pinterest</Link>
              </div>
              <div className="news-letters">
                <h4>Subscribe to our newsletters</h4>
                <label>Enter email address</label>
                <input type="email" />
                <button>
                  <img src={NewsLetterImg} alt="" />
                </button>
              </div>
            </div>
            <div className="col-md-12 col-lg-7">
              <div className="row">
                <div className="col-md-4 col-lg-4">
                  <div className="footer_title">
                    <div className="title">Quick links</div>
                  </div>
                  <div className="footer-list">
                    <ul>
                      <li>
                        <Link>New York</Link>
                      </li>
                      <li>
                        <Link>SAn Diaego</Link>
                      </li>
                      <li>
                        <Link>Chicago</Link>
                      </li>
                      <li>
                        <Link>Los Angeles</Link>
                      </li>
                      <li>
                        <Link>Seattle </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-4 col-lg-4">
                  <div className="footer_title">
                    <div className="title">News</div>
                  </div>
                  <div className="footer-list">
                    <ul>
                      <li>
                        <Link>Blog</Link>
                      </li>
                      <li>
                        <Link>FAQ</Link>
                      </li>
                      <li>
                        <Link>Media</Link>
                      </li>
                      <li>
                        <Link>Vendors Terms</Link>
                      </li>
                      <li>
                        <Link>Social Issues</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-4 col-lg-4">
                  <div className="footer_title">
                    <div className="title">Pages</div>
                  </div>
                  <div className="footer-list">
                    <ul>
                      <li>
                        <Link>Sitemaps</Link>
                      </li>
                      <li>
                        <Link>Terms & Conditions</Link>
                      </li>
                      <li>
                        <Link>Privacy Policy</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row footer-down">
            <div className="col-lg-6 col-md-12">
              <div className="footer-down-left">
                <span>© 2023 rent out. All right reserved</span>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="footer-down-right">
                <Link to="/">Privacy</Link>
                <Link to="/">Terms & Conditions</Link>
                <Link to="/">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
