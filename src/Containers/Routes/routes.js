import React, {Component} from 'react';
import { Route, Switch } from "react-router-dom";
// import DataEntry from '../../components/data-entry/dataEntry';
// import Visualization from '../../components/visualization/visualization';
import Navbar from '../../Components/Navigation/navigation';
import UsersTable from '../../Components/GithubApp/Tables/UsersTable/usersTable';
import Profile from '../../Components/GithubApp/Profile/profile'
import CovidApp from '../../Components/CovidTrackerApp/index';
import CovidAppFacilities from '../../Components/CovidTrackerApp/Maps/facilities';
import CovidAppCases from '../../Components/CovidTrackerApp/Maps/cases';
import Index from '../../Components/Applications/index';
import Home from '../../Components/Home/home'

class Router extends Component{
    componentDidUpdate(){
        
    }

    render(){
        let url = window.location.pathname;
        // const styleObj = {
        //     height: "100vh",
        //     width:'100%',
        //     zIndex:'1',
        //     position:'absolute',
        //     top:'0px',
        //   };
        return(
            <div className="Router" >
                <Navbar
                url={url}
                />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/applications" exact component={Index}/>
                    {/* Covid Tracker Application*/}
                    <Route path="/covid-tracker-app" exact component={CovidApp}/>
                    <Route path="/covid-tracker-app/facilities" exact component={CovidAppFacilities}/>
                    <Route path="/covid-tracker-app/cases" exact component={CovidAppCases}/>

                    {/* Github Application */}
                    <Route path="/github-app/users" exact component={UsersTable}/>
                    <Route path="/github-app/users/:id" exact component={Profile}/>
                    {/* <Route path="/Data-Entry" exact component={DataEntry}/>
                    <Route path="/Visualization" exact component={Visualization}/> */}
                </Switch>
            </div>
           
        );
    }

}

export default Router