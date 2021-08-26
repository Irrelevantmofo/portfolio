import React,{Component} from 'react';
import {
    Row,
    Col,
    Image,
    // Container
} from 'react-bootstrap';
import Profile from '../../Assets/profile_pic.jpg'
import './home.css';
import Aux from '../../Hoc/Auxiliary/auxiliary';
import Particles from 'react-particles-js';

class Home extends Component{
    componentDidMount(){
       
    }

    render(){

        return(
            <Aux>
                <div className='home'>
                    <Particles
                        height='90vh'
                        style={{
                            zIndex:'0',
                            position:'absolute',
                            left:'0',
                            top:'0'
                        }}
                        params={{
                        "particles": {
                            "number": {
                                "value": 60
                            },
                            "size": {
                                "value": 3
                            }
                        },"interactivity": {
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "repulse"
                                }
                            }
                        }
                    }}
                    />
                    <div id='home' className='heading pt-5'>
                        <div className='content pt-5 px-3 pb-3'>
                            <Row>
                                <Col lg={{ span: 6, offset: 3 }} >
                                    <h1 className='display-3 pt-2' style={{color:'white'}}>Joshua Fabricante</h1>
                                    <p className='lead mx-auto pt-5' style={{color:'white'}}>
                                        Hi! My name is Joshua Irving B. Fabricante, and I'm a Philippine-based 
                                        freelancer. If i'm not freelancing at some of Philippines' finest digital agencies, 
                                        I'm working remotely on projects for clients all over the world.
                                    </p>
                                    <p className='lead mx-auto pt-4' style={{color:'white',paddingBottom:'2%'}}>
                                        I have a diverse set of skills, ranging from HTML + CSS + Javascript, to front-end development using ReactJS framework,
                                        all the way to PHP, Laravel development and Linux server administration.
                                    </p>
                                    
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Image className="profile-pic-main pt-5" style={{width:'100px'}} src={Profile} roundedCircle />
                                </Col>
                            </Row>
                            <div className='links'>
                                <Row>
                                    <Col>
                                        <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/Joshua_irvingF"><i className="fab fa-twitter-square fa-2x"  style={{color:'white',padding:'1%'}}></i></a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/Joshua.starkiller115"><i className="fab fa-facebook-square fa-2x"  style={{color:'white',padding:'1%'}}></i></a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/joshuafabricante"><i className="fab fa-linkedin fa-2x"  style={{color:'white',padding:'1%'}}></i></a>
                                        <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/joshuanderful"><i className="fab fa-instagram-square fa-2x"  style={{color:'white',padding:'1%'}}></i></a>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
           
        );
    }
}

export default Home;