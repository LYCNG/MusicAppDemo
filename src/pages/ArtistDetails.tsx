import { useParams } from "react-router-dom";
import { DetailsHeader, Error404, Loader, RelatedSongs } from "../components";
import { useStoreSelector } from "../hooks/hooks";
import { useGetArtistSummeryQuery } from "../redux/services/musicApi";
import { ArtistSongType, ArtistType } from "../types/detail";

type ResultType = {
  data: Record<string, string>[];
  resources: {
    [key: string]: Record<string, unknown>;
  };
};

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useStoreSelector((state) => state.player);
  const {
    data,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistSummeryQuery({
    artistId: artistId!,
  });
  if (isFetchingArtistDetails) return <Loader title="Searching song details" />;

  const artistRes: ResultType = data;
  const artistResource = artistRes.resources;
  const artistData: ArtistType =
    artistResource["artists"][artistId]["attributes"];
  const songs: ArtistSongType[] = Object.values(artistResource["songs"]).map(
    (item) => {
      return {
        id: item["id"],
        ...item["attributes"],
      };
    },
  );

  if (error) return <Error404 />;

  return (
    <div className="flex flex-col ">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        data={songs}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
