import React, { useState, useRef, useEffect } from "react";
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  ForwardOutlined,
  AudioOutlined,
} from "@ant-design/icons";

type OudiooProps = {
  src: string;
};

const Oudioo: React.FC<OudiooProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.addEventListener("loadedmetadata", () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
      });
      audioRef.current.addEventListener("timeupdate", () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      });
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("loadedmetadata", () => {});
        audioRef.current.removeEventListener("timeupdate", () => {});
        audioRef.current.pause();
      }
    };
  }, [src, volume]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const onProgressChange = (e: { target: { value: any } }) => {
    const newTime = e.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const onVolumeChange = (e: { target: { value: any } }) => {
    const newVolume = e.target.value;
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  return (
    <div>
      {isPlaying ? (
        <PauseCircleOutlined onClick={togglePlayPause} />
      ) : (
        <PlayCircleOutlined onClick={togglePlayPause} />
      )}
      <ForwardOutlined />
      <AudioOutlined />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={onVolumeChange}
      />
      <input
        type="range"
        min="0"
        max={duration}
        step="1"
        value={currentTime}
        onChange={onProgressChange}
      />
      <div>
        {currentTime} / {duration}
      </div>
    </div>
  );
};

export default Oudioo;
