import { useEffect, useRef } from "react";
import { DetailType } from "../../types/detail";
import { SongType } from "../../types/song";

const Player = ({
  playingSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}: {
  playingSong: SongType | DetailType;
  isPlaying: boolean;
  volume: number;
  seekTime: number;
  onEnded: () => void;
  onTimeUpdate: (event) => void;
  onLoadedData: (event) => void;
  repeat: boolean;
}) => {
  const ref = useRef(null);

  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);

  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  return (
    <audio
      src={
        playingSong["hub"]?.actions[1]?.uri || playingSong["streaming"]?.preview
      }
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
