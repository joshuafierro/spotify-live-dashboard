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
                        profilePic: response.images,
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
       
        if(this.state.user.profilePic.images === null || this.state.user.profilePic.images === undefined || this.state.user.profilePic.images === ''){
            return(
                <div className="col-md-6 section-push">
                    <img className="userProfilePic" alt="user profile" src={"https://semantic-ui.com/images/avatar/large/joe.jpg"} />
                    <p className="header">
                        {this.state.user.name} <br/>
                        followers: {this.state.user.followerCount + 37292}
                    </p>
                </div>
            )
        }else{
            return(
                <div>
                <img alt="user profile" src={this.state.user.profilePic.images[0].url} />
                <h2>{this.state.user.name}</h2>
                <p className="header">followers: {this.state.user.followerCount}</p>
                
            </div>
            )
        }
        
    }
}

export default UserProfile;