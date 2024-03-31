import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useStoreDispatch, useStoreSelector } from "../hooks/hooks";
import { useGetTopChartQuery } from "../redux/services/musicApi";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { PlayPause } from "../components/PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { SongType } from "../types/song";

const TopSongCard = ({
  song,
  index,
  isPlaying,
  activeSong,
  handlePause,
  handlePlay,
}: {
  song: SongType;
  index: number;
  isPlaying: boolean;
  activeSong: string;
  handlePause: () => void;
  handlePlay: () => void;
}) => (
  <div
    key={index}
    className="round-lg mb-2 flex w-full cursor-pointer flex-row items-center p-4 py-2 hover:bg-[#4c426e]"
  >
    <h3 className="fot-bold mr-3 text-base text-white">{index + 1}</h3>
    <div className="flex flex-1 flex-row items-center justify-between">
      <img
        className="h-20 w-20 rounded-lg"
        src={song.images.coverart}
        alt={song.title}
      />
      <div className="mx-3 flex flex-1 flex-col justify-center">
        <Link to={`/songs/${song.key}`}>
          <p className="text-xl font-bold  text-white">{song.title}</p>
        </Link>
        <Link to={`/artists/${song.artists[0].adamid}`}>
          <p className="mt-1 text-base text-gray-300 ">{song.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePause}
      handlePlay={handlePlay}
    />
  </div>
);

export const TopPlay = () => {
  const dispatch = useStoreDispatch();
  const { activeSong, isPlaying } = useStoreSelector((state) => state.player);
  const { data } = useGetTopChartQuery("");
  const divRef = useRef<HTMLDivElement>(null);
  const topPlays: SongType[] = data ? data.tracks.slice(0, 5) : [];

  useEffect(() => {
    if (divRef && divRef.current) {
      divRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  const handlePause = () => {
    dispatch(playPause(false));
  };
  const handlePlay = (song: string, index: number) => {
    dispatch(setActiveSong({ song: song, index: index }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className="mb-6 ml-0 flex max-w-full flex-1 flex-col xl:mb-0 xl:ml-6 xl:max-w-[500px]"
    >
      <div className="flex w-full flex-col">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Top Charts</h2>
          <Link to="/top-charts">
            <p className="cursor-pointer text-base text-gray-300">see more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays.map((song, index) => (
            <TopSongCard
              key={song.key}
              song={song}
              index={index}
              activeSong={activeSong}
              isPlaying={isPlaying}
              handlePause={handlePause}
              handlePlay={() => handlePlay(song.key, index)}
            />
          ))}
        </div>
      </div>
      <div className="mt-8 flex w-full flex-col">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Top Artists</h2>
          <Link to="/top-artists">
            <p className="cursor-pointer text-base text-gray-300">see more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays.map((song) => (
            <SwiperSlide
              key={song.key}
              style={{ width: "25%", height: "auto" }}
              className="animate-slideright rounded-full shadow-lg"
            >
              <Link to={`/artists/${song.artists[0].adamid}`}>
                <img
                  src={song.images.background}
                  alt="name"
                  className="w-full rounded-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
