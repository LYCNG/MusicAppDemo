import { Link } from "react-router-dom";
import { useStoreDispatch } from "../hooks/hooks";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { DetailType } from "../types/detail";
import { SongType } from "../types/song";
import { PlayPause } from "./PlayPause";

const SongCard = ({
  song,
  dataset,
  index,
  activeSong,
  isPlaying,
}: {
  song: SongType;
  dataset?: SongType[] | DetailType[];
  index: number;
  activeSong: string;
  isPlaying: boolean;
}) => {
  const dispatch = useStoreDispatch();
  const handlePause = () => {
    dispatch(playPause(false));
  };
  const handlePlay = () => {
    dispatch(
      setActiveSong({ songId: song.key, songData: dataset, index: index }),
    );
    dispatch(playPause(true));
  };
  return (
    <div className="flex w-[250px] animate-slideup cursor-pointer flex-col rounded-lg bg-white/5 bg-opacity-80 p-4 backdrop-blur-sm">
      <div className="group relative h-56 w-full">
        <div
          className={`absolute inset-0 items-center justify-center bg-black bg-opacity-50 group-hover:flex ${activeSong === song.key ? "flex bg-black bg-opacity-70" : "hidden"}`}
        >
          <PlayPause
            song={song}
            handlePause={handlePause}
            handlePlay={handlePlay}
            activeSong={activeSong}
            isPlaying={isPlaying}
          />
        </div>
        <img alt="song_img" src={song.images.coverart} />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="truncate text-lg font-semibold text-white">
          <Link to={`/songs/${song.key}`}>{song.title}</Link>
        </p>
        <p className="mt-1 truncate text-sm text-gray-300">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
