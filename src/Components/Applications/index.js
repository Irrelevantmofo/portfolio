import React, {Component} from 'react';
import {
    Row,
    Col,
    // Card, 
    // Button,
    Container
} from 'react-bootstrap';
// import {Link} from 'react-router-dom';
import CustomCard from '../UI/Card/card';
import Githubapp from '../../Assets/github-app.png';
import CovidPic from '../../Assets/covid19.jpg';
import WrupupPic from '../../Assets/wrupup.jpg';
import WrupupPic2 from '../../Assets/wrupup-2.jpg';
import Veronica from '../../Assets/veronica.png';
import Gustavo from '../../Assets/gustavo.png';
import TidySchool from '../../Assets/tidyschools.png';
import BigStitchy from '../../Assets/BigStitchy-logo.png';
// import ProjectXPic from '../../Assets/project-x.jpg';
import './index.css';

class Index extends Component{

    render(){
        return(
            <div className='index'>
                <Row>
                    <Col>
                        <h1 style={{color:'white'}}> React  Applications</h1>
                        <hr style={{backgroundColor:'white'}}></hr>
                    </Col>
                </Row>
                <Container>
                    <Row className='pb-2'>
                        <Col xs={12} md={4} className='d-lg-flex justify-content-center pb-5'>
                            <CustomCard
                            styleObj={{ width: '100%'}}
                            img={Githubapp}
                            title={'Github Application'}
                            content='This application showcases the users of github'
                            link='/github-app/users'
                            component='Application'
                            />
                        </Col>
                        <Col xs={12} md={4} className='d-lg-flex justify-content-center pb-5'>
                            <CustomCard
                                styleObj={{ width: '100%'}}
                                img={CovidPic}
                                title={'Covid-19 Tracker'}
                                content='This is an app to track the global cases of Covid-19'
                                link='/covid-tracker-app'
                                component='Application'
                            />
                        </Col>
                        <Col xs={12} md={4} className='d-lg-flex justify-content-center pb-5'>
                            <CustomCard
                                styleObj={{ width: '100%'}}
                                img={WrupupPic}
                                title={'Wrupup Landing page'}
                                content='This landing page is created with Reactjs'
                                link='https://offers.wrupup.ph'
                                component='Live Site'
                            />
                        </Col>
                        <Col xs={12} md={4} className='d-lg-flex justify-content-center pb-5'>
                            <CustomCard
                                styleObj={{ width: '100%'}}
                                img='https://cdn.shopify.com/app-store/listing_images/7b7091301db537c3d237b8f4fb08083f/desktop_screenshot/COia+d30lu8CEAE=.png?height=900&width=1600'
                                title={'Big Stitchy Emproidery App'}
                                content='Big Stitchy Provides Top Quality Custom Embroidery Products Shipped Direct Consumers'
                                link='https://apps.shopify.com/shop-bigstitchy'
                                component='Live Site'
                            />
                        </Col>
                        <Col xs={12} md={4} className='d-lg-flex justify-content-center pb-5'>
                            <CustomCard
                                styleObj={{ width: '100%'}}
                                img={BigStitchy}
                                title={'Big Stitchy Admin Dashboard'}
                                content='Admin Dashboard for the Big Stitchy Shopify App that works as back-end management for the admins to use.'
                                link='https://app.bigstitchy.com'
                                component='Live Site'
                            />
                        </Col>
                        {/* <Col lg className='d-lg-flex justify-content-center pb-2'>
                            <CustomCard
                                styleObj={{ width: '18rem'}}
                                img={ProjectXPic}
                                title={'Project-X'}
                                content='This app is to showcase the sales of the non-voice agents of wrupup.ph'
                                link='https://projx.wrupup.ph'
                                component='Live Site'
                            />
                        </Col> */}
                    </Row>
                </Container>
                <Row className='pt-5'>
                    <Col>
                        <h1 style={{color:'white'}}> Laravel  Applications</h1>
                        <hr style={{backgroundColor:'white'}}></hr>
                    </Col>
                </Row>
                <Container>
                    <Row className='pb-2'>
                        <Col xs={12} md={4} className='d-lg-flex justify-content-center pb-5'>
                            <CustomCard
                                styleObj={{ width: '100%'}}
                                img='https://www.esrealestateconsortium.com/wp-content/uploads/2020/09/ESREC-LOGO-1-1.jpg'
                                title={'E.S. REAL ESTATE CONSORTIUM, CORP.'}
                                content='Homepage and Employee Management System for an Real Estate Agency'
                                link='https://www.esrealestateconsortium.com/'
                                component='Live Site'
                            />
                        </Col>
                        <Col xs={12} md={4} className='d-lg-flex justify-content-center pb-5'>
                            <CustomCard
                                styleObj={{ width: '100%'}}
                                img='https://scontent.fdvo1-1.fna.fbcdn.net/v/t1.6435-9/104491574_919701751825103_1933081696763854520_n.png?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeGTG4-RYb2psOydxpOurqnLWjQ1bA0MLjdaNDVsDQwuN8YkTd631IzhNJL8r3GJ3IwDzrJPFbO3wfZIDWpQ1FRr&_nc_ohc=6WVSQmA8ZokAX9xzjxO&_nc_ht=scontent.fdvo1-1.fna&oh=eb36993f61f3de1cba8c32bc460c90d8&oe=614E8BEB'
                                title={'Wrupup Website'}
                                content='This website is created with Laravel Framework'
                                link='https://www.wrupup.ph'
                                component='Live Site'
                            />
                        </Col>
                    </Row>
                </Container>
                <Row className='pt-5'>
                    <Col>
                        <h1 style={{color:'white'}}> Wordpress Websites </h1>
                        <hr style={{backgroundColor:'white'}}></hr>
                    </Col>
                </Row>
                <Container>
                    <Row className='pb-2'>
                        <Col lg className='d-lg-flex justify-content-center pb-2'>
                            <CustomCard
                                styleObj={{ width: '18rem'}}
                                img={Veronica}
                                title={'Veronica Robles'}
                                content='This website is created with Wordpress'
                                link='https://veronicarobles.com'
                                component='Live Site'
                            />
                        </Col>
                        <Col lg className='d-lg-flex justify-content-center pb-2'>
                            <CustomCard
                                styleObj={{ width: '18rem'}}
                                img={Gustavo}
                                title={'Gustavo Ferrato Online Courses'}
                                content='This website is created with Wordpress'
                                link='https://www.negociosconunproposito.com'
                                component='Live Site'
                            />
                        </Col>
                        <Col lg className='d-lg-flex justify-content-center pb-2'>
                            <CustomCard
                                styleObj={{ width: '18rem'}}
                                img={TidySchool}
                                title={'TidySchool Landing Page'}
                                content='This website is created with Wordpress'
                                link='https://tiddyschool.wpengine.com/landing-page/'
                                component='Live Site'
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Index;