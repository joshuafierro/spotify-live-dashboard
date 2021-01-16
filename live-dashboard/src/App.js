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
        <div style={{textAlign:"center", textDecoration:"none"}}>Verified Icon made by <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
      )
    }
    
  }

export default App;
