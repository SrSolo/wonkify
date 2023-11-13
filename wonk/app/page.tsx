'use client'

import { loginURI } from "../src/auth.js";
import { useEffect, useState } from "react";
import SpotifyWebApi from 'spotify-web-api-js';


export default function Home() {

  const buttonStyle = {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: 'lightgreen',
    color: 'black',
    borderRadius: '5px',
    cursor: 'pointer',
  };
  const spotify = new SpotifyWebApi();
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [imgUrl, setImgUrl] = useState("");



  useEffect(() => {
    const initializeSpotify = async () => {
      let storedToken = window.localStorage.getItem("access_token");

      if (!storedToken) {
        const tokenFromHash = getAccessTokenFromHash();

        if (tokenFromHash) {
          window.location.hash = "";
          window.localStorage.setItem("access_token", tokenFromHash);
          storedToken = tokenFromHash;
        }
      }

      if (storedToken) {
        setToken(storedToken);
        spotify.setAccessToken(storedToken);

        try {
          const user = await spotify.getMe();

          console.log(user);
          const fetchedUsername = user.display_name;
          const fetchedImgUrl = user.images[0]?.url; // Access the 'url' property of the first image
          console.log(fetchedUsername);
          console.log(fetchedImgUrl);

          setUsername(fetchedUsername);
          setImgUrl(fetchedImgUrl);

        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    initializeSpotify();
  }, []);

  const getAccessTokenFromHash = () => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1];
      return token || null;
    }
    return null;
  };

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("access_token")
    window.location.href = loginURI

  }

  return (
    <div style={{ backgroundColor: 'black', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {token ? (
        <div>
          <img src={imgUrl} alt="User Image" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          <p style={{ color: 'white' }}>{username}</p>
          <p>User Image and Name</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <a style={buttonStyle} href={loginURI}>
          Authorize
        </a>
      )}
    </div>
  );
}
