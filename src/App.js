import React from "react";
import './App.css'
import Banner from "./Components/Banner/Banner";
import Navbar from "./Components/Navbar/Navbar";
import RowPost from "./Components/RowPost/RowPost";
import { action, originals } from "./urls";

function App() {
  return (
    <div>
      <Navbar />
      <Banner />
      <RowPost title="Netflix Originals" url={originals} />
      <RowPost title="Action" url={action} isSmall />
      <RowPost title="Action" url={action} isSmall />
    </div>
  );
}

export default App;
