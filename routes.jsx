import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetail from "./components/moviedetail";
import MovieSection from '.components/moviesection'; // your current component

function App() {
  return (
    <Router>
      
        <Route path="/" element={<MovieSection title="Popular" endpoint="/movie/popular" />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      
    </Router>
  );
}

export default App;
