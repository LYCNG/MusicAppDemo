import { useParams } from "react-router-dom";
import { DetailsHeader, Error404, Loader, RelatedSongs } from "../components";
import { useStoreDispatch, useStoreSelector } from "../hooks/hooks";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import {
  useGetSongDetailQuery,
  useGetSongRelatedQuery,
} from "../redux/services/musicApi";
import { DetailType } from "../types/detail";

type ResultType = {
  data: Record<string, string>[];
  resources: {
    [key: string]: Record<string, unknown>;
  };
};

const SongDetails = () => {
  const { songId } = useParams();
  const dispatch = useStoreDispatch();
  const { activeSong, isPlaying } = useStoreSelector((state) => state.player);

  const {
    data,
    isFetching: isFetchingDetails,
    error: queryDetailError,
  } = useGetSongDetailQuery({
    songId: songId!,
  });

  const {
    data: relationData,
    isFetching: isFetchingRelations,
    error: queryRelationError,
  } = useGetSongRelatedQuery({ songId: songId! });

  if (isFetchingDetails || isFetchingRelations)
    return <Loader title="Searching song details" />;

  const resData: ResultType = data;
  const resDataRelation: ResultType = relationData;

  const resource = resData.resources;
  const detail: DetailType = resource["shazam-songs"][songId]["attributes"];
  const relations = resource["shazam-songs"][songId]["relationships"];
  const { lyrics, artists } = relations;
  const artistId = artists.data[0]["id"];

  const relativeResource = resDataRelation.resources;
  const relativeSongs = relativeResource["shazam-songs"];
  const relativeDetail: DetailType[] = Object.values(relativeSongs).map(
    (item) => {
      return {
        id: item["id"],
        ...item["attributes"],
      };
    },
  );

  if (!resData || !songId) return <Loader />;
  if (queryDetailError || queryRelationError) return <Error404 />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (songId: string, i: number) => {
    dispatch(
      setActiveSong({ songId: songId, index: i, songData: relativeDetail }),
    );
    dispatch(playPause(true));
  };
  return (
    <div className="flex flex-col ">
      <DetailsHeader artistId={""} detail={{ ...detail, artistId: artistId }} />
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white">Lyrics</h2>
        <div className="mt-5">
          {lyrics ? (
            resource["lyrics"][lyrics.data[0].id]["attributes"].text.map(
              (line: string, index: number) => (
                <p key={index} className="my-l text-base text-gray-400">
                  {line}
                </p>
              ),
            )
          ) : (
            <p className="my-l text-base text-gray-400">No Lyrics</p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={relativeDetail}
        artistId=""
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
