import React from "react";
import "./../banner/Banner.css";
import {
  BannerBg,
  CalenderImg,
  CurveImg,
  FindImg,
  LocationImg,
  RectangleImg,
  SearchImg,
  TypesImg,
} from "../../assets/images";

export default function Banner() {
  return (
    <>
      <div className="banner-bg">
        <img src={RectangleImg} alt="" />
        <div className="default">
          <img src={BannerBg} alt="" />
          <div className="default">
            <img src={CurveImg} alt="" />
          </div>
          <div className="banner-content">
            <div className="container">
              <div className="row">
                <div className="col-sm-7">
                  <h5>
                    Top-Of-The-Line Equipment Ready At Flexible Rates Around
                  </h5>
                  <h1>Your One-Stop Source For All Equipment Rental Needs</h1>
                </div>
              </div>
              <div className="row booking-form">
                <div className="col-sm-3">
                  <div className="booking_main">
                    <div>
                      <img src={SearchImg} alt="" />
                    </div>
                    <div className="booking-area">
                      <label>Search</label>
                      <input
                        type="text"
                        placeholder="What are you looking for ?"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="booking_main">
                    <div>
                      <img src={TypesImg} alt="" />
                    </div>
                    <div className="booking-area">
                      <label>Types</label>
                      <select>
                        <option value="">Any</option>
                        <option value="">1</option>
                        <option value="">2</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="booking_main">
                    <div>
                      <img src={LocationImg} alt="" />
                    </div>
                    <div className="booking-area">
                      <label>Location</label>
                      <input type="text" placeholder="Your location" />
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="booking_main">
                    <div>
                      <img src={CalenderImg} alt="" />
                    </div>
                    <div className="booking-area">
                      <label>Availability</label>
                      <input
                        type="text"
                        placeholder="Jul 10, 2023 - Jul 10, 2023 "
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="find-btn">
                    <button>
                      <img src={FindImg} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
