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
      <div className="App" onload={this.getNowPlaying()}>
        <div className='row'>
        <div className='info col-md-12 animated fadeIn'>
        { this.state.loggedOut && <h1>Click below to Authorize Live Dashboard</h1>}
          { this.state.loggedIn && <h4><span className='header'>{this.state.nowPlaying.user } is listening to:</span></h4>}
          { this.state.loggedIn && <h5><span className='title'>{this.state.nowPlaying.song }</span> - <span className='title2'>{this.state.nowPlaying.artist }</span></h5>}
          {/* { this.state.loggedIn && <h5><span className='title2'>{this.state.nowPlaying.artist }</span></h5>} */}
          {/* <h3>time:<span className='title'>{this.state.nowPlaying.progress_ms } seconds</span></h3> */}
          { this.state.loggedIn && <div><img className='album-cover' src={this.state.nowPlaying.albumCover} alt='album cover'/></div>}
        </div>
          <div id='demo'></div>
        </div>
          { this.state.loggedOut &&
        <a href="http://localhost:8888">
          <button className='btn btn-outline-info'>Go to Spotify</button>
          </a>
        }
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
