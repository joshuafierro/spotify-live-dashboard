import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import LayingDoodle from './assets/LayingDoodle.png'

const spotifyWebApi = new Spotify();

class songAnalysis extends Component {
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
        <h4><span className='header'>Wainting to analyze...</span></h4>
        <img className="noAnalysis info animated fadeIn" src={LayingDoodle} alt=""/>
        </div>
      </div>
      )
    } else{
      return(
        <div className='row info animated fadeIn'>
          <div className="col-md-12">
            <ul className="analysis-list ui statistic">
                    <span className="title label">acousticness: </span><span className="value">{this.state.analysis.acousticness}%</span> <br/>
                    <span className="title label">danceability: </span><span className="value">{this.state.analysis.danceability}%</span> <br/>
                    <span className="title label">energy: </span><span className="value">{this.state.analysis.energy}%</span> <br/>
                    <span className="title label">instrumentalness: </span><span className="value">{this.state.analysis.instrumentalness}%</span> <br/>
                    <span className="title label">tempo in BPM: </span><span className="value">{this.state.analysis.tempo}</span> <br/>
                    <span className="title label">valence: </span><span className="value">{this.state.analysis.valence}%</span> <br/>
              </ul>
            </div>
      </div>
          )
      }
  }
}
export default songAnalysis;