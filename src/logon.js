import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import LiveDash from './spotify-live-dashboard';
import GroovyDoodle from '../src/assets/GroovyDoodle.png';
import SelfieDoodle from '../src/assets/SelfieDoodle.png';

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
            <div className="col-md-12" style={{marginTop:"auto"}}>
            { this.state.loggedOut && <h1 className="title">Click below to Authorize Live Dashboard</h1>}
              {/* <img className="logonGraphics" src={GroovyDoodle} alt='album cover'/> */}
              <img className="logonGraphics" src={SelfieDoodle} alt='album cover'/>
            </div>
            <div className="col-md-12">
            <a href="https://project-v.herokuapp.com/login">
              <button className='btn btn-outline-spot btn-lg'>Authorize Spotify</button>
            </a>
            </div>
          </div>
        )
      }
    
    getHashParams(){
        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
            // weird behavior with single '=' vs '==='
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