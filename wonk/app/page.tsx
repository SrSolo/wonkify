'use client'

import { useEffect } from "react";

export default function Home() {

  const buttonStyle = {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: 'lightgreen',
    color: 'black',
    borderRadius: '5px',
    cursor: 'pointer',
  };
  const handleAuthorization = () => {
    // Define your Spotify API credentials and redirect URI
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirectUri = process.env.SPOTIFY_REDIRECT;
    const scope = 'user-read-private user-read-email'; // Add the required scopes

    // Construct the authorization URL
    const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;

    // Redirect the user to the Spotify authorization page
    window.location.href = authorizationUrl;
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    if (authorizationCode) {
      // Handle the authorization code, e.g., exchange it for an access token
      console.log('Authorization Code:', authorizationCode);
    }
  }, []);


  return (
    <div style={{ backgroundColor: 'black', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <button style={buttonStyle} onClick={handleAuthorization}>
        Authorize
      </button>
    </div>
  );
}