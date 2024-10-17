import React from "react";
import spotify_icon from "../assets/Spotify_icon.svg";

const Home = () => {
  const handleLogin = () => {
    window.location.href = "https://playsnap-server.netlify.app/login";
  };

  return (
    <div className="max-w-95p 2xs:max-w-90p xs:max-w-85p sm:max-w-85p md:max-w-80p xl:max-w-75p h-screen flex flex-col items-center justify-center mx-auto">
      <h1 className="my-3 text-center text-2xl text-gray-50">
        Create a Temporary Playlist
      </h1>
      <small className="block text-center py-2">
        This will create a playlist that expires at playback end, or after 2
        hours.
      </small>
      <button
        className="px-3 py-2 my-4 border-spotify border-2 rounded-md font-bold text-gray-800 hover:bg-spotify"
        onClick={handleLogin}>
        <img
          src={spotify_icon}
          alt="spotify icon"
          className="w-8 mr-2 inline"
        />
        Login to Spotify
      </button>
    </div>
  );
};

export default Home;
