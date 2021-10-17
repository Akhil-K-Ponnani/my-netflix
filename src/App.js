import React from "react";
import { Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import Movies from "./pages/Movies"
import TVShows from "./pages/TVShows";
import ViewMoviesGenre from "./pages/ViewMoviesGenre";
import ViewMoviesTrending from "./pages/ViewMoviesTrending";
import ViewTrending from "./pages/ViewTrending";
import ViewTVShowsGenre from "./pages/ViewTVShowsGenre";
import ViewTVShowsTrending from "./pages/ViewTVShowsTrending";

function App() {
  return (
    <div>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/trending'>
        <ViewTrending />
      </Route>
      <Route exact path='/movies'>
        <Movies />
      </Route>
      {/* <Route exact path='/movies/:id'>
        <TVShows />
      </Route> */}
      <Route exact path='/movies/trending'>
        <ViewMoviesTrending />
      </Route>
      <Route exact path='/movies/genres/:id'>
        <ViewMoviesGenre />
      </Route>
      <Route exact path='/tvshows'>
        <TVShows />
      </Route>
      {/* <Route exact path='/tvshows/:id'>
        <TVShows />
      </Route> */}
      <Route exact path='/tvshows/trending'>
        <ViewTVShowsTrending />
      </Route>
      <Route exact path='/tvshows/genres/:id'>
        <ViewTVShowsGenre />
      </Route>
    </div>
  );
}

export default App;
