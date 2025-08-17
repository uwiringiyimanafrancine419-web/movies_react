import { Routes, Route } from 'react-router-dom';
import MovieSection from './components/moviesection';
import MovieDetail from './components/moviedetail';

function App() {
  return (
    
      <div className="bg-gray-900 min-h-screen text-white px-4 py-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">TMDb Movies</h1>

          <Routes>
            {/* Home page with all movie sections */}
            <Route
              path="/"
              element={
                <>
                  <MovieSection title="Now Playing" endpoint="/movie/now_playing" />
                  <MovieSection title="Popular" endpoint="/movie/popular" />
                  <MovieSection title="Top Rated" endpoint="/movie/top_rated" />
                  <MovieSection title="Upcoming" endpoint="/movie/upcoming" />
                </>
              }
            />

            {/* Detail page */}
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </div>
      </div>
    
  );
}

export default App;
