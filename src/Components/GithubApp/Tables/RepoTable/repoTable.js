import React, {Component} from 'react';
import {
    Row,
    Col,
    Container,
    // Button
} from 'react-bootstrap';
import axios from 'axios';
import ReactTable from 'react-table-6';
// import {Link} from 'react-router-dom';
// import Aux from '../../../Hoc/Auxiliary/auxiliary';
import 'react-table-6/react-table.css';
import './repoTable.css';

class UsersTable extends Component{
    state={
        data:[],
        loading:false,
        latestID:0,
        latestPage:0,
        nextLink:'',
        pages:2
    }

    componentDidMount(){
    }

    componentDidUpdate(){
    }

    render(){
        const data = this.state.data;

          const columns = [{
            Header:'ID',
            accessor:'id'
          },
            {
            Header: 'Name',
            accessor: 'name' // String-based value accessors!
          }, {
            Header: 'Github URL',
            accessor: 'html_url',
            Cell: props => <a href={props.value} rel="noopener noreferrer" target="_blank">{props.value}</a> // Custom cell components!
          }]


        return(
            <Container>
                <div className="data-table">
                    <Row>
                        <Col>
                            <ReactTable
                            data={data}
                            columns={columns}
                            pages={this.state.pages} // should default to -1 (which means we don't know how many pages we have)
                            loading={this.state.loading}
                            defaultPageSize={29}
                            filterable={true}
                            showPageSizeOptions={false}
                            resolveData={(data) => data.map((row) => row)}
                            // manual
                            onFetchData={(state, instance) => {
                                // show the loading overlay
                                if(state.page === state.pages-1 && state.page === (this.state.lastPage-1)){
                                    this.setState({loading: true})
                                }
                                
                                let url = '/'+window.location.pathname.split('/')[2]+'/'+window.location.pathname.split('/')[3] + '/repos'
                                // fetch your data
                                    if(this.state.latestID===0){
                                        axios.get(url)
                                            .then((res) => {
                                              // Update react-table
                                              if(res.headers.link===undefined){
                                                this.setState({
                                                  data: res.data,
                                                  latestID:res.data[res.data.length-1].id,
                                                  pages:state.page,
                                                  loading: false
                                                })
                                              } else {
                                                let link = res.headers.link.toString().split(';')
                                                let link2 = link[link.length-2].split('>')[0]
                                                let lastPage = parseInt(link2.substr(link2.length-1))
                                                this.setState({
                                                  data: res.data,
                                                  lastPage:lastPage+1,
                                                  latestID:res.data[res.data.length-1].id,
                                                  loading: false
                                                })
                                              }
                                              
                                            })
                                    } else {
                                        let url2 = url + '?page=' + (state.page+1)
                                        // console.log(state.page)
                                        if((state.page+1)<=this.state.lastPage){
                                          if((state.page+1)>this.state.latestPage){
                                            axios.get(url2)
                                            .then((res) => {
                                              // console.log(res)
                                              // Update react-table
                                              if(state.page===state.pages-1){
                                                  let data = [...new Set(this.state.data.concat(res.data))]
                                                this.setState({
                                                    data:data,
                                                    latestPage:state.page+1,
                                                    loading: false
                                                  })
                                                if(this.state.data.length<(state.page*this.state.data.length)){
                                                  this.setState({
                                                    pages:this.state.pages+1,
                                                    loading:false
                                                  })
                                                } else {
                                                  this.setState({
                                                    pages:this.state.pages+1,
                                                    loading:false
                                                  })
                                                }
                                              } else {
                                                let data = [...new Set(this.state.data.concat(res.data))]
                                                this.setState({
                                                    data:data,
                                                    latestPage:state.page+1,
                                                    loading: false
                                                  })
                                              }
                                            })
                                          }
                                          
                                        } else {
                                          this.setState({
                                            loading:false,
                                            pages:state.page
                                          })
                                        }

                                        
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
            </Container>
            
        )
    }
}

export default UsersTable