import { Error404, Loader, SongCard } from "../components";

import { useStoreSelector } from "../hooks/hooks";
import { useGetTopChartQuery } from "../redux/services/musicApi";
import { SongType } from "../types/song";

const TopCharts = () => {
  const { activeSong, isPlaying } = useStoreSelector((state) => state.player);

  const { data, isFetching, error } = useGetTopChartQuery({});

  if (isFetching) return <Loader title="Loading Top Charts" />;

  if (error) return <Error404 />;
  const dataset: SongType[] = data ? data.tracks : [];

  return (
    <div className="flex flex-col">
      <h2 className="mb-10 mt-4 text-left text-3xl font-bold text-white">
        Discover Top Charts
      </h2>

      <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
        {dataset.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            index={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
