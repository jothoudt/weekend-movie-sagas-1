import {Link, useParams} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import axios from 'axios';
import {useEffect, useState} from 'react';
import './MovieDetails.css'

//function for Movie Details
function MovieDetails(){
    //define dispatch
    const dispatch = useDispatch();
    
    const id = useParams();
    //params captures the movie id
    console.log(id);

    //function to pass 2 dispatches on load in useEffect
    const displayDetails= ()=>{
        dispatch({type: 'FETCH_DETAILS', payload: id })
        dispatch({type: 'FETCH_GENRES', payload: id })
    }//end displayDetails

    //dispatch on load
    useEffect(()=>{
        displayDetails()
    },[])//end useEffect

    //define selections from store
    const genres = useSelector(store => store.genres);
    const details = useSelector(store=> store.details);

    let edit= '/editmovie/' + id.id;
    let param=id.id;
    console.log(param)
    //return that maps through movie details and genres reducers and a back button linked to home page
    return(
        <>
        <Link to={edit} params={id}>
            <button>Edit Movie</button>
        </Link>
        {details.map((movie, id) => {
                    return (
                        <div key={id} >
                            <h3><span  className="movie-title">{movie.title}</span></h3>
                            <img src={movie.poster} alt={movie.title}/>
                            <p className="movie-item-description">{movie.description}</p>
                        </div>
                    );
                })}
                <p><span className="p-genres">Genres: </span></p>
        {genres.map((genre, id)=>{
            return(
                <li key={id}>{genre.name}</li>
            )
        })}
        <div>
        <Link to="/">
            <button className="back-to-list">Back to List</button>
        </Link>
        </div>
        </>
    )//end return
}//end MovieDetails

export default MovieDetails;
