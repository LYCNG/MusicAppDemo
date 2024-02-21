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
  activeSong: SongType;
  handlePause: () => void;
  handlePlay: () => void;
}) => (
  <div
    key={index}
    className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 round-lg cursor-pointer mb-2"
  >
    <h3 className="fot-bold text-base text-white mr-3">{index + 1}</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={song.images.coverart}
        alt={song.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.key}`}>
          <p className="text-xl font-bold  text-white">{song.title}</p>
        </Link>
        <Link to={`/songs/${song.artists[0].adamid}`}>
          <p className="text-base text-gray-300 mt-1 ">{song.subtitle}</p>
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
  const handlePlay = (song: SongType, index: number) => {
    dispatch(setActiveSong({ song: song, index: index }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">see more</p>
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
              handlePlay={() => handlePlay(song, index)}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">see more</p>
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
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${song.artists[0].adamid}`}>
                <img
                  src={song.images.background}
                  alt="name"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
