import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import UserProfile from './userProfile';
import SongAnalysis from './songAnalysis';

const spotifyWebApi = new Spotify();

class LiveDash extends Component {
  constructor(){
    super();
    this.state ={
    topArtists: [],
    topTracks: []
    
    }
  }

  getTopArtitsts(){
    spotifyWebApi.getMyTopArtists().then((response)=>{
      if(response){
          this.setState({
            topArtists: [
              response.items
            ]
          })
        }
      }).catch((error) => {
      console.log(error);
    })
  }

  getTopTracks(){
    spotifyWebApi.getMyTopTracks().then((response) => {
        if(response.items){
          this.setState({
            topTracks: [
              response.items
            ]
          })
          return(
            this.state.topTracks
          )
          
      }
    })
  }

  componentDidMount(){
    this.getTopArtitsts();
    this.getTopTracks();
  }

  render() {
    const artists = this.state.topArtists.map((artist) => 
      artist.map((artistProfile) =>
      <span key={artistProfile.id}>
        <div className="artistProfile animated fadeIn" alt="artist profile" style={{backgroundImage: `url(${artistProfile.images[0].url})`, display:"inline-block"}}>
        <h3 className="centerTitles">{artistProfile.name}</h3>
        </div>
      </span>
      )
    );

    const tracks = this.state.topTracks.map((track) =>
    track.map((song) => 
      <span key={song.id}>
       <div className="artistProfile animated fadeIn" alt="artist profile" style={{backgroundImage: `url(${song.album.images[0].url})`, display:"inline-block"}}> 
        <h3 className="centerTitles">{song.name}</h3>
       </div>
      </span>
    )
  );
    return(
    <div className="row section-push">
      <div className="col-md-4">
        <UserProfile/>
      </div>
      <div className="col-md-8">
      <ul className="nav nav-tabs navbar-dark">
        <li className="nav-item active"><a data-toggle="tab" href="#home" className="nav-link">Your Top Artists</a></li>
        <li className="nav-item"><a data-toggle="tab" href="#menu1" className="nav-link">Your Top Tracks</a></li>
        <li className="nav-item"><a data-toggle="tab" href="#menu2" className="nav-link">Song Analysis</a></li>
      </ul>
      <div className="tab-content">
      <div id="home" className="tab-pane container fade in active">
        <div className="row">
          {/* <h3 className="title">Your Top Artists</h3> */}
          <span className="header">{artists}</span>
        </div>
      </div>
      <div id="menu1" className="tab-pane container fade">
        <div className="row">
          {/* <h3 className="title">Your Top Tracks</h3> */}
          <span className="header">{tracks}</span>
        </div>
      </div>
      <div id="menu2" className="tab-pane container fade">
        <div className="row">
          <SongAnalysis/>
        </div>
      </div>
    </div>
    </div>
    </div>
    )
  }
}
  export default LiveDash;