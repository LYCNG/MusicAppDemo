import { SongType } from "../types/song";
import SongBar from "./SongBar";

const RelatedSongs = ({
  data,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}: {
  data: SongType;
  artistId: string;
  isPlaying: boolean;
  activeSong: SongType;
  handlePauseClick: () => void;
  handlePlayClick: () => void;
}) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold text-white">Related Songs:</h1>

      <div className="mt-6 flex w-full flex-col">
        {data?.map((song, i) => (
          <SongBar
            key={`${artistId}-${song.key}-${i}`}
            song={song}
            i={i}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
