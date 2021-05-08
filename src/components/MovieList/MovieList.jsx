import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import MovieItem from '../MovieItem/MovieItem'
import './MovieList.css'

function MovieList() {
    //define dispatch
    const dispatch = useDispatch();
    //select movies from store
    const movies = useSelector(store => store.movies);

    //dispatch to display on load
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);//end useEffect

    //return with Link to AddMovie, Map movies into MovieItem component, pass movie as a prop
    return (
        <main>
            <h1><span className="h1"><u>MovieList</u></span></h1>
            <Link to="/addmovie">
                <button>Add Movie</button>
            </Link>
            <section className="movies">
                {movies.map((movie, id) =>{
                    return (<MovieItem movie={movie} key={id}/>
                        
                    );
                })}
            </section>
        </main>

    );//end return
}//end MovieList

export default MovieList;