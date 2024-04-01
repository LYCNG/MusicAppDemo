//Error Loader  SonCard
import { genres } from "../assets/constants";
import { Loader, SongCard } from "../components";
import Error404 from "../components/Error404";
import { useStoreDispatch, useStoreSelector } from "../hooks/hooks";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useGetSongsByGenreQuery } from "../redux/services/musicApi";
import { SongType } from "../types/song";

const Discover = () => {
  const dispatch = useStoreDispatch();
  const { activeSong, isPlaying, genreListId } = useStoreSelector(
    (state) => state.player,
  );

  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "genre-global-chart-1",
  );

  const dataset: SongType[] = data
    ? data.tracks.map((item) => {
        return {
          id: item.key,
          ...item,
        };
      })
    : [];

  if (isFetching) return <Loader title="loading song..." />;
  if (error) return <Error404 />;

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;
  return (
    <div className="flex flex-col">
      <div className="mb-10 mt-4 flex w-full flex-col items-center justify-between sm:flex-row">
        <h2 className="text-left text-3xl font-bold text-white">
          Discover {genreTitle}
        </h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || "pop"}
          className="round-lg mt-5 bg-black p-3 text-sm text-gray-300 outline-none sm:mt-0"
        >
          {genres.map((g) => (
            <option key={g.value} value={g.value}>
              {g.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
        {dataset.map((song, index) => (
          <SongCard
            key={index}
            index={index}
            dataset={dataset}
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
