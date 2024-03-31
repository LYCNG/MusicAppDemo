export type DetailType = {
  id: string;
  type: string;
  title: string;
  artist: string;
  artistId: string; 
  primaryArtist: string;
  label: string;
  explicit: boolean;
  isrc: string;
  webUrl: string;
  images?: Record<string, string>;
  artwork: Record<string, string>;
  share: Record<string, string>;
  streaming: Record<string, string>;
  genres: Record<string, string>;
  classicalAvailability:boolean
};

export type ArtistType = {
  genreNames: string[];
  name:string
  artwork:Record<string, string>;
  editorialNotes:Record<string, string>;
  url:string
};

export type ArtistSongType = {
  id: string;
  hasTimeSyncedLyrics: boolean;
  albumName: string;
genreNames:string[]
  trackNumber: number;
releaseDate:string
durationInMillis:number
  isVocalAttenuationAllowed: boolean;
  isMasteredForItunes: boolean;
  isrc: string;
  artwork: Record<string, string>;
audioLocale:string
composerName:string
url:string
  playParams: Record<string, string>;
  discNumber: number;
  hasCredits: boolean;
  isAppleDigitalMaster: boolean;
  hasLyrics: boolean;
  audioTraits: string[];
  name: string;
previews:Record<string, unknown>[]
  artistName: string;
};