import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DetailType } from '../../types/detail';
import { SongType, } from '../../types/song';


export interface PlayerStateType { 
    currentSongs:SongType[]| DetailType[],
  currentIndex: number,
  isActive: boolean,
  isPlaying: boolean,
  activeSong: string;
  genreListId: string,
}

const initialState:PlayerStateType = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: "",
  genreListId: '',
};


const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state,
      action: PayloadAction<{
        index: number,
        songId: string,
        songData?:SongType[]| DetailType[]
    }>) => {
      state.activeSong = action.payload.songId;

      if (action.payload?.songData) {
        state.currentSongs = action.payload.songData
      } 
      state.currentIndex = action.payload.index;
      state.isActive = true;
    },

    nextSong: (state, action: PayloadAction<number>) => {
      if (state.currentSongs[action.payload]) {
        state.activeSong = state.currentSongs[action.payload].id
      } 

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action: PayloadAction<number>) => {
       if (state.currentSongs[action.payload]) {
        state.activeSong = state.currentSongs[action.payload].id
      } 

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action:PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action:PayloadAction<string>) => {
      state.genreListId = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId } = playerSlice.actions;

export default playerSlice.reducer;
