import React, {Component} from 'react';
import {
    Row,
    Col,
    Container,
    Image,
    Button
} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Footer from '../../Footer/footer';
import './profile.css';
import RepoTable from '../Tables/RepoTable/repoTable';
import Aux from '../../../Hoc/Auxiliary/auxiliary';

class Profile extends Component{
    state={
        loading:false,
        userData:[]
    }

    componentDidMount(){
        // console.log(window.location.pathname)
        let url = '/'+window.location.pathname.split('/')[2]+'/'+window.location.pathname.split('/')[3]
        console.log(window.location.pathname.split('/')[2])
        axios.get(url).then(response =>{
            // console.log(response)   
            this.setState({
                userData:response.data
            })   
        })
    }

    componentDidUpdate(){

    }
    
    render(){
        let profilePicLink = null
        let profileLink = null
        let creationYear = null
        let Table = null
        const monthNames = ["January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                                ];
        if(Object.keys(this.state.userData).length>0){
            
            profilePicLink = this.state.userData.avatar_url
            profileLink = this.state.userData.html_url
            let date = new Date(this.state.userData.created_at)
            // console.log(date)
            creationYear = monthNames[date.getMonth()] + ' ' + date.getFullYear()
            Table =  <RepoTable/>

        }
        return(
            <Aux>
                <div className='profile'>
                    <Container>
                        <Row style={{textAlign:'left',paddingBottom:'1%'}}>
                            <Col>
                                <Button as={Link} to='/github-app/users' variant='outline-danger'> <i className="fas fa-arrow-left"></i> Back to Users</Button>
                            </Col>
                        </Row>
                        <div className='timeline-header'>
                            <Image className='profile-pic' src={profilePicLink} roundedCircle />
                            <div className='timeline-content'>
                                <Row>
                                    <Col>
                                        <h4>{this.state.userData.name}</h4>
                                        <p>{this.state.userData.bio}</p>
                                        <p><i className="fas fa-map-marker-alt"></i> {this.state.userData.location} <i className="far fa-file-alt"></i> Joined {creationYear}</p>
                                        <p><b>{this.state.userData.following}</b> Following <b style={{paddingLeft:'2%'}}>{this.state.userData.followers}</b> Followers </p>
                                        <p>Profile URL: <a target="_blank" rel="noopener noreferrer" href={profileLink}>{profileLink}</a></p>
                                    </Col>
                                </Row>  
                            </div>           
                        </div>
                        <div className='timeline-body'>
                            <Row>
                                <Col>
                                    <h3>Users Repositories</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                {Table}
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
                <Footer/>
            </Aux>
        )
    }
}

export default Profile