import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, Link, useParams} from 'react-router-dom';

function EditDetails(){
   
    //define dispatch and useHistory
    const dispatch=useDispatch();
    const history=useHistory();
    // define useStates
    let [movieTitle, setMovieTitle]=useState('');
    let [description, setDescription]=useState('');

    //define params
    let editId = useParams();

    //access store for details
    const details = useSelector(store=> store.details);

    console.log(details[0].title);
    //function editMovie that adds inputs to object
    const editMovie =()=>{
        console.log('in editMovie')
        let editMovie ={
            id: editId,
            title: movieTitle,
            description: description,
        };//
        console.log(editMovie);
        //dispatch new movie to post route
        dispatch({type: 'EDIT_MOVIE', payload:editMovie});
        //alert succeful edit
        alert('Successfully Edited!')
        //push to home
        history.push("/");
    }

    return(
        <div className="form">
            <form>
        <div>
            <h1>Edit Movie</h1>
        </div>
        <div>
            <p>Please fill in details below.</p>
        </div>
        <div className="movieAdd">
            <div>
                <label>Movie Title: </label><input type="text" placeholder={details[0].title} onChange={(event)=>setMovieTitle(event.target.value)} />
            </div>
             <div>
                 <div className="movie-description">
                    <label>Movie Description:  </label>
                 </div>
                 <textarea name="pargraph_text" cols="50" rows="5" placeholder={details[0].description} onChange={(event)=>setDescription(event.target.value)} />
            </div>
        </div>
            </form>
            <div>
                <button onClick={editMovie}>Save</button><Link to="/"><button>Cancel</button></Link>
            </div>
        </div>
    )//end return
}//end EditDetails

export default EditDetails;