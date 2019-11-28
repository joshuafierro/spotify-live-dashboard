import React, {Component} from 'react';
import Spotify from 'spotify-web-api-js';

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
        spotifyWebApi.getMe().then((response) =>{
            if(response){
                this.setState({
                    user:{
                        name: response.display_name,
                        profilePic: response.images[0].url,
                        isPremium: response.product,
                        followerCount: response.followers.total
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
        if(this.state.user.profilePic.images === null || this.state.user.profilePic.images === undefined){
            return(
                <div className="col-md-6">
                    <img className="userProfilePic" alt="user profile" src={"https://semantic-ui.com/images/avatar/large/joe.jpg"} />
                    <p className="header">
                        {this.state.user.name} <br/>
                        followers: {this.state.user.followerCount}
                    </p>
                </div>
            )
        }else{
            return(
                <div>
                <img className="userProfilePic" alt="user profile" src={this.state.user.profilePic} />
                <h2>{this.state.user.name}</h2>
                <p className="header">followers: {this.state.user.followerCount}</p>
                
            </div>
            )
        }
        
    }
}

export default UserProfile;