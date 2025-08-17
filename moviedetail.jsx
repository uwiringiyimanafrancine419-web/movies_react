import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_KEY = '97bdc7b10ddcf79c1f105dd2812bff9b';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        const data = await res.json();
        setMovie(data);

        const videoRes = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
        const videoData = await videoRes.json();
        const trailer = videoData.results.find(
          v => v.type === 'Trailer' && v.site === 'YouTube'
        );
        setTrailerKey(trailer?.key);
      } catch (err) {
        console.error('Error fetching movie detail:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieData();
  }, [id]);

  if (loading) return <div className="text-white p-10">Loading...</div>;
  if (!movie || movie.success === false) return <div className="text-red-500 p-10">Movie not found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={IMG_BASE + movie.poster_path}
          alt={movie.title}
          className="w-full md:w-1/3 rounded shadow"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400 mb-4">
            Release: {movie.release_date} | Rating: {movie.vote_average}
          </p>
          <p>{movie.overview}</p>

          {trailerKey && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Watch Now</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="Trailer"
                  allowFullScreen
                  className="w-full h-96 rounded"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
