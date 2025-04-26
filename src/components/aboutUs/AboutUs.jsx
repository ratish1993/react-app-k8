import React from 'react';
import { Container, Row, Col, } from 'react-bootstrap';
import '../aboutUs/aboutUs.css';

//import CategoryImage1 from '../../images/category-1.png';

export default function AboutUs() {
    return (
        <div>

             {/* About Us Section */}

             <section className='about-section'>
               <Container>
                    <Row>
                        <Col md={6}>
                            <div className='about-content-box'>
                                <h4>About Us.</h4>
                                <h2>
                                    <span>Established in 2014</span>, We provide comprehensive equipment services
                                </h2>
                                <p>
                                    Through our years of experience, we've also learned that while each channel has its own set of advantages. 
                                    Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de text.
                                </p>
                                <div className='hrLine'></div>
                                <div className='about-content-buttom'>
                                    <div className='about-content-buttom-box'>
                                        <div className='about-left'>
                                            <span>12K</span>
                                        </div>
                                        <div className='about-right'>
                                            Happy <br /> Customers
                                        </div>  
                                    </div>
                                    <div className='about-content-buttom-box'>                                        
                                        <div className='about-left'>
                                            <span>30K</span>
                                        </div>
                                        <div className='about-right'>
                                            Registered <br /> Users
                                        </div>  
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className='about-content-image-section'>
                                <img src='https://admin.thezeeshangroup.com/uploads/zaira-construction-image-1693144593.jpg'></img>
                                <div className='about-image-text'>
                                    <span>100+</span> <br/>Companies Onboard
                                </div>
                            </div>
                        </Col>

                    </Row>
               </Container>
             </section>

             {/* About Us Section End*/}

        </div>
    )

}