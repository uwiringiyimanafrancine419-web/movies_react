import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

const API_KEY = '97bdc7b10ddcf79c1f105dd2812bff9b'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500/';

export default function MovieSection({ title, endpoint }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setMovies(data.results))
      .catch(err => console.error(`Error fetching ${title}:`, err));
  }, [endpoint]);

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map(movie => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={IMG_BASE + movie.poster_path}
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold">{movie.title}</h3>
              <p className="text-xs text-gray-400">Rating: {movie.vote_average}</p>
             <Link
  to={`/movie/${movie.id}`}
  className="text-blue-400 hover:underline text-xs mt-1 inline-block"
>
  View Details
</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
