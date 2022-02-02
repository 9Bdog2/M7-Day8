import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainSearch from "./Components/MainSearch";
import SongSearchResult from "./Components/SongSearchResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSearch />} />
        <Route path="/:songName" element={<SongSearchResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
