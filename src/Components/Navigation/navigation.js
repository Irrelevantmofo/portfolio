import React,{Component} from 'react';
// import { HashLink as Link } from 'react-router-hash-link';
import {Link} from 'react-router-dom';
import {
    Navbar,
    // Image,
    // NavDropdown,
    Nav
} from 'react-bootstrap';
// import Logo from '../../Assets/brand-logo.png';

class Navigation extends Component{
    state={
        variant:'dark'
    }
    componentDidMount(){
        // console.log(this.props.url)
    }
    componentDidUpdate(){
        // console.log(this.props.url)
        if(this.props.url==='/'){
            this.setState({
                variant:'none'
            })
        }
    }
    render(){

        return (
            <Navbar collapseOnSelect style={{zIndex:'4'}} expand="lg" bg={this.state.variant} variant="dark">
                <Navbar.Brand as={Link} to='/'>
                    <i className="fab fa-battle-net"></i> Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav> 
                    <Nav.Link as={Link} to='/applications'>Portfolio</Nav.Link>
                    <Nav.Link target="_blank" rel="noopener noreferrer" href="https://www.reddit.com/r/dankmemes">
                        Dank memes
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigation;