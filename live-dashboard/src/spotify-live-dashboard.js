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

  renderLogIn() {
    return(
      <div className="top-push">
        { this.state.loggedOut && <h1>Click below to Authorize Live Dashboard</h1>}
        <a href="http://localhost:8888">
          <button className='btn btn-outline-spot'>Go to Spotify</button>
          </a>
      </div>
    )
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
      <li>
        <img className="artistProfile" alt="artist profile" src={artistProfile.images[0].url}/> 
        <p>{artistProfile.name}</p>
      </li>
      )
    );

    const tracks = this.state.topTracks.map((track) =>
    track.map((song) => 
      <li key={song}>
       <img className="artistProfile" alt="artist profile" src={song.album.images[0].url}/> 
        <p>{song.name}</p>
      </li>
    )
  );
    return(
    <div className="row">
      <div className="col-md-12">
      <h1 className="title">Spotify User Analytics</h1>
      <UserProfile/>
        {/* <button className="btn btn-outline-spot" onClick={() => this.getTopArtitsts()}>get top artists</button>
        <button className="btn btn-outline-spot" onClick={() => this.getTopTracks()}>get top tracks</button> */}
      </div>
      {!this.state.getTopArtitsts}
      <div className="col-md-6">
      <h3 className="title2">Your Top Artists</h3>
        <ol>{artists}</ol>
      </div>
      <div className="col-md-6">
      <h3 className="title2">Your Top Tracks</h3>
      <ol>{tracks}</ol>
      </div>
    </div>
    )
  }
}
  export default LiveDash;