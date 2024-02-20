import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useStoreSelector,useStoreDispatch } from '../hooks/hooks';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { PlayPause } from '../components/PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartQuery } from '../redux/services/musicApi';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { SongType } from '../types/song';


const TopSongCard = ({song,index}:{song:SongType,index:number}) => (
    <div key={index} className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 round-lg cursor-pointer mb-2">
        {song.title}
    </div>
    
);

export const TopPlay = () => {
    const dispatch = useStoreDispatch();
    const { activeSong, isPlaying } = useStoreSelector(state => state.player);
    const { data } = useGetTopChartQuery('');
    const divRef = useRef<HTMLDivElement>(null);
    const topPlays:SongType[] = data?data.tracks.slice(0, 5):[];

    useEffect(() => { 
        if (divRef && divRef.current) { 
            divRef?.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
    // const handlePause = () => {
    //     dispatch(playPause(false));
    // };
    // const handlePlay = () => {
    //     dispatch(setActiveSong({ song: song, index: index }));
    //     dispatch(playPause(true));
    // };
    
  return (
      <div ref={divRef} className='xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col'>
          <div className='w-full flex flex-col'>
              <div className='flex flex-row justify-between items-center'>
                  <h2 className='text-white font-bold text-2xl'>Top Charts</h2>
                  <Link to='/top-charts'>
                      <p className='text-gray-300 text-base cursor-pointer'>see more</p>
                  </Link>
              </div>
              <div className='mt-4 flex flex-col gap-1'>
                {topPlays.map((song, index) => <TopSongCard key={song.key} song={song} index={index} />)}
                </div>
          </div>
          <div className='w-full flex flex-col mt-8'>
              <div className='flex flex-row justify-between items-center'>
                  <h2 className='text-white font-bold text-2xl'>Top Artists</h2>
                  <Link to='/top-artists'>
                      <p className='text-gray-300 text-base cursor-pointer'>see more</p>
                  </Link>
              </div>
              <Swiper
                  slidesPerView='auto'
                  spaceBetween={15}
                  freeMode
                  centeredSlides
                  centeredSlidesBounds
                  modules={[FreeMode]}
                  className='mt-4'
              >
                  {topPlays.map(song =>
                      <SwiperSlide key={song.key} style={{width:'25%',height:'auto'}} className='shadow-lg rounded-full animate-slideright'>
                          <Link to={`/artists/${song.artists[0].adamid}`}>
                              <img src={song.images.background} alt='name' className='rounded-full w-full object-cover' />
                          </Link>
                    </SwiperSlide>
                    )}
              </Swiper>
          </div>
      </div>
  )
}
