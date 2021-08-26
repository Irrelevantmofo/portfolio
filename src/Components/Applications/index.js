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
                        <Col lg className='d-lg-flex justify-content-center pb-2'>
                            <CustomCard
                            styleObj={{ width: '18rem'}}
                            img={Githubapp}
                            title={'Github Application'}
                            content='This application showcases the users of github'
                            link='/github-app/users'
                            component='Application'
                            />
                        </Col>
                        <Col lg className='d-lg-flex justify-content-center pb-2'>
                            <CustomCard
                                styleObj={{ width: '18rem'}}
                                img={CovidPic}
                                title={'Covid-19 Tracker'}
                                content='This is an app to track the global cases of Covid-19'
                                link='/covid-tracker-app'
                                component='Application'
                            />
                        </Col>
                        <Col lg className='d-lg-flex justify-content-center pb-2'>
                            <CustomCard
                                styleObj={{ width: '18rem'}}
                                img={WrupupPic}
                                title={'Wrupup Landing page'}
                                content='This landing page is created with Reactjs'
                                link='https://offers.wrupup.ph'
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
                        <Col lg className='d-lg-flex justify-content-center pb-2'>
                            <CustomCard
                                styleObj={{ width: '18rem'}}
                                img={WrupupPic2}
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