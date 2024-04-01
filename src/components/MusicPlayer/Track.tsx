import { DetailType } from "../../types/detail";
import { SongType } from "../../types/song";

const Track = ({
  isPlaying,
  isActive,
  song,
}: {
  isPlaying: boolean;
  isActive: boolean;
  song: SongType | DetailType;
}) => (
  <div className="flex flex-1 items-center justify-start">
    <div
      className={`${isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""} mr-4 hidden h-16 w-16 sm:block`}
    >
      <img
        src={song?.images?.coverart || song?.images?.["coverArt"]}
        alt="cover art"
        className="rounded-full"
      />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-lg font-bold text-white">
        {song?.title ? song?.title : "No active Song"}
      </p>
      {/* <p className="truncate text-gray-300">
        {song?.subtitle ? song?.subtitle : "No active Song"}
      </p> */}
    </div>
  </div>
);

export default Track;
