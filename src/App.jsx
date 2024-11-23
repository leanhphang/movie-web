import { useState, useEffect } from "react";
import Header from "./component/Header";

import Banner from "./component/Banner";
import MovieList from "./component/MovieList";
import MovieSearch from "./component/MovieSearch";


const App = () => {
  const [movie, setMovie] = useState([]);
  const [movieRate, setMovieRate] = useState([]);
  const [movieSearch, setMovieSearch] = useState([]);

  const handleSearch = async (searchVal) =>{
    // setMovieSearch([])
    try{
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchVal}&include_adult=false&language=vi&page=1&api_key=9cb1e7c7225d4ac198e35371206ae638`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2IxZTdjNzIyNWQ0YWMxOThlMzUzNzEyMDZhZTYzOCIsIm5iZiI6MTczMjI1MTY3NS4yOTUxODIyLCJzdWIiOiI2NzNjYjRmYzUwNmRlZTdjMWEwNTY2YzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.cGtdtnqs9lPNSdfWgZBY2kgkeF7FvVgoBLTKQHja6Kg",
        },
      };
      const searchMovie = await fetch (url,options);
      const data = await searchMovie.json();
      setMovieSearch(data.results)
    }catch(error){
      console.log(error)

    }
  }
  useEffect(() => {
    const fetchMovie = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2IxZTdjNzIyNWQ0YWMxOThlMzUzNzEyMDZhZTYzOCIsIm5iZiI6MTczMjA5NDE5MS40NTMwMjM0LCJzdWIiOiI2NzNjYjRmYzUwNmRlZTdjMWEwNTY2YzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.9KLtiV2jiJLwLfJL_5iBDJkVusc1I13k2GUpzrJQ9ds',
        },
      };

      const url1 =
        "https://api.themoviedb.org/3/movie/popular?api_key=e9e9d8da18ae29fc430845952232787c&language=vi&page=1 ";
      const url2 =
        "https://api.themoviedb.org/3/movie/top_rated?api_key=e9e9d8da18ae29fc430845952232787c&language=vi&page=1";
      const [res1, res2] = await Promise.all([
        fetch(url1, options),
        fetch(url2, options),
      ]);
      const data1 = await res1.json ();
      const data2 = await res2.json();
      setMovie(data1.results);
      setMovieRate(data2.results);
      console.log(data1);
      
    };
    fetchMovie();
  }, []);

  return (
    <>
      <div className="bg-black pb-10">
        <Header  onSearch={handleSearch}/> 
        <Banner />
        {movieSearch.length > 0 ?
          <MovieSearch title={"kết quả tìm kiếm"} data= {movieSearch} />
         :( 
          <> <MovieList title={"Phim Hot"} data={movie} />
          <MovieList title={"Phim Đề Cử"} data={movieRate} />
          </>)}
       
      </div>
    </>
  );
};
export default App;
