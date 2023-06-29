// Player component
import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Player = () => {
  const [playerKey, setPlayerKey] = useState(Date.now());
  const [isPlaying, setIsPlaying] = useState(false);

  // On new audio URL, reset the key to remount the AudioPlayer component
  useEffect(() => {
    setPlayerKey(Date.now());
    setIsPlaying(false);
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="player-wrapper">
      <AudioPlayer
        key={playerKey}
        autoPlayAfterSrcChange={false}
        showSkipControls={false}
        showJumpControls={false}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        customAdditionalControls={[]}
      />
    </div>
  );
};

export default Player;
