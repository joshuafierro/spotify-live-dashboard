import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component {
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
      nowPlaying: { song: '💩', albumCover: '', artist: '🔮', time: '', user:''}
    }
  }

  getHashParams(){
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

getNowPlaying(){
    spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
              song: response.item.name,
              albumCover: response.item.album.images[0].url,
              artist: response.item.artists[0].name,
              song: response.item.name,
              time: ((response.progress_ms/1000)).toString(),
              user: response.device.name
            }
        });
      })
  }

  render() {
    if(!this.state.loggedIn){
      return(
        <div className="App">
          { this.state.loggedOut && <h1>Click below to Authorize Live Dashboard</h1>}
          <a href="http://localhost:8888">
            <button className='btn btn-outline-info'>Go to Spotify</button>
            </a>
        </div>
      )
    }
    else{
      return (
        <div className="App" onload={this.getNowPlaying()}>
          <div className='row'>
            <div className='info col-md-12 animated fadeIn'>
              { this.state.loggedIn && <h4><span className='header'>{this.state.nowPlaying.user } is listening to:</span></h4>}
              { this.state.loggedIn && <h5><span className='title'>{this.state.nowPlaying.song }</span> - <span className='title2'>{this.state.nowPlaying.artist }</span></h5>}
              { this.state.loggedIn && <div><img className='album-cover' src={this.state.nowPlaying.albumCover} alt='album cover'/></div>}
            <div id='demo'></div>
            <button className='btn btn-outline-info' onClick={() => setInterval(this.getNowPlaying(),1000)}>
          Check Now Playing
            </button>
          </div>
        </div>
      </div>

      )
    }
  }
}

export default App;
