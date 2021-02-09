import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import UserProfile from './userProfile';

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
      <li key={artistProfile.id}>
        <img className="artistProfile animated fadeIn" alt="artist profile" src={artistProfile.images[0].url}/> 
        <p>{artistProfile.name}</p>
      </li>
      )
    );

    const tracks = this.state.topTracks.map((track) =>
    track.map((song) => 
      <li key={song.id}>
       <img className="artistProfile animated fadeIn" alt="artist profile" src={song.album.images[0].url}/> 
        <p>{song.name}</p>
      </li>
    )
  );
    return(
    <div className="row section-push">
      <div className="col-md-4">
        <UserProfile/>
      </div>
      <div className="col-md-4">
        <h3 className="title">Your Top Artists</h3>
        <ol className="header">{artists}</ol>
      </div>
      <div className="col-md-4">
        <h3 className="title">Your Top Tracks</h3>
        <ol className="header">{tracks}</ol>
      </div>
    </div>
    )
  }
}
  export default LiveDash;