import React from 'react';
import { Container, Row, Col, } from 'react-bootstrap';
import '../featured/Featured.css';
import { FaStar, } from "react-icons/fa";
//import CategoryImage1 from '../../images/category-1.png';

export default function Featured() {
    return (
        <div>

             {/* Featured Equipments Section */}

             <section className='featured-section'>
                <Container>
                    <Row className='align-items-center'>
                        <Col md={6}>
                            <div className='featured-title'>
                                <h2>Featured Equipments</h2>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='featured-filter'>                                
                                <div className='filter-category-select mr'>
                                    <select>
                                        <option value=''>Filter by category</option>
                                        <option value=''>1</option>
                                        <option value=''>2</option>
                                    </select>
                                </div>
                                <div className='filter-category-select'>
                                    <select>
                                        <option value=''>$0 - $1,000</option>
                                        <option value=''>$100</option>
                                        <option value=''>$200</option>
                                    </select>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className='featured-item-box'>
                                <div className='featured-item-image-box'>
                                    <img src='https://admin.thezeeshangroup.com/uploads/zaira-construction-image-1693144593.jpg'></img>
                                </div>
                                <div className='featured-item-content-box'>
                                    <h4>Standard Excavator</h4>
                                    <ul className='featured-item-details'>
                                        <li>
                                            Delivery : $400
                                        </li>
                                        <li>
                                            $125 / Day
                                        </li>
                                    </ul>

                                    <div className='featured-item-bottom'>
                                        <div className='featured-item-bottom-left'>
                                            <div className='featured-item-bottom-name'>
                                            J
                                            </div>
                                            <div className='featured-item-bottom-rating'>
                                            <span className='name'>Jack</span> <FaStar className='star'/> <span className='ratingNumber'>4/5 (125)</span>
                                            </div>
                                        </div>
                                        <div className='featured-item-bottom-right'>
                                            <h5>$1350 / Mo</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className='featured-item-box'>
                                <div className='featured-item-image-box'>
                                    <img src='https://admin.thezeeshangroup.com/uploads/zaira-construction-image-1693144593.jpg'></img>
                                </div>
                                <div className='featured-item-content-box'>
                                    <h4>Standard Excavator</h4>
                                    <ul className='featured-item-details'>
                                        <li>
                                            Delivery : $400
                                        </li>
                                        <li>
                                            $125 / Day
                                        </li>
                                    </ul>

                                    <div className='featured-item-bottom'>
                                        <div className='featured-item-bottom-left'>
                                            <div className='featured-item-bottom-name'>
                                            J
                                            </div>
                                            <div className='featured-item-bottom-rating'>
                                            <span className='name'>Jack</span> <FaStar className='star'/> <span className='ratingNumber'>4/5 (125)</span>
                                            </div>
                                        </div>
                                        <div className='featured-item-bottom-right'>
                                            <h5>$1350 / Mo</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className='featured-item-box'>
                                <div className='featured-item-image-box'>
                                    <img src='https://admin.thezeeshangroup.com/uploads/zaira-construction-image-1693144593.jpg'></img>
                                </div>
                                <div className='featured-item-content-box'>
                                    <h4>Standard Excavator</h4>
                                    <ul className='featured-item-details'>
                                        <li>
                                            Delivery : $400
                                        </li>
                                        <li>
                                            $125 / Day
                                        </li>
                                    </ul>

                                    <div className='featured-item-bottom'>
                                        <div className='featured-item-bottom-left'>
                                            <div className='featured-item-bottom-name'>
                                            J
                                            </div>
                                            <div className='featured-item-bottom-rating'>
                                            <span className='name'>Jack</span> <FaStar className='star'/> <span className='ratingNumber'>4/5 (125)</span>
                                            </div>
                                        </div>
                                        <div className='featured-item-bottom-right'>
                                            <h5>$1350 / Mo</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className='featured-item-box'>
                                <div className='featured-item-image-box'>
                                    <img src='https://admin.thezeeshangroup.com/uploads/zaira-construction-image-1693144593.jpg'></img>
                                </div>
                                <div className='featured-item-content-box'>
                                    <h4>Standard Excavator</h4>
                                    <ul className='featured-item-details'>
                                        <li>
                                            Delivery : $400
                                        </li>
                                        <li>
                                            $125 / Day
                                        </li>
                                    </ul>

                                    <div className='featured-item-bottom'>
                                        <div className='featured-item-bottom-left'>
                                            <div className='featured-item-bottom-name'>
                                            J
                                            </div>
                                            <div className='featured-item-bottom-rating'>
                                            <span className='name'>Jack</span> <FaStar className='star'/> <span className='ratingNumber'>4/5 (125)</span>
                                            </div>
                                        </div>
                                        <div className='featured-item-bottom-right'>
                                            <h5>$1350 / Mo</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className='featured-item-box'>
                                <div className='featured-item-image-box'>
                                    <img src='https://admin.thezeeshangroup.com/uploads/zaira-construction-image-1693144593.jpg'></img>
                                </div>
                                <div className='featured-item-content-box'>
                                    <h4>Standard Excavator</h4>
                                    <ul className='featured-item-details'>
                                        <li>
                                            Delivery : $400
                                        </li>
                                        <li>
                                            $125 / Day
                                        </li>
                                    </ul>

                                    <div className='featured-item-bottom'>
                                        <div className='featured-item-bottom-left'>
                                            <div className='featured-item-bottom-name'>
                                            J
                                            </div>
                                            <div className='featured-item-bottom-rating'>
                                            <span className='name'>Jack</span> <FaStar className='star'/> <span className='ratingNumber'>4/5 (125)</span>
                                            </div>
                                        </div>
                                        <div className='featured-item-bottom-right'>
                                            <h5>$1350 / Mo</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className='featured-item-box'>
                                <div className='featured-item-image-box'>
                                    <img src='https://admin.thezeeshangroup.com/uploads/zaira-construction-image-1693144593.jpg'></img>
                                </div>
                                <div className='featured-item-content-box'>
                                    <h4>Standard Excavator</h4>
                                    <ul className='featured-item-details'>
                                        <li>
                                            Delivery : $400
                                        </li>
                                        <li>
                                            $125 / Day
                                        </li>
                                    </ul>

                                    <div className='featured-item-bottom'>
                                        <div className='featured-item-bottom-left'>
                                            <div className='featured-item-bottom-name'>
                                            J
                                            </div>
                                            <div className='featured-item-bottom-rating'>
                                            <span className='name'>Jack</span> <FaStar className='star'/> <span className='ratingNumber'>4/5 (125)</span>
                                            </div>
                                        </div>
                                        <div className='featured-item-bottom-right'>
                                            <h5>$1350 / Mo</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <div className='loadMore text-center'>
                                <a href='/'>Load More</a>
                            </div>
                        </Col>
                    </Row>

                </Container>
             </section>

             {/* Featured Equipments Section End*/}

        </div>
    )

}