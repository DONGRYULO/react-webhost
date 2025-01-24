import {useState, useEffect} from "react"
import Movie from "../components/Movie";

function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    
    const getMovies = async() => {
        const response = await fetch(   
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
        );

        const json = await response.json();
        setMovies(json.data.movies);
        setLoading(false);          
    };
    
      useEffect(() => {
        getMovies();
        return console.log('clean-up');
      }, []);  
    
      console.log(movies);
    
      return (    
        <div>
            {loading ? <h1>Loading ...</h1> : 
              <div>
                {movies.map((movie) => (
                    <Movie 
                      key={movie.id}
                      id={movie.id}
                      movieId={movie.id}
                      movieImage={movie.medium_cover_image}
                      movieTitle={movie.title}
                      movieSummary={movie.summary}
                      movieGenres={movie.genres}
                      />
                ))}
              </div>
            }
        </div>
      );
}

export default Home;