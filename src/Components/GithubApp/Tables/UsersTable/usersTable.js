import React, {Component} from 'react';
import {
    Row,
    Col,
    Container,
    Button
} from 'react-bootstrap';
import axios from 'axios';
import ReactTable from 'react-table-6';
import {Link} from 'react-router-dom';
import Aux from '../../../../Hoc/Auxiliary/auxiliary';
import 'react-table-6/react-table.css';
import Footer from '../../../Footer/footer';
import {connect} from 'react-redux';
import * as actions from '../../../../Store/Actions/index';
import './usersTable.css';

class UsersTable extends Component{
    state={
        users:[],
        loading:false,
        latestID:0,
        nextLink:'',
        pages:2
    }

    componentDidMount(){
        // axios.get('/users').then(response =>{
        //     console.log(response)   
        //     this.setState({
        //         users:response.data
        //     })   
        // })
        // console.log(this.props.ctr)
    }

    componentDidUpdate(){
      // console.log(this.props.ctr)
    }

    render(){
        const data = this.state.users;

          const columns = [{
            Header:'ID',
            accessor:'id'
          },
            {
            Header: 'Login',
            accessor: 'login' // String-based value accessors!
          }, {
            Header: 'Github URL',
            accessor: 'html_url',
            Cell: props => <a href={props.value} rel="noopener noreferrer" target="_blank">{props.value}</a> // Custom cell components!
          },{
            Header: 'Actions',
            accessor: 'login',
            Cell: (props) => {
              let url = '/github-app/users/'+props.value;
              return (
                <Aux><Button size='sm' variant='outline-info' as={Link} to={url} onClick={()=>{console.log(props.value)}}>
                  Check User Profile
              </Button>
              </Aux>
              )
            }
          }]


        return(
            <Container>
               
                <div className="users-table">
                <Row className='pt-3' style={{textAlign:'left',paddingBottom:'1%'}}>
                    <Col>
                        <Button as={Link} to='/applications' variant='outline-danger'> <i className="fas fa-arrow-left"></i> Back to Applications</Button>
                    </Col>
                </Row>
                  <div className="users-table-header pt-3">
                    <Row>
                      <Col>
                        <i className="fab fa-github fa-3x pb-2"></i>
                      </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>This Page shows all the users in Github</h3>
                        </Col>
                    </Row>
                  </div>
                   
                    <Row>
                        <Col>
                            <ReactTable
                            data={data}
                            columns={columns}
                            pages={this.state.pages} // should default to -1 (which means we don't know how many pages we have)
                            loading={this.state.loading}
                            filterable={true}
                            showPageSizeOptions={false}
                            resolveData={(data) => data.map((row) => row)}
                            // manual
                            onFetchData={(state, instance) => {
                                // show the loading overlay
                                if(state.page === state.pages-1){
                                    this.setState({loading: true})
                                }
                                // fetch your data
                                    if(this.state.latestID===0){
                                        axios.get('/users')
                                            .then((res) => {
                                              // Update react-table
                                              this.props.add_counter(res.data.length)
                                              this.setState({
                                                users: res.data,
                                                latestID:res.data[29].id,
                                                loading: false
                                              })
                                            })
                                    } else {
                                        let url = '/users?since=' + this.state.latestID
                                        axios.get(url)
                                            .then((res) => {
                                              // Update react-table
                                              if(state.page===state.pages-1){
                                                  let data = [...new Set(this.state.users.concat(res.data))]
                                                  this.props.add_counter(res.data.length)
                                                this.setState({
                                                    users:data,
                                                    latestID:res.data[29].id,
                                                    pages:this.state.pages+1,
                                                    loading: false
                                                  })
                                              } else {
                                                let data = [...new Set(this.state.users.concat(res.data))]
                                                this.setState({
                                                    users:data,
                                                    latestID:res.data[29].id,
                                                    loading: false
                                                  })
                                              }
                                              
                                            })
                                    }
                                    
                                  }
                                }
                            // defaultFilterMethod={(filter, row) => {
                            //     const id = filter.pivotId || filter.id;
                            //     return row[id] !== undefined
                            //       ? String(row[id].toLowerCase()).includes(
                            //           filter.value.toLowerCase()
                            //         )
                            //       : true;
                            //   }}
                            />
                        </Col>
                    </Row>
                </div>
                <Footer/>
            </Container>
            
        )
    }
}

const mapStateToProps = state =>{
  return {
    ctr:state.counter
  }
}

const mapDispatchToProps = dispatch =>{
  return {
      add_counter: (value) => dispatch(actions.add_counter(value)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UsersTable)