import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import ReadingSideDoodle from './assets/ReadingSideDoodle.png'

const spotifyWebApi = new Spotify();

class NowPlayingDash extends Component {
constructor(){
    super();
    this.state = {
            nowPlaying: { song: '', albumCover: '', artist: '', user:'', id:''},
            analysis:{acousticness: '', danceability:'', energy:'', instrumentalness: '', 
            loudness:'', speechiness: '', tempo:'', valence:''},
    }
}

getNowPlaying(){
    spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        if (response){
          console.log(response.item);
        this.setState({
          nowPlaying: {
              song: response.item.name,
              albumCover: response.item.album.images[0].url,
              artist: response.item.artists[0].name,
              user: response.device.name,
              id: response.item.id,
            }
        })
        this.getAudioFeaturesForTrack();
      }}).catch((error) => {
          console.log('an error occurred ' + error);
      });
  }

  getAudioFeaturesForTrack(){
    spotifyWebApi.getAudioFeaturesForTrack(this.state.nowPlaying.id).then((response) =>{
      this.setState({
        analysis:{
          acousticness: (response.acousticness * 100).toFixed(1),
          danceability: (response.danceability * 100).toFixed(1),
          energy: (response.energy * 100).toFixed(1),
          instrumentalness: (response.instrumentalness * 100).toFixed(1), 
          loudness: response.loudness,
          speechiness: response.speechiness,
          tempo: (response.tempo).toFixed(1),
          valence: (response.valence * 100).toFixed(1),
        }
      })
      console.log(this.state.analysis);
    });
  }

  componentDidUpdate(){
    this.getNowPlaying();
  }

  render(){
    if(this.state.nowPlaying.song === ''){
      return(
      <div className='row info animated fadeIn'>
        <div className='col-md-12'>
        <h4><span className='header'>No songs playing right now.</span></h4>
        <img className="notPlayingGraphic info animated fadeIn" src={ReadingSideDoodle} alt=""/>
        <button className='btn btn-outline-spot' onClick={ () => this.getNowPlaying()}>Check Now Playing</button>
        </div>
      </div>
      )
    } else{
      return(
        <div className='row info animated fadeIn'>
          <div className='col-md-12'>
          <h4><span className='header'>Now Playing:</span></h4>
          <h6><span className='title2'>{this.state.nowPlaying.song }</span> by&nbsp; 
          <span className='title2'>{this.state.nowPlaying.artist }</span></h6>
          <img className='d-block album-cover animated fadeIn' src={this.state.nowPlaying.albumCover} alt='album cover'/>
        </div>
      </div>
          )
      }
  }
}

export default NowPlayingDash;