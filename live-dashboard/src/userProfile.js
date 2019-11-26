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
                isPremium: ''
            }
        }
    }

    getUserProfile(){
        spotifyWebApi.getMe().then((response) =>{
            if(response){
                this.setState({
                    user:{
                        name: response.display_name,
                        profilePic: response.images[0],
                        isPremium: response.product
                    }
                })
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    componentDidMount(){
        this.getUserProfile();
        // let premium = this.state.user.isPremium === 'premium'? 'isPremium': '';
    }

    render(){
       
        return(
            <div>
                <h2>{this.state.user.name}</h2>
                <img alt="user profile picture" src={this.state.user.profilePic} />
                
            </div>
        )
    }


}

export default UserProfile;