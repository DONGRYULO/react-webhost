import {useParams} from "react-router-dom";  
import { useEffect, useState } from "react";
import MovieDetail from "../components/MovieDetail";

function Detail(){
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [movieInfo, setMovieInfo] = useState();
    
    const getMovies = async() => {
        const json = await(   
            await fetch (`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        
        setMovieInfo(json.data.movie);
        setLoading(false);
    };

    useEffect(() => {
        getMovies();
    }, []);

    console.log(movieInfo)
    
    return (
        <div>
            {loading ? <h1>loading...</h1> : 
                <MovieDetail 
                    title={movieInfo.title}
                    imgsrc={movieInfo.large_cover_image}
                />                
            }
        </div>
    );
}

export default Detail;