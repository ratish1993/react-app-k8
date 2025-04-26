import React, { Component } from "react";
import { ProjectCategory, Featured, AboutUs } from "../../components";
import Banner from "../../components/banner/Banner";
export default class Home extends Component {
  render() {
    return (
      <>
        <Banner />
        <ProjectCategory />
        <Featured />
        <AboutUs />
      </>
    );
  }
}
