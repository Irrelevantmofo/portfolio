import React, {Component} from 'react';
import {
    Row,
    Col,
    Container,
    Button,
    Card
} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import FacilityPic from '../../Assets/Facilities.png';
import CountUp from 'react-countup';
import axios from 'axios';



class Index extends Component{
    state={
        data:[]
    }

    componentDidMount(){
        const instance = axios.create({
            baseURL: "https://api.covid19api.com",
          });
          instance.defaults.headers.common = {
            Accept: "application/json, text/plain, */*",
          };
          instance.get('/summary').then(res=>{
              console.log(res.data.Global)
              this.setState({
                  data:res.data.Global
              })
          })
    }


    render(){        
        let counter,deaths,recovered,newC, newD, newR = null
        if(this.state.data.length!==0){
            counter = <CountUp
            style={{fontWeight:'600', color:'red'}}
            className='lead'
            separator=','
            end={this.state.data.TotalConfirmed}
            />
            newC = <CountUp
            style={{fontWeight:'600', color:'red'}}
            className='lead'
            separator=','
            end={this.state.data.NewConfirmed}
            />
            newD = <CountUp
            style={{fontWeight:'600', color:'red'}}
            className='lead'
            separator=','
            end={this.state.data.NewDeaths}
            />
            newR = <CountUp
            style={{fontWeight:'600', color:'green'}}
            className='lead'
            separator=','
            end={this.state.data.NewRecovered}
            />
            deaths = <CountUp
            style={{fontWeight:'600', color:'red'}}
            className='lead'
            separator=','
            end={this.state.data.TotalDeaths}
            />
            recovered = <CountUp
            style={{fontWeight:'600', color:'green'}}
            className='lead'
            separator=','
            end={this.state.data.TotalRecovered}
            />
        }

        return(
            <div className='Covid-Tracker-Index'>
                <Row className='pt-3 pl-2 m-auto' style={{textAlign:'left',paddingBottom:'1%'}}>
                    <Col>
                        <Button as={Link} to='/applications' variant='outline-danger'> <i className="fas fa-arrow-left"></i> Back to Applications</Button>
                    </Col>
                </Row>
                <Container>
                    <Row className='pt-2 '>
                        <Col>
                            <h1 className='display-3'>Covid Tracker Application</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className='lead mt-2 mx-auto'>
                                This is an app to track the 
                                global cases of SARS-CoV-2
                                 or more commonly known as 
                                 the Coronavirus Disease (COVID-19)
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className='small pb-2 mx-auto'>
                                (This data is updated Daily)
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>GLOBAL COUNT</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <Row  >
                                <Col style={{textAlign:'right'}}>
                                    <p className='lead'>Total Confirmed: {counter}</p> 
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{textAlign:'right'}}>
                                    <p className='lead'>Recovered: {recovered}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{textAlign:'right'}}>
                                    <p className='lead'>Deaths:  {deaths}</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col >
                            <Row className='d-flex justify-content-start'>
                                <Col style={{textAlign:'left'}}>
                                    <p className='lead'>New Cases: {newC}</p>  
                                </Col>
                            </Row>
                            <Row className='d-flex justify-content-start'>
                                <Col style={{textAlign:'left'}}>
                                    <p className='lead'>New Recoveries: {newR}</p>
                                </Col>
                            </Row>
                            <Row className='d-flex justify-content-start'>
                                <Col style={{textAlign:'left'}}>
                                    <p className='lead'>New Deaths:  {newD}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='pb-5'>
                        {/* <Col className='d-lg-flex justify-content-center'>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={FacilityPic} />
                                <Card.Body>
                                    <Card.Title>Facilities</Card.Title>
                                    <Card.Text>
                                        This Component Shows all medical facilities all-throughout the philippines
                                    </Card.Text>
                                    <Button as={Link} to='/covid-tracker-app/facilities' variant="info">View Facilities</Button>
                                </Card.Body>
                            </Card>
                        </Col> */}
                        <Col className='d-lg-flex justify-content-center'>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={FacilityPic} />
                                <Card.Body>
                                    <Card.Title>World Map</Card.Title>
                                    <Card.Text>
                                        This Component Shows all cases by country
                                    </Card.Text>
                                    <Button as={Link} to='/covid-tracker-app/cases' variant="info">View Cases</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Index;