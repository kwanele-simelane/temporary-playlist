import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Create = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const accessToken = params.get("access_token");

  const [songs, setSongs] = useState([]);
  const [songsMeta, setSongsMeta] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const [userId, setUserId] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUserId = async () => {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserId(data.id);
      } catch (err) {
        setError("Failed to fetch user data. Please try again.");
      }
    };
    getUserId();
  }, [accessToken]);

  const handleCreatePlaylist = async () => {
    setIsLoading(true);
    setShowMessage(false);
    setError("");

    if (songs.length !== 10) {
      setError("Please provide exactly 10 songs.");
      setIsLoading(false);
      return;
    }

    const tempData = songs.map((song) => {
      const [artist, title] = song.split(" - ");
      return { artist: artist.trim(), title: title.trim() };
    });
    setSongsMeta(tempData);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/playlists/create",
        {
          accessToken,
          songsMeta: tempData,
          userId,
        }
      );
      setPlaylistId(data.playlist.id);
      setPlaylistName(data.playlist.name);
      setShowMessage(true);
    } catch (error) {
      const res_err = error.response?.data?.error || "An error occurred.";
      setError(res_err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaylistDelete = async () => {
    setIsLoading(true);
    try {
      await axios.post(`http://localhost:5000/playlists/delete/${playlistId}`, {
        accessToken,
      });
      setShowMessage(false);
      setPlaylistId("");
      setPlaylistName("");
    } catch (error) {
      setError("Failed to delete the playlist. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const hideMessageTimeout = setTimeout(() => {
        setShowMessage(false);
      }, 7000);

      const deleteTimeout = setTimeout(() => {
        handlePlaylistDelete();
      }, 7200000);

      return () => {
        clearTimeout(hideMessageTimeout);
        clearTimeout(deleteTimeout);
      };
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center max-w-95p 2xs:max-w-90p xs:max-w-85p sm:max-w-85p md:max-w-80p h-screen mx-auto">
      {playlistId && (
        <p className="my-4 bg-spotify bg-opacity-60 shadow-lg px-6 py-2 text-sm rounded">
          Playlist <strong className="underline">{playlistName}</strong>, was
          created on your Spotify.{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://open.spotify.com/playlist/${playlistId}`}
            className="underline text-blue-700">
            Listen now
          </a>
        </p>
      )}
      {showMessage && error && (
        <p className="my-4 bg-red-200 shadow-lg px-6 py-2 text-sm rounded">
          {error}
        </p>
      )}
      <h3 className="text-spotify text-2xl font-bold">Create Your Playlist</h3>
      <small className="block text-center mt-4">
        Add 10 songs for your playlist in the format:{" "}
        <strong>"Artist - Song Title"</strong>, each song in a NEW LINE
      </small>
      <textarea
        className="border-2 border-primary my-4 w-full sm:w-1/3 p-4 rounded-lg"
        rows={10}
        placeholder="(e. g. Addex - Mainland)"
        value={songs.join("\n")}
        onChange={(e) => setSongs(e.target.value.split("\n"))}
      />
      <button
        disabled={isLoading}
        className="px-6 py-2 bg-spotify text-black text-lg font-semibold rounded"
        onClick={handleCreatePlaylist}>
        {isLoading ? "Creating your playlist..." : "Create Playlist"}
      </button>
      <Link to="/" className="underline text-primary my-3">
        Login
      </Link>
    </div>
  );
};

export default Create;
