export type DetailType = {
  type: string;
  title: string;
  artist: string;
  primaryArtist: string;
  label: string;
  explicit: boolean;
  isrc: string;
  webUrl: string;
  images: Record<string, string>;
  artwork: Record<string, string>;
  share: Record<string, string>;
  streaming: Record<string, string>;
  genres: Record<string, string>;
  classicalAvailability:boolean
};