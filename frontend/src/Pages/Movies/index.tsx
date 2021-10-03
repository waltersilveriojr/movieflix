import { Link } from "react-router-dom";
import "./styles.css";

const Movies = () => {
  return (
    <div className="movies-main">
      <div className="movies-title">
        <h1>Tela listagem de filmes</h1>
      </div>
      <div className="movies-list">
        <Link to="/movies/1">
          <a href="#link">Acessar /movies/1</a>
        </Link>
        <Link to="/movies/2">
          <a href="#link">Acessar /movies/2</a>
        </Link>
      </div>
    </div>
  );
};

export default Movies;
