import PropType from "prop-types";
import { useState } from "react";
import YouTube from "react-youtube";
import Modal from 'react-modal';
const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

const MovieSearch = ({ title, data }) => {
    const [modalIsOpen, setMModalIsOpen] = useState(false);
    const [ trailerKey , setTrailerKey] = useState("");
    const handelTrailer = async(id)=> {
        setTrailerKey('')
        try{
         const url= `https://api.themoviedb.org/3/movie/${id}/videos?language=en&api_key=9cb1e7c7225d4ac198e35371206ae638`;
          const options = {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2IxZTdjNzIyNWQ0YWMxOThlMzUzNzEyMDZhZTYzOCIsIm5iZiI6MTczMjA5NDE5MS40NTMwMjM0LCJzdWIiOiI2NzNjYjRmYzUwNmRlZTdjMWEwNTY2YzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.9KLtiV2jiJLwLfJL_5iBDJkVusc1I13k2GUpzrJQ9ds',
            },
          }; 
          const movieKey = await fetch (url , options);
          const data = await movieKey.json();
          setTrailerKey(data.results[0].key)
          setMModalIsOpen(true)
    
          
        }catch(error) {
          setMModalIsOpen(false)
          console.log(error)
          
        }
      }
  return (
    <div className="text-white p-10 mb-10">
      <h2 className="uppercase text-xl mb-4">{title}</h2>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{data &&
        data.map((item) => (
          <div
            key={item.id}
            className="w-[200px] h-[300px] relative group "
            onClick={() => handelTrailer(item.id)}
          >
            <div
              className="group-hover:scale-105
              transition-transform duration-500 ease-in-out w-full h-full cursor-pointer"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-black/40" />
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
                className="w-full h-full object-cover "
              />
              <div className="absolute bottom-3 left-11">
                <p className="upercase text-md  text-white">
                  {item.title || item.original_title}
                </p>
              </div>
            </div>
          </div>
          
        ))}</div>
        <Modal
        isOpen={modalIsOpen}
     
        onRequestClose={()=>setMModalIsOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            zIndex: 9999,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        
        contentLabel="Example Modal">
        <YouTube videoId={trailerKey} opts={opts} />;
      </Modal>
      
    </div>
  );
};
MovieSearch.prototype = {
  title: PropType.string,
  data: PropType.array,
};

export default MovieSearch;
