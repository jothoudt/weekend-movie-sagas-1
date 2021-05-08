import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory, Link} from 'react-router-dom';
import './AddMovie.css';

//AddMovie component function
function addMovie(){
    //define dispatch and useHistory
    const dispatch=useDispatch();
    const history=useHistory();
    // define useStates
    let [movieTitle, setMovieTitle]=useState('');
    let [url, setUrl]=useState('');
    let [description, setDescription]=useState('');
    let [genre, setGenre]=useState('');

    //function add movie that adds inputs to object
    const addMovie =()=>{
        console.log('in addMovie')
        let newMovie ={
            title: movieTitle,
            poster: url,
            description: description,
            genre_id: genre
        };//
        console.log(newMovie);
        //dispatch new movie to post route
        dispatch({type: 'NEW_MOVIE', payload: newMovie });
        //message that movie is added
        alert('Movie added!');
        //after click ok on alert push back to home
        history.push('/')
    }; //end addMovie function

    return(
        <>
            
        <div className="movieAdd">
            <div className="form">
            <form>
            <h1>Add Movie</h1>
            <p>Please fill in details below.</p>
            <div>
                <label>Movie Title: </label><input type="text" placeholder="Movie Title" onChange={(event)=>setMovieTitle(event.target.value)} />
            </div>
             <div>
                <label>Poster URL: </label><input type="text" placeholder="Movie Poster URL" onChange={(event)=>setUrl(event.target.value)} />
             </div>
             <div>
                 <div className="movie-description">
                    <label>Movie Description:  </label>
                 </div>
                 <textarea name="pargraph_text" cols="50" rows="5" placeholder="Movie description" onChange={(event)=>setDescription(event.target.value)} />
            </div>
            <div>
                <label>Select Genre: </label>
                <select name="Genres" onChange={(event)=>setGenre(event.target.value)}>
                    <option></option>
                    <option value="1">Adventure</option>
                    <option value="2">Animated</option>
                    <option value="3">Biographical</option>
                    <option value="4">Comedy</option>
                    <option value="5">Disaster</option>
                    <option value="6">Drama</option>
                    <option value="7">Epic</option>
                    <option value="8">Fantasy</option>
                    <option value="9">Musical</option>
                    <option value="10">Romantic</option>
                    <option value="11">Science Fiction</option>
                    <option value="12">Space-Opera</option>
                    <option value="13">Superhero</option>
                </select>
            </div>
            </form>
            </div>
            <div>
                <button onClick={addMovie}>Save</button><Link to="/"><button>Cancel</button></Link>
            </div>
        </div>
        </>
    )//end return
}//end AddMovie

export default addMovie;
