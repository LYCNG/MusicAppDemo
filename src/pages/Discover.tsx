//Error Loader  SonCard
import { genres } from "../assets/constants";
import { Loader, SongCard } from "../components";
import Error404 from "../components/Error404";
import { useGetTopChartQuery } from "../redux/services/musicApi";
import { SongType } from "../types/song";
import { selectGenreListId } from "../redux/features/playerSlice";
import {  useStoreDispatch, useStoreSelector } from "../hooks/hooks";

const Discover = () => {
  const dispatch = useStoreDispatch();
  const { activeSong, isPlaying,genreListId } = useStoreSelector((state) => state.player);

  const { data, isFetching, error } = useGetTopChartQuery("");
  const genreTitle = "Pop";

  const dataset: SongType[] = data ? data.tracks : [];

  if (isFetching) return <Loader title="loading song..." />;
  if (error) return <Error404 />;
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId||'pop'}
          className="bg-black text-gray-300 p-3 text-sm round-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((g) => (
            <option key={g.value} value={g.value}>
              {g.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {dataset.map((song, index) => (
          <SongCard
            key={index}
            index={index}
            song={song}
            activeSong={activeSong}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
