import React,{Component} from 'react';
// import logo from './logo.svg';
import MainContainer from './Containers/Main/main';
import './App.css';

class App extends Component {
  componentDidMount(){

  }

  render(){
    return (
      <div className="App">
        <MainContainer/>
      </div>
    );
  }
  
}

export default App;
