import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import LiveDash from './spotify-live-dashboard';

const spotifyWebApi = new Spotify();

class Logon extends Component {
    constructor(){
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        if (token){
          spotifyWebApi.setAccessToken(token);
        }
        this.state = {
                loggedIn: token ? true : false,
                loggedOut: token ? false: true,
        }
    }
    
    renderLogIn() {
        return(
          <div className="top-push">
            { this.state.loggedOut && <h1>Click below to Authorize Live Dashboard</h1>}
            <a href="http://localhost:8888">
              <button className='btn btn-outline-spot'>Go to Spotify</button>
              </a>
          </div>
        )
      }
    
    getHashParams(){
        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
      }

render(){
    return(
        <div>
            {this.state.loggedIn ?  <LiveDash/> : this.renderLogIn()}
        </div>
        )
      }
}

export default Logon;