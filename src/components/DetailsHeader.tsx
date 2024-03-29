import { Link } from "react-router-dom";

import { DetailType } from "../types/detail";

const DetailsHeader = ({
  artistId,
  detail,
  artistData,
}: {
  artistId: string;
  detail: DetailType;
  artistData?: string;
}) => {
  console.log(detail);
  return (
    <div className="relative flex w-full flex-col">
      <div className="h-28 w-full bg-gradient-to-l from-transparent to-black sm:h-48">
        <div className="absolute inset-0 flex items-center">
          <img
            alt="art"
            src={detail.images.coverArt}
            className="h-28 w-28 rounded-full border-2 object-cover shadow-xl shadow-black sm:h-48 sm:w-48"
          />
          <div className="ml-5">
            <p className="text-xl font-bold text-white sm:text-3xl">
              {detail.title}1300620186
            </p>
            <Link to={`/artists/${artistId}`}>
              <p className="mt-2 text-base text-gray-400">
                {detail.primaryArtist}
              </p>
            </Link>
            <p className="mt-2 text-base text-gray-400">
              {detail.genres.primary}
            </p>
          </div>
        </div>
      </div>
      <div className="h-24 w-full sm:h-44" />
    </div>
  );
};

export default DetailsHeader;
