import React from "react";
import spotify_icon from "../assets/Spotify_icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const handleLogin = () => {
    window.location.href = "https://playsnap-server.netlify.app/login";
  };

  return (
    <div className="max-w-95p 2xs:max-w-90p xs:max-w-85p sm:max-w-85p md:max-w-80p xl:max-w-75p h-screen flex flex-col items-center justify-center mx-auto">
      <div className="flex gap-4 items-center my-4">
        <FontAwesomeIcon icon={faClock} className="text-6xl text-spotify" />
        <h1 className="font-bold text-4xl ">PlaySnap!</h1>
      </div>
      <h1 className="mt-3 text-center text-lg text-gray-50">
        Create a Temporary Playlist
      </h1>
      <small className="block text-center py-2 text-gray-500">
        This will create a playlist that expires at the end of playback, or
        after 2 hours.
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
