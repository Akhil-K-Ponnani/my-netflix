import React from "react";
import './App.css'
import Banner from "./Components/Banner/Banner";
import Navbar from "./Components/Navbar/Navbar";
import RowPost from "./Components/RowPost/RowPost";

function App() {
  return (
    <div>
      <Navbar />
      <Banner />
      <RowPost />
    </div>
  );
}

export default App;
