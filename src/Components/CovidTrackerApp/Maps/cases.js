import React, {Component} from 'react';
import {
    Row, 
    Col, 
    Container,
    Button,
} from 'react-bootstrap';
import {
    Map, 
    InfoWindow, 
    Marker,
    Polygon,
    GoogleApiWrapper
} from 'google-maps-react';
// import axios from 'axios';
import {Link} from 'react-router-dom';
// import myData from '../Data/countries.json';
 
class MapContainer extends Component {
    state={
        cases:[],
        info:'',
        source:'',
        activeMarker:{},
        selectedPlace:{},
        showInfoWindow:false
    }

    componentDidMount(){
        
        // const instance = axios.create({
        //     baseURL: "https://api.covid19api.com",
        //   });
        //   instance.defaults.headers.common = {
        //     Accept: "application/json, text/plain, */*",
        //     "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        //     "x-rapidapi-key": "d75f761b66msh99f188b91b0ca87p199471jsn0a7167c16ec6",
        //     "useQueryString": true
        //   };
        //   instance.get('/all').then(res=>{
        //       console.log(res.data)
        //       this.setState({
        //         //   source:res.data.source,
        //           cases:res.data
        //       })
        //   })
    }

    componentDidUpdate(){
        // console.log(this.state)
        // console.log(myData)
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showInfoWindow: false,
            activeMarker: null
          })
        }
      };

    onMarkerClick = (props, marker, e) =>{
        console.log(props)
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showInfoWindow: true,
        })
    }


    render(){
        let places = this.state.cases
        let markers = null
        let countries = [];
        // const containerStyle = {
        //     position: 'relative',  
        //     width: '100%',
        //     height: '100%'
        //   }

        // if(myData){
        //     console.log(myData)
            
        //     countries = myData.map(each=>{
                
               
        //         if(each.multi === undefined){
        //             let coords = []
        //             let ca;
        //             each.xml.outerBoundaryIs.LinearRing.coordinates.split(' ').map(each=>{
        //                 ca = each.split(',')
        //                 coords.push({lat:parseInt(ca[1]),lng:parseInt(ca[0])})
        //                 return false
        //             })
        //             return <Polygon
        //             key={each.id_gmaps_countries}
        //             paths={coords}
        //             onClick={()=>console.log(each.country)}
        //             strokeColor="#0000FF"
        //             strokeOpacity={0.1}
        //             strokeWeight={2}
        //             fillColor="#FF0000"
        //             fillOpacity={0.2} />
        //         } else {
        //             // let coords = []
        //             // // let coords2 = []
        //             // let ca;
        //             // each.xml.Polygon.map(each=>{
        //             //     // let hit = false
        //             //     each.outerBoundaryIs.LinearRing.coordinates.split(' ').map(each=>{
        //             //         ca = each.split(',')
        //             //         coords.push({lat:parseInt(ca[1]),lng:parseInt(ca[0])})
                            
        //             //         return false
        //             //     })
        //                 return false
        //             // })
        //             // return <Polygon
        //             //         key={each.id_gmaps_countries}
        //             //         paths={coords}
        //             //         onClick={()=>console.log(each.country)}
        //             //         strokeColor="#0000FF"
        //             //         strokeOpacity={0.1}
        //             //         strokeWeight={2}
        //             //         fillColor="#0000FF"
        //             //         fillOpacity={0.2} />
        //         } 
        //      })
        // }

        // const triangleCoords = [
        //     {lat: 25.774, lng: -80.190},
        //     {lat: 18.466, lng: -66.118},
        //     {lat: 32.321, lng: -64.757},
        //     {lat: 25.774, lng: -80.190}
        //   ];

        if(markers===null && places.length!==0){
            markers = places.map((each, index)=>{
                    return <Marker
                    // key={each.case_no}
                    onClick={this.onMarkerClick}
                    position={{lat: each.latitude, lng: each.longitude}}
                    // age={each.age}
                    // name={each.case_no}
                    // date={each.date_of_announcement_to_public}
                    // status={each.status}
                    // hospital={each.hospital_admitted_to}
                    // sex={each.sex}
                    // nationality={each.nationality}
                    // TH={each.travel_history}
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
            <div className='cases'>
                <Row className='pt-3 pl-2 m-auto' style={{textAlign:'left',paddingBottom:'1%'}}>
                    <Col>
                        <Button as={Link} to='/covid-tracker-app' variant='outline-danger'> <i className="fas fa-arrow-left"></i> Back to Application</Button>
                    </Col>
                </Row>
                <Container>
                    <Row className='pb-2 mx-auto'>
                        <Col>
                            <h1 className='display-4'>Global Covid-19 Cases</h1>
                            {/* <p className='text-muted'>{this.state.info}</p> */}
                            <small><b>Source:</b> {this.state.source}</small>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div style={{width:'100%', height:'70vh',position:'relative'}} className='flex-grow-1 overflow-x-hidden overflow-y-auto w-100 mb-3'>
                                <Map 
                                google={this.props.google}
                                containerStyle={mapStyles}
                                zoom={2}
                                onClick={this.onMapClicked}
                                initialCenter={{
                                    lat: 25.774,
                                    lng: -80.190
                                  }}
                                >
                                    {markers}
                                    {countries}
                                    <InfoWindow
                                        visible={this.state.showInfoWindow}
                                        marker={this.state.activeMarker}
                                        >
                                        <div className='m-auto pt-1 pb-1 pl-2 pr-2'>
                                            <Row>
                                                <Col>
                                                    <Row>
                                                        <Col style={{textAlign:'left'}}>
                                                            <h6>
                                                                {this.state.selectedPlace.name}
                                                            </h6>
                                                        </Col>
                                                    </Row>
                                                    {/* <Row>
                                                        <Col>
                                                        <ListGroup horizontal>
                                                            <ListGroup.Item><dt>Age:</dt></ListGroup.Item>
                                                            <ListGroup.Item><dd>{this.state.selectedPlace.age}</dd></ListGroup.Item>
                                                        </ListGroup>
                                                        </Col>
                                                    </Row> */}
                                                    <Row>
                                                        <Col xs={4} style={{textAlign:'left'}}>
                                                            <dt>Age:</dt>
                                                        </Col>
                                                        <Col style={{textAlign:'left'}}>
                                                            <dd>{this.state.selectedPlace.age}</dd>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={4} style={{textAlign:'left'}}>
                                                            <dt>Date:</dt>
                                                        </Col>
                                                        <Col style={{textAlign:'left'}}>
                                                            <dd>{this.state.selectedPlace.date}</dd>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={4}  style={{textAlign:'left'}}>
                                                            <dt>Status:</dt>
                                                        </Col>
                                                        <Col style={{textAlign:'left'}}>
                                                            <dd>{this.state.selectedPlace.status}</dd>
                                                        </Col>
                                                    </Row>
                                                    
                                                    <Row>
                                                        <Col xs={4} style={{textAlign:'left'}}>
                                                            <dt>Sex:</dt>
                                                        </Col>
                                                        <Col style={{textAlign:'left'}}>
                                                            {this.state.selectedPlace.sex==='F' ? <dd>Female</dd> : <dd>Male</dd>}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={4} style={{textAlign:'left'}}>
                                                            <dt>Nationality:</dt>
                                                        </Col>
                                                        <Col style={{textAlign:'left'}}>
                                                            <dd>{this.state.selectedPlace.nationality}</dd>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={4} style={{textAlign:'left'}}>
                                                            <dt>Hospital:</dt>
                                                        </Col>
                                                        <Col style={{textAlign:'left'}}>
                                                            <dd>{this.state.selectedPlace.hospital}</dd>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={4} style={{textAlign:'left'}}>
                                                            <dt>Travel History:</dt>
                                                        </Col>
                                                        <Col style={{textAlign:'left'}}>
                                                            <dd>{this.state.selectedPlace.TH}</dd>
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