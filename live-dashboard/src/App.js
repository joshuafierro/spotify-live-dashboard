import React, { Component } from 'react';
import './App.css';
import NowPlayingDash from './nowPlayingDash';
import LiveDash from './spotify-live-dashboard';

class App extends Component {
  
  render(){
    //Cannot call onload for getNowPlaying as 
    // it gets called an infinte amount of times
    //resulting in a 429 error
      return(
        <div className="App">
        <NowPlayingDash/>
          <LiveDash/>
        </div>
      )
    }
    
  }

export default App;
