import React, { Component } from 'react';
import './App.css';
import NowPlayingDash from './nowPlayingDash';

class App extends Component {
  
  render(){
    //Cannot call onload for getNowPlaying as 
    // it gets called an infinte amount of times
    //resulting in a 429 error
      return(
        <div className="App">
        <NowPlayingDash/>
        </div>
      )
    }
    
  }

export default App;
