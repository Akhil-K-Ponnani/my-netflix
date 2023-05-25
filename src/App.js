import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { FirebaseAuthContext } from "./contexts";
import { firebaseAuth } from "./firebase";
import Home from "./pages/Home";
import ViewSignin from "./pages/ViewSignin";
import Movies from "./pages/Movies"
import TVShows from "./pages/TVShows";
import ViewMovie from "./pages/ViewMovie";
import ViewMoviesGenre from "./pages/ViewMoviesGenre";
import ViewMoviesTrending from "./pages/ViewMoviesTrending";
import ViewTrending from "./pages/ViewTrending";
import ViewTVShow from "./pages/ViewTVShow";
import ViewTVShowsGenre from "./pages/ViewTVShowsGenre";
import ViewTVShowsTrending from "./pages/ViewTVShowsTrending";
import ViewWishlist from "./pages/ViewWishlist";
import ViewError from "./pages/ViewError";
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user)
        setUser(user)
      else
        setUser(undefined)
    })
  }, [])
  return (
    <div>
      <FirebaseAuthContext.Provider value={{ user, setUser }}>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/signin'>
            {!user ? <ViewSignin /> : <Redirect to={{ pathname: '/' }} />}
          </Route>
          <Route exact path='/trending'>
            <ViewTrending />
          </Route>
          <Route exact path='/movies'>
            <Movies />
          </Route>
          <Route exact path='/movie/:id'>
            <ViewMovie />
          </Route>
          <Route exact path='/movies/trending'>
            <ViewMoviesTrending />
          </Route>
          <Route exact path='/movies/genres/:id'>
            <ViewMoviesGenre />
          </Route>
          <Route exact path='/tvshows'>
            <TVShows />
          </Route>
          <Route exact path='/tvshow/:id'>
            <ViewTVShow />
          </Route>
          <Route exact path='/tvshows/trending'>
            <ViewTVShowsTrending />
          </Route>
          <Route exact path='/tvshows/genres/:id'>
            <ViewTVShowsGenre />
          </Route>
          <Route exact path='/wishlist'>
            {user !== undefined ? <ViewWishlist /> : <Redirect to={{ pathname: '/signin' }} />}
          </Route>
          <Route exact path='*'>
            <ViewError />
          </Route>
        </Switch>
      </FirebaseAuthContext.Provider>
    </div>
  );
}

export default App;
