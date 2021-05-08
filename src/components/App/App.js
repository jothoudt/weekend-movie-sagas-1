import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import AddMovie from '../AddMovie/AddMovie';
import MovieDetails from '../MovieDetails/MovieDetails'
import EditDetails from '../EditDetails/EditDetails'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>The Movies Saga!</h1>
      </header>

      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}
        <Route path="/moviedetails/:id">
          <MovieDetails />
        </Route>

        {/* Add Movie page */}
        <Route path="/addmovie">
          <AddMovie />
        </Route>
        <Route path="/editmovie/:id">
          <EditDetails />
        </Route>
      </Router>
    </div>
  );
}


export default App;
