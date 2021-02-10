import React, { Component } from 'react';
import './App.css';
import Logon from './logon';

class App extends Component {
  
  render(){
    //Cannot call onload for getNowPlaying as 
    // it gets called an infinte amount of times
    //resulting in a 429 error
      return(
        <div className="App">
        <Logon/>
        </div>
      )
    }
    
  }

export default App;
