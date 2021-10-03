// import PrivateRoute from 'Components/PrivateRoute';
import PrivateRoute from 'Components/PrivateRoute';
import Movies from 'Pages/Movies';
import MovieDetails from 'Pages/MovieDetails';
import {Router,Route ,Switch } from 'react-router-dom';
import history from 'util/history';
import NavBar from './Components/NavBar';
import Login from './Pages/Login';

const Routes = () => (
  <Router history={history}>
    <NavBar />
    <Switch>
      <Route path="/" exact>
          <Login></Login>
      </Route>
      <PrivateRoute path="/movies/:movieId">
        <MovieDetails/>
      </PrivateRoute>
      <PrivateRoute path="/movies">
          <Movies></Movies>
      </PrivateRoute>
    </Switch>
  </Router>
);

export default Routes;