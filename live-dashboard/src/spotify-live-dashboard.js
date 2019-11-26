/*spotify dashboard api*/
import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
// import axios from 'axios';

const spotifyWebApi = new Spotify();

class LiveDash extends Component {
  constructor(){
    super();
    this.state ={
    topArtists: { name: '', images: '', followers: ''},
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
        let i =0
        for(i; i<10; i ++){
          this.setState({
            topArtists: {
              name: response.items[0].name,
              images:response.items[0].images[0].url,
              followers: response.items[0].followers.total
            }
          })
        }
      }
      // console.log(response);
      let i = 0;
      for(i; i < 10; i ++) {
        console.log(response.items[i].name);
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
          console.log(this.state.topTracks) 
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
    // need to fix this block of code
    const tracks = this.state.topTracks.map((track) =>
    track.map((song) => 
      <div>
      {console.log(track)}
      <span key={song}>{song.name}</span>
    
    </div>
    )
  );
    return(
    <div className="row">
      <div className="col-md-12">
        <button className="btn btn-outline-spot" onClick={() => this.getTopArtitsts()}>get top artists</button>
        <button className="btn btn-outline-spot" onClick={() => this.getTopTracks()}>get top tracks</button>
      </div>
      {!this.state.getTopArtitsts}
      <div className="col-md-6">
      <h1>Your Top Artists</h1>
        <img className="artistProfile" alt="artist profile" src={this.state.topArtists.images}/>
        <h2>{this.state.topArtists.name}</h2>
      </div>
      <div className="col-md-6">
      <h1>Your Top Tracks</h1>
      <span>{tracks}</span>
      </div>
    </div>
    )
  }
}
  export default LiveDash;