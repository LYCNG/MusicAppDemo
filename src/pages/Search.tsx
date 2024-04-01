import { useNavigate, useParams } from "react-router-dom";
import { Error404, Loader, SongCard } from "../components";

import { useStoreSelector } from "../hooks/hooks";
import { useGetSongBySearchQuery } from "../redux/services/musicApi";
import { SongType } from "../types/song";

type SongDataType = Record<string, unknown>;

const Search = () => {
  const { searchText } = useParams();
  const navigate = useNavigate();
  const { activeSong, isPlaying } = useStoreSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongBySearchQuery(searchText);

  if (isFetching) return <Loader title="Loading Top Charts" />;
  if (error) return <Error404 />;

  const songs: SongType[] = data?.tracks?.hits?.map(
    (item: SongDataType) => item.track,
  );
  const artists = data?.artists?.hits?.map((item: SongDataType) => item.artist);

  return (
    <div className="flex flex-col">
      <h2 className="mb-10 mt-4 text-left text-3xl font-bold text-white">
        Showing results for <p className="font-black">{searchText}</p>
      </h2>
      <p className="mb-5 text-lg font-bold text-white">Songs</p>
      <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
        {songs.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            index={i}
          />
        ))}
      </div>
      <p className="mb-10 mt-5 text-lg font-bold text-white">Artists</p>
      <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
        {artists.map((artist, i) => (
          <div
            key={`${artist.adamid}-${i}`}
            className="flex w-[250px] animate-slideup cursor-pointer flex-col rounded-lg bg-white/5 bg-opacity-80 p-4 backdrop-blur-sm"
            onClick={() => navigate(`/artists/${artist.adamid}`)}
          >
            <img
              alt="song_img"
              src={artist.avatar}
              className="h-56 w-full rounded-lg"
            />
            <p className="mt-4 truncate text-lg font-semibold text-white">
              {artist.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
