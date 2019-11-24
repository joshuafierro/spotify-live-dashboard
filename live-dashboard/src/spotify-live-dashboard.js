/*spotify dashboard api*/
import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
// import axios from 'axios';

const spotifyWebApi = new Spotify();

class LiveDash extends Component {
  constructor(){
    super();
    this.state ={
    topArtists: { name: '', images: '', followers: ''}
    }
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
      console.log(response);
      let i = 0;
      for(i; i < 10; i ++) {
        console.log(response.items[i].name);
        console.log(response.items[i].followers.total);
      }
      
    }).catch((error) => {
      console.log(error);
    })
  }

  render() {

    return(
    <div className="row top-push">
      <div className="col-md-12">
        <button className="btn btn-outline-spot" onClick={() => this.getTopArtitsts()}>get top artists</button>
      </div>
      {!this.state.getTopArtitsts}
      <div className="col-md-12">
        <img className="artistProfile" alt="artist profile" src={this.state.topArtists.images}/>
        <h2>{this.state.topArtists.name}</h2>
        <h2>{this.state.topArtists.followers}</h2>
      </div>
    </div>
    )
  }
}
  export default LiveDash;