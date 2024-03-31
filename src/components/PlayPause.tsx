import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { SongType } from "../types/song";
import { ArtistSongType, DetailType } from "../types/detail";

interface PlayPauseType {
  song: SongType|DetailType|ArtistSongType;
  handlePause: () => void;
  handlePlay: () => void;
  activeSong: string;
  isPlaying: boolean;
}

export const PlayPause: React.FC<PlayPauseType> = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
}) => {
  return isPlaying && activeSong['title'] === song['title'] ? (
    <FaPauseCircle onClick={handlePause} size={35} className="text-gray-300" />
  ) : (
    <FaPlayCircle onClick={handlePlay} size={35} className="text-gray-300" />
  );
};
