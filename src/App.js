import { Route,Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Videos from "./components/Videos";
import Channel from "./components/Channel";
import Search from "./components/Search";
import Video from "./components/Video";
import './index.css'
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Videos/>}/>
        <Route path="/channel/:id" element={<Channel/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/video/:videoId" element={<Video/>}/>
      </Routes>
    </div>
  );
}

export default App;
