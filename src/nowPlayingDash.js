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
    }
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
              user: response.device.name,
              id: response.item.id,
            }
        })
      }}).catch((error) => {
          console.log('an error occurred ' + error);
      });
  }

  componentDidMount(){
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
          <button className='btn btn-outline-spot' style={{width:"75%"}}onClick={ () => this.getNowPlaying()}>Check Now Playing</button>
        </div>
      </div>
          )
      }
  }
}

export default NowPlayingDash;