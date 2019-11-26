import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import LiveDash from './spotify-live-dashboard';

const spotifyWebApi = new Spotify();

class NowPlayingDash extends Component {
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
            nowPlaying: { song: '', albumCover: '', artist: '', user:''}
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

getNowPlaying(){
    spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        if (response){
        this.setState({
          nowPlaying: {
              song: response.item.name,
              albumCover: response.item.album.images[0].url,
              artist: response.item.artists[0].name,
              user: response.device.name
            }
        })
      }}).catch((error) => {
          console.log('an error occurred ' + error);
      });
      console.log("################")
      console.log("PING PING PING")
      console.log("################")
  }

renderDash() {
    return(
    <div className='row info animated fadeIn'>
      {/* <div className='col-md-4'>
        <h4><span className='header'>{this.state.nowPlaying.user } is listening to:</span></h4>
        <h6><span className='title'>{this.state.nowPlaying.song }</span></h6> by 
        <h6><span className='title2'>{this.state.nowPlaying.artist }</span></h6>
        <button className='btn btn-outline-spot' onClick={ () => this.getNowPlaying()}>Check Now Playing</button>
      </div>
        <div className="col-md-8">
          <img className='album-cover' src={this.state.nowPlaying.albumCover} alt='album cover'/>
        </div> */}
        <h1 className="title">Spotify User Analytics</h1>
        <LiveDash/>
    </div>
    )
  }

render(){
    return(
    <div>
        {this.state.loggedIn && (this.state.nowPlaying !== undefined) ?  this.renderDash() : this.renderLogIn()}
    </div>
        )
      }
}

export default NowPlayingDash;