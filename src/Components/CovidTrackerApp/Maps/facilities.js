import React, {Component} from 'react';
import {
    Row, 
    Col, 
    Container,
    Button
} from 'react-bootstrap';
import {
    Map, 
    InfoWindow, 
    Marker,
    GoogleApiWrapper
} from 'google-maps-react';
import axios from 'axios';
import {Link} from 'react-router-dom';
 
 
class MapContainer extends Component {
    state={
        facilities:[],
        info:'',
        source:'',
        activeMarker:{},
        selectedPlace:{},
        showInfoWindow:false
    }

    componentDidMount(){
        const instance = axios.create({
            baseURL: "https://coronavirus-ph-api.herokuapp.com",
          });
          instance.defaults.headers.common = {
            Accept: "application/json, text/plain, */*",
          };
          instance.get('/facilities').then(res=>{
              console.log(res)
              this.setState({
                  info:res.data.info,
                  source:res.data.source,
                  facilities:res.data.data
              })
          })
    }

    componentDidUpdate(){
        // console.log(this.state)
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      };

    onMarkerClick = (props, marker, e) =>{
        console.log(props)
        this.setState({
            selectedPlace: {
                name:props.name,
                confirmed_cases:props.confirmed_cases,
                puis:props.puis,
                region:props.region
            },
            activeMarker: marker,
            showInfoWindow: true,
        })
    }


    render(){
        let places = this.state.facilities
        let markers = null
        // const containerStyle = {
        //     position: 'relative',  
        //     width: '100%',
        //     height: '100%'
        //   }
        if(markers===null && places.length!==0){
            markers = places.map((each, index)=>{
                    return <Marker
                    key={index}
                    onClick={this.onMarkerClick}
                    position={{lat: each.latitude, lng: each.longitude}}
                    name={each.facility}
                    confirmed_cases={each.confirmed_cases}
                    puis={each.puis}
                    region={each.region}
                    />
                    
            })

        } 
          const mapStyles = {
            width: "100%",
            position: "relative",
            height: "100%",
            borderRadius: ".25em",
          };
        return(
            <div className='facilities'>
                <Row className='pt-3 pl-2 m-auto' style={{textAlign:'left',paddingBottom:'1%'}}>
                    <Col>
                        <Button as={Link} to='/covid-tracker-app' variant='outline-danger'> <i className="fas fa-arrow-left"></i> Back to Application</Button>
                    </Col>
                </Row>
                <Container>
                    <Row className='pb-2 mx-auto'>
                        <Col>
                            <h1 className='display-4'>Philippine Medical Facilities</h1>
                            <p className='text-muted'>{this.state.info}</p>
                            {/* <small><b>Source:</b> {this.state.source}</small> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div style={{width:'100%', height:'70vh',position:'relative'}} className='flex-grow-1 overflow-x-hidden overflow-y-auto w-100 mb-3'>
                                <Map 
                                google={this.props.google}
                                containerStyle={mapStyles}
                                zoom={6}
                                onClick={this.onMapClicked}
                                initialCenter={{
                                    lat: 13.2263,
                                    lng: 122.2561
                                  }}
                                >
                                    {markers}
                                    <InfoWindow
                                        visible={this.state.showInfoWindow}
                                        marker={this.state.activeMarker}
                                        >
                                        <div className='m-auto pt-1 pb-1 pl-2 pr-2'>
                                            <Row>
                                                <Col>
                                                    <Row>
                                                        <Col>
                                                            <h6>
                                                                {this.state.selectedPlace.name}
                                                            </h6>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col style={{textAlign:'left'}}>
                                                            <dt>Confirmed Cases:</dt>
                                                        </Col>
                                                        <Col style={{textAlign:'center'}}>
                                                            <dd>{this.state.selectedPlace.confirmed_cases}</dd>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col style={{textAlign:'left'}}>
                                                            <dt>Region:</dt>
                                                        </Col>
                                                        <Col style={{textAlign:'center'}}>
                                                            <dd>{this.state.selectedPlace.region}</dd>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col style={{textAlign:'left'}}>
                                                            <dt>PUI:</dt>
                                                        </Col>
                                                        <Col style={{textAlign:'center'}}>
                                                            <dd>{this.state.selectedPlace.puis}</dd>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    </InfoWindow>
                                    {/* <Marker 
                                    // onClick={this.onMarkerClick}
                                    name={'Current location'} 
                                    /> */}
                                    {/* <InfoWindow 
                                    onClose={this.onInfoWindowClose}
                                    >
                                        <div>
                                            <h1>
                                                {this.state.selectedPlace.name}
                                            </h1>
                                        </div>
                                    </InfoWindow> */}
                                </Map>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}
 
export default GoogleApiWrapper({
  apiKey:'AIzaSyCa_wOg8JloC2XiuJywxz1NH07Iu4qw5oQ'
})(MapContainer)