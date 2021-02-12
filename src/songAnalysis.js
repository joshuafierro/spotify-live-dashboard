import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import LayingDoodle from './assets/LayingDoodle.png';
import {HorizontalBar} from 'react-chartjs-2';
import { defaults } from 'chart.js';

const spotifyWebApi = new Spotify();

class songAnalysis extends Component {
constructor(){
    super();
    this.state = {
            nowPlaying: { song: '', artist: '', id:''},
            analysis:{acousticness: '', danceability:'', energy:'', instrumentalness: '', 
            loudness:'', speechiness: '', tempo:'', valence:''},
    }
}

getNowPlaying(){
    spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        if (response){
        this.setState({
          nowPlaying: {
              song: response.item.name,
              artist: response.item.artists[0].name,
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
    });
  }

  componentDidMount(){
    this.getNowPlaying();
  }

  render(){
    defaults.global.legend.display = false;
    defaults.global.responsive = true;
    // defaults.global.startAngle = 0.5 * Math.PI;
    const data ={
        datasets:[
          { 
            // label: "Song Analysis",
            data: [
              this.state.analysis.danceability, 
              this.state.analysis.energy, 
              this.state.analysis.instrumentalness,
              this.state.analysis.acousticness, 
              this.state.analysis.valence
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 159, 64, 0.7)',
            ],
          },
        ],
        labels: [
          'danceability',
          'energy',
          'instrumentalness',
          // 'speechiness',
          'acousticness',
          'valence',
        ],
      }
    if(this.state.nowPlaying.song === ''){
      return(
      <div className='row info animated fadeIn'>
        <div className='col-md-12'>
        <h4><span className='header'>Wainting to analyze...</span></h4>
        <button className='btn btn-outline-spot' style={{width:"75%"}}onClick={ () => this.getNowPlaying()}>analyze</button>
        <img className="noAnalysis info animated fadeIn" src={LayingDoodle} alt=""/>
        </div>
      </div>
      )
    } else{
      return(
        <div className='row info animated fadeIn'>
          <div className="col-md-12">
              <HorizontalBar data={data} height={300} width={400}/>
            </div>
            <div className="col-md-12">
              <button className='btn btn-outline-spot' style={{width:"75%"}}onClick={ () => this.getNowPlaying()}>analyze</button>
            </div>
      </div>
          )
      }
  }
}
export default songAnalysis;