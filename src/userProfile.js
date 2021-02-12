import React, {Component} from 'react';
import Spotify from 'spotify-web-api-js';
import NowPlayingDash from './nowPlayingDash';
import AbstractDesign from './assets/abstract.jpg';

const spotifyWebApi = new Spotify();
class UserProfile extends Component {
    constructor(){
        super();
        this.state = {
            user:{
                name: '',
                profilePic: '',
                isPremium: '',
                followerCount: ''
            }
        }
    }

    getUserProfile(){
        spotifyWebApi.getMe()
        .then((response) =>{
            if(response){
                this.setState({
                    user:{
                        name: response.id,
                        followerCount: response.followers.total,
                        isPremium: response.product,
                        profilePic: response.images,
                    }
                })
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    componentDidMount(){
        this.getUserProfile();
    }

    render(){
            return(
            <section className="col-sm-12">
                <h2 className="title">Spotify Analytics <br/> for&nbsp;
            <span className={this.state.user.isPremium ? 'isPremiumName' : ''}>{this.state.user.name}</span>
                </h2>
                <img className={this.state.user.isPremium ? 'isPremium' : 'userProfilePic'} alt="user profile" src={this.state.user.profilePic.url ? this.state.user.profilePic.url : AbstractDesign} />
                <p className="header">followers: {this.state.user.followerCount}</p>
                <NowPlayingDash/>
            </section>
            )
        }
}

export default UserProfile;