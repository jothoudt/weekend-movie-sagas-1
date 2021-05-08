import {Link} from 'react-router-dom'
import './MovieItem.css'

function MovieItem(props){
    //define url to pass the link
    let moviedetails= '/moviedetails/' + props.movie.id;

    //return properties of prop
    return(
        <>
        <div className="movie">
            <div key={props.movie.id} >
                <h3>{props.movie.title}</h3>
                <Link to={moviedetails} params={props.movie.id} >
                    <img src={props.movie.poster} alt={props.movie.title}/>
                </Link>
            </div>
        </div>
        </>
    )//end return
}//end MovieItem

export default MovieItem;