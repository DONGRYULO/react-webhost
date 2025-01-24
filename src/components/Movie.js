import PropTypes from "prop-types";
import {Link} from "react-router-dom";

function Movie({id, movieId, movieImage, movieTitle, movieSummary, movieGenres}) {        

    return <div key={movieId}>
                <img src={movieImage}/>
                <h2>
                    <Link to={`/movie/${id}`}>
                        {movieTitle}
                    </Link>
                </h2>  
                <p>{movieSummary}</p>
                <ul>
                {
                    movieGenres.map((g) => (
                    <li key={g}>{g}</li>
                    ))
                }
                </ul>
            </div>
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    movieImage: PropTypes.string.isRequired,
    movieTitle: PropTypes.string.isRequired,
    movieSummary: PropTypes.string.isRequired,
    movieGenres: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Movie;