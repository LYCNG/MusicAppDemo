import { Route, Routes } from "react-router-dom";
import { MusicPlayer, Searchbar } from "./components";
import { useStoreSelector } from "./hooks/hooks";
import Sidebar from "./layouts/Sidebar";
import { TopPlay } from "./layouts/TopPlay";
import {
  ArtistDetails,
  Discover,
  Search,
  SongDetails,
  TopArtists,
  TopCharts,
} from "./pages";

const App = () => {
  const { activeSong } = useStoreSelector((state) => state.player);

  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex flex-1 flex-col bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />
        <div className="hide-scrollbar flex h-[calc(100vh-72px)] flex-col-reverse overflow-y-scroll px-6 xl:flex-row">
          <div className="h-fit flex-1 pb-40">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />

              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songId" element={<SongDetails />} />
              <Route path="/search/:searchText" element={<Search />} />
            </Routes>
          </div>
          <div className="relative top-0 h-fit xl:sticky">
            <TopPlay />
          </div>
        </div>
      </div>

      {activeSong && (
        <div className="absolute bottom-0 left-0 right-0 z-10 flex h-28 animate-slideup rounded-t-3xl bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
