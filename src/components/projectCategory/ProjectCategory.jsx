import React from 'react';
import { Container, Row, Col, } from 'react-bootstrap';
import '../projectCategory/ProjectCategory.css';
import CategoryImage1 from '../../images/category-1.png';

export default function ProjectCategory() {
    return (
        <div>

             {/* Project Category Section */}

             <section className='project-category-section'>
                <Container>
                    <Row>
                        <Col md={2}>
                            <div className='project-category-box active'>
                                <div className='project-category-image-box'>
                                    <img src='https://admin.thezeeshangroup.com/uploads/featuredproperties/featured-properties-1693852272.jpg' alt='graders'></img>
                                </div>
                                <div className='project-category-content-box'>
                                    <h4>Graders</h4>
                                </div>
                            </div>
                        </Col>

                        <Col md={2}>
                            <div className='project-category-box'>
                                <div className='project-category-image-box'>
                                    <img src={CategoryImage1} alt='bulldozers'></img>
                                </div>
                                <div className='project-category-content-box'>
                                    <h4>Bulldozers</h4>
                                </div>
                            </div>
                        </Col>

                        <Col md={2}>
                            <div className='project-category-box'>
                                <div className='project-category-image-box'>
                                    <img src={CategoryImage1} alt='backhoes'></img>
                                </div>
                                <div className='project-category-content-box'>
                                    <h4>Backhoes</h4>
                                </div>
                            </div>
                        </Col>

                        <Col md={2}>
                            <div className='project-category-box'>
                                <div className='project-category-image-box'>
                                    <img src={CategoryImage1} alt='loaders'></img>
                                </div>
                                <div className='project-category-content-box'>
                                    <h4>Loaders</h4>
                                </div>
                            </div>
                        </Col>

                        <Col md={2}>
                            <div className='project-category-box'>
                                <div className='project-category-image-box'>
                                    <img src={CategoryImage1} alt='compactors'></img>
                                </div>
                                <div className='project-category-content-box'>
                                    <h4>Compactors</h4>
                                </div>
                            </div>
                        </Col>

                        <Col md={2}>
                            <div className='project-category-box'>
                                <div className='project-category-image-box'>
                                    <img src={CategoryImage1} alt='cranes'></img>
                                </div>
                                <div className='project-category-content-box'>
                                    <h4>Cranes</h4>
                                </div>
                            </div>
                        </Col>

                    </Row>
                </Container>
             </section>

             {/* Project Category Section End*/}

        </div>
    )

}