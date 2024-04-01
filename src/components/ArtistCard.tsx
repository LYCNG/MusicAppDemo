import { useNavigate } from "react-router-dom";
import { SongType } from "../types/song";

const ArtistCard = ({ song }: { song: SongType }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex w-[250px] animate-slideup cursor-pointer flex-col rounded-lg bg-white/5 bg-opacity-80 p-4 backdrop-blur-sm"
      onClick={() => navigate(`/artists/${song?.artists[0]?.adamid}`)}
    >
      <img
        alt="song_img"
        src={song?.images?.coverart}
        className="h-56 w-full rounded-lg"
      />
      <p className="mt-4 truncate text-lg font-semibold text-white">
        {song?.subtitle}
      </p>
    </div>
  );
};

export default ArtistCard;
