import { useParams } from "react-router-dom";
import { DetailsHeader, Loader } from "../components";
import { useGetSongDetailQuery } from "../redux/services/musicApi";

const SongDetails = () => {
  const { songid } = useParams();
  const { data, isFetching } = useGetSongDetailQuery(songid!);
  const songData = data;
  if (!songData || !songid) return <Loader />;
  return (
    <div className="flex flex-col ">
      <DetailsHeader />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics</h2>
        <div className="mt-5">{songData}</div>
      </div>
    </div>
  );
};

export default SongDetails;
