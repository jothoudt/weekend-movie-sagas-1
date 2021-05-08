import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, take } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    //get all movies
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    //get genres for specific movie
    yield takeEvery('FETCH_GENRES', fetchGenre);
    //get the details of a specific movie
    yield takeEvery('FETCH_DETAILS', fetchSingleMovie);
    //post a new movie to the database
    yield takeEvery('NEW_MOVIE', addNewMovie);
    //put to edit movie in database
    yield takeEvery('EDIT_MOVIE', editMovie);
}//end rootSaga

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}//end fetAllMovies
function* addNewMovie(action){
    //add a new movie to the database
    try{
        const newMovie= yield axios.post('/api/movie', action.payload);
        console.log('in POST');
    }
    catch{
        console.log('error in post');
    }
}//end addNewMovie

function* editMovie(action){
    console.log(action.payload.id)
    try{
        const editMovie= yield axios.put('/api/movie', action.payload);
        console.log('in put')
    }
    catch{
        console.log('error in put')
    }
}

function* fetchGenre(action){
    //get the genres of a specific movie
    console.log(action.payload)
    try{
        const genres= yield axios.get('/api/genre', {params: action.payload});
        console.log('get genres', genres.data);
        yield put({type: 'SET_GENRES', payload: genres.data});
    }
    catch{
        console.log('get genre error');
    }
}//end fetchGenre

function* fetchSingleMovie(action){
    //get the details of a specific movie
    let id= action.payload;
    try{
    const movie= yield axios.get('/api/movie/' + id, {params: action.payload});
    console.log('get specific movie', movie.data);
    yield put({type: 'SET_DETAILS', payload: movie.data});
    }
    catch{
        console.log('get single movie error');
    }
}//end fetchSingleMovie

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}//end movies reducer

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}//end genre reducer
// Used to store details of a specific movie
const details = (state =[], action)=>{
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    } 
}//end details reducer
// Used to add a new movie
const newMovie = (state='', action)=> {
    switch(action.type) {
        case 'ADD_MOVIE':
            return action.payload;
    default:
        return state;
    }
}//end newMovie reducer

const movieEdit=(state='', action)=> {
    switch(action.type){
        case 'EDIT_MOVIE':
            return action.payload;
    default:
        return state;
    }
}
// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        details,
        newMovie,
        movieEdit,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
