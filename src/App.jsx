import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import YouTube from 'react-youtube';
import { Navbar,Button} from 'react-bootstrap';


function App() {
const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '56216793abd09f2446195acf3019e852';
const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

//*End point de las imagenes
const URL_IMAGE =  "https://image.tmdb.org/t/p/original";

//*Variables de estado
const [movies, setMovies] = useState([]);
const [searchKey, setSearchKey] = useState('');
const [trailer, setTrailer] = useState(null);
const [movie, setMovie] = useState({title:'Loading Movies'});
const [playing, setPlaying] = useState(false);

//Function para realizar peticion a la APi de movie
const fetchMovies = async(searchKey)=>{
  const type = searchKey ? 'search' : 'discover'
  const {data:{results},
} = await axios.get(`${API_URL}/${type}/movie`,{
  params:{
    api_key:API_KEY,
    query:searchKey,
  },
});

setMovies(results);
setMovie(results[0]);

if (results.length) {
  await fetchMovie(results[0].id);
}

}

//Function para realizar peticion a la api youtube
const fetchMovie = async(id) =>{
  const {data} = await axios.get(`${API_URL}/movie/${id}`,{
    params: {
      api_key: API_KEY,
      append_to_response: "videos",
    },
  })
  if (data.videos && data.videos.results) {
    const trailer = data.videos.results.find(
      (vid)=>vid.name === 'Official Trailer'
    );
    setTrailer(trailer ? trailer : data.videos.results[0])
  }
  setMovie(data)
}

//*function para selectMovie 
const selectMovie = async(movie)=>{
  fetchMovie(movie.id);
  setMovie(movie);
  window.scrollTo(0,0);
}


//*Funcion para buscador de peliculas 
const searchMovies =(e)=>{
  e.preventDefault();
  fetchMovies(searchKey);
}

useEffect(() => {
  fetchMovies();
}, [])


return (
  <div className='contenedor'>
    {/*
    <h1 className='text-center mt-5 mb-5'>Trailer Movies</h1>
    <form className='container mb-4' onSubmit={searchMovies}>
  <input type="text" placeholder='search' onChange={(e)=>setSearchKey(e.target.value)}/>
  <Button variant="outline-success">Search</Button>
    </form>*/}
    <Navbar bg="dark">
    <div class="container">
      <h1 className='text-warning text-center mt-5 mb-5'>Movie trailer search engine</h1>
    </div>
    
      <div class="d-grid gap-2 mx-auto">
        <form className='container mb-4' onSubmit={searchMovies}>
          <input
          className='input-lg' 
          type="text" 
          placeholder='search' 
          onChange={(e)=>setSearchKey(e.target.value)}
          style={{width: "100%",height: "50%",}}
          />
          <button 
          className='btn btn-warning' 
          type='button' 
          style={{width: "100%",height: "50%",}}
          >
            Search
            </button>
        </form>
      </div>    
    </Navbar>

    {/*Contenedor el reproductor y del banner*/}
    <div>
        <main>
          {movie ? (
            <div
              className="viewtrailer"
              style={{
                backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
              }}
            >
              {playing ? (
                <>
                  <YouTube
                    videoId={trailer.key}
                    className="reproductor container"
                    containerClassName={"youtube-container amru"}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                      },
                    }}
                  />
                  <button onClick={() => setPlaying(false)} className="boton">
                    Close
                  </button>
                </>
              ) : (
                <div className="container">
                  <div className="">
                    {trailer ? (
                      <button
                        className="boton"
                        onClick={() => setPlaying(true)}
                        type="button"
                      >
                        Play Trailer
                      </button>
                    ) : (
                      "Sorry, no trailer available"
                    )}
                    <h1 className="text-white">{movie.title}</h1>
                    <p className="text-white">{movie.overview}</p>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </main>
      </div>


    {/*Contenedor que mostrara las peliculas*/}
    <div className='container mt-3'>
      <div className='row'>
        {movies.map((movie)=>(
          <div key={movie.id} className='col-md-4 mb-3 border border-warning' onClick={()=>selectMovie(movie)}>
            <img src={`${URL_IMAGE + movie.poster_path}`} alt="" height={500} width='90%'/>
            <h4 className='text-center text-warning'>{movie.title}</h4>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default App
