import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SongType, } from '../../types/song';


export interface PlayerStateType { 
    currentSongs:SongType[],
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
    setActiveSong: (state, action: PayloadAction<{index:number,song:string}>) => {
      state.activeSong = action.payload.song;

      // if (action.payload?.data?.tracks?.hits) {
      //   state.currentSongs = action.payload.data.tracks.hits;
      // } else if (action.payload?.data?.properties) {
      //   state.currentSongs = action.payload?.data?.tracks;
      // } else {
      //   state.currentSongs = action.payload.data;
      // }

      state.currentIndex = action.payload.index;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      // if (state.currentSongs[action.payload]?.track) {
      //   state.activeSong = state.currentSongs[action.payload]?.track;
      // } else {
      //   state.activeSong = state.currentSongs[action.payload];
      // }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      // if (state.currentSongs[action.payload]?.track) {
      //   state.activeSong = state.currentSongs[action.payload]?.track;
      // } else {
      //   state.activeSong = state.currentSongs[action.payload];
      // }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action:PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId } = playerSlice.actions;

export default playerSlice.reducer;
