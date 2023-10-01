import React from 'react'
import { useParams } from 'react-router-dom'
function Instagramauth() {
    const handleAuthClick = () => {
        const clientId = 'YOUR_CLIENT_ID';
        const redirectUri = 'YOUR_REDIRECT_URI';
        const scope = 'user_profile'; // Specify the required scope(s) for your app
    
        // Construct the authorization URL
        const authUrl = `https://api.instagram.com/oauth/authorize?client_id=6426269744162940&redirect_uri=https://localhost:3000/&scope=user_profile&response_type=code`;
    
        // Redirect the user to the Instagram authorization URL
        window.location.href = authUrl;
      };
    
      return (
        <button onClick={handleAuthClick} className='p-1 bg-green-500 rounded-md'>Authorize with Instagram</button>
      );
}

export default Instagramauth

