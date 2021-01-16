import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import ReaedingSideDoodle from './ReadingSideDoodle.png'

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

  componentDidMount(){
    this.getNowPlaying();
  }

  render(){
    if(this.state.nowPlaying.song === ''){
      return(
      <div className='row info animated fadeIn'>
        <div className='col-md-12'>
        <h4><span className='header'>No songs playing right now.</span></h4>
        <img className="notPlayingGraphic info animated fadeIn" src={ReaedingSideDoodle} />
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
        </div>
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img className='d-block album-cover animated fadeIn' src={this.state.nowPlaying.albumCover} alt='album cover'/>
              </div>
              <div class="carousel-item">
                <div class="d-block" alt="Second slide">
                  <ul className="analysis-list">
                    <span className="title">acousticness: </span>{this.state.analysis.acousticness}% <br/>
                    <span className="title">danceability: </span>{this.state.analysis.danceability}% <br/>
                    <span className="title">energy: </span>{this.state.analysis.energy}% <br/>
                    <span className="title">instrumentalness: </span>{this.state.analysis.instrumentalness}% <br/>
                    {/* <span className="title">loudness: </span>{this.state.analysis.loudness} <br/>
                    <span className="title">speechiness: </span>{this.state.analysis.speechiness} <br/> */}
                    <span className="title">temp: </span>{this.state.analysis.tempo} BPM <br/>
                    <span className="title">valence: </span>{this.state.analysis.valence}% <br/>
                  </ul>
                </div>
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </a>
          </div>
          <div className="col-md-12">
            {/* <img className='album-cover animated fadeIn' src={this.state.nowPlaying.albumCover} alt='album cover'/> */}
            <button className='btn btn-outline-spot' onClick={ () => this.getNowPlaying()}>Check Now Playing</button>
          </div>
      </div>
          )
      }
  }
}

export default NowPlayingDash;