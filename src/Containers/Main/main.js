import React,{Component} from 'react';
// import {Row, Col} from 'react-bootstrap';
// import Particles from 'react-particles-js';
import Router from '../Routes/routes';

class Main extends Component {


    render(){
        return(
            <div className="Main-Container">
                <Router/>
            </div>
        );
    }
}

export default Main