import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import LiveDash from './spotify-live-dashboard';
import FloatDoodle from '../src/graphics/FloatDoodle.png';
import DancingDoodle from '../src/graphics/DancingDoodle.png';

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
          <div className="row logon">
            <div className="col-md-4">
              <img className="logonGraphics" src={DancingDoodle} alt='album cover'/>
            </div>
            <div className="col-md-4">
            { this.state.loggedOut && <h1 className="title">Click below to Authorize Live Dashboard</h1>}
            <a href="http://localhost:8888/login">
              <button className='btn-lg btn-outline-spot'>Authorize Spotify</button>
            </a>
            </div>
            <div className="col-md-4">
              <img className="logonGraphics" src={FloatDoodle} alt='album cover'/>
            </div>
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