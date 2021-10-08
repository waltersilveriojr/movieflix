import { Movie } from "Types/Movie";
import "./styles.css";

type Props = {
  movie: Movie | null;
  synopsis?: boolean;
};

const MovieCard = ({ movie, synopsis }: Props) => {
  return (
    <div
      className={`base-card${
        synopsis ? " card-movie-container-review" : " card-movie-container"
      }`}
    >
      <div
        className={`${
          synopsis ? " card-movie-image-review" : "card-movie-image"
        }`}
      >
        <img src={movie?.imgUrl} alt="Imagem Filme" />
      </div>
      <div className={`${
              synopsis ? "movie-content-container" : ""}`}>
        <div
          className={`${
            synopsis
              ? " mg-l-card-movie-title-container"
              : "card-movie-title-container"
          }`}
        >
          <h1
            className={`${
              synopsis ? "card-movie-title-review" : "card-movie-title"
            }`}
          >
            {movie?.title}
          </h1>
          <div
            className={`${
              synopsis ? "card-movie-subtitle-review" : "card-movie-subtitle"
            }`}
          >
            <h1>{movie?.year}</h1>
            <p>{movie?.subTitle}</p>
          </div>
        </div>
        <div>
          {synopsis && (
            <div className="card-movie-synopsis">
              <h1>{movie?.synopsis}</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
