import { Error404, Loader } from "../components";
import ArtistCard from "../components/ArtistCard";
import { useGetTopChartQuery } from "../redux/services/musicApi";
import { SongType } from "../types/song";

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartQuery({});

  if (isFetching) return <Loader title="Loading artists..." />;

  if (error) return <Error404 />;

  const dataset: SongType[] = data ? data.tracks : [];

  return (
    <div className="flex flex-col">
      <h2 className="mb-10 mt-4 text-left text-3xl font-bold text-white">
        Top artists
      </h2>

      <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
        {dataset.map((song) => (
          <ArtistCard key={song.key} song={song} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
