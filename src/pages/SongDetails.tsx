import { useParams } from "react-router-dom";
import { DetailsHeader, Loader, RelatedSongs } from "../components";
import { useGetSongDetailQuery } from "../redux/services/musicApi";
import { DetailType } from "../types/detail";

type ResultType = {
  data: Record<string, string>[];
  resources: {
    [key: string]: Record<string, any>;
  };
};

const SongDetails = () => {
  const { songId } = useParams();

  const { data, isFetching } = useGetSongDetailQuery(songId!);
  if (isFetching) return <Loader />;

  const resData: ResultType = data;

  const resource = resData.resources;

  const detail: DetailType = resource["shazam-songs"][songId]["attributes"];
  const relations = resource["shazam-songs"][songId]["relationships"];

  const { lyrics, artists } = relations;
  const artistId = artists.data[0].id;
  if (!resData || !songId) return <Loader />;

  return (
    <div className="flex flex-col ">
      <DetailsHeader artistId={artistId} detail={detail} />
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white">Lyrics</h2>
        <div className="mt-5">
          {lyrics ? (
            resource["lyrics"][lyrics.data[0].id]["attributes"].text.map(
              (line) => <p className="my-l text-base text-gray-400">{line}</p>,
            )
          ) : (
            <p className="my-l text-base text-gray-400">No Lyrics</p>
          )}
        </div>
      </div>
      <RelatedSongs />
    </div>
  );
};

export default SongDetails;
