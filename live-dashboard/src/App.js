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
              artist: response.item.artists.name,
              time: ((response.progress_ms/1000)).toString(),
              user: response.device.name
            }
        });
        {/*let newRequest = new XMLHttpRequest();
        newRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               // Typical action to be performed when the document is ready:
               document.getElementById("demo").innerHTML = newRequest.responseText;
               console.log(newRequest.responseText);
            }
        };
        newRequest.open("GET", "https://api.spotify.com/v1/me/top/{artists}?limit=10&offset=5", true);
        newRequest.send();*/}
      })
  }


  render() {
    return (
      <div className="App">
        <div className='row'>
        <div className='info col-md-12 animated fadeIn'>
          <h3>Now Playing: <span className='title'>{this.state.nowPlaying.song }</span></h3>
          <h3>Artist:<span className='title'>{this.state.nowPlaying.artists }</span></h3>
          {/*<h3>time:<span className='title'>{this.state.nowPlaying.time } seconds</span></h3>*/}
          <h3>device being used:<span className='title'>{this.state.nowPlaying.user }</span></h3>
          <div><img className='album-cover' src={this.state.nowPlaying.albumCover} alt='album cover'/></div>
        </div>
<div id='demo'></div>
        </div>
        <a href="http://localhost:8888">
          <button className='btn btn-outline-info'>Go to Spotify</button>
          </a>
        { this.state.loggedIn &&
        <button className='btn btn-outline-info' onClick={() => setInterval(this.getNowPlaying(),1000)}>
          Check Now Playing
        </button>
      }
      </div>
    );
  }
}

export default App;
