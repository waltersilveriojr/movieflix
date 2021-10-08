import { AxiosRequestConfig } from "axios";
import MovieCard from "Components/MovieCard";
import MovieFilter, { MovieFilterData } from "Components/MovieFilter";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { Movie } from "Types/Movie";
import { SpringPage } from "Types/Vendor/spring";
import { requestBackend } from "util/requests";
import Pagination from "Components/Pagination";
import CardLoader from "./CardLoader";

import "./styles.css";

type ControlComponentsData = {
  activePage: number;
  filterData: MovieFilterData;
};

const Movies = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();
  const [controlComponentsData, setcontrolComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { genre: null },
    });
  const [isLoading, setIsLoading] = useState(false);

  const getMovies = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: "/movies",
      withCredentials: true,
      params: {
        page: controlComponentsData.activePage,
        size: 4,
        genreId: controlComponentsData.filterData.genre?.id,
      },
    };
    setIsLoading(true);
    requestBackend(config)
      .then((Response) => {
        setPage(Response.data);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [controlComponentsData]);

  const handlePageChange = (pageNumber: number) => {
    setcontrolComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
  };

  const handleSubmitFilter = (data: MovieFilterData) => {
    setcontrolComponentsData({ activePage: 0, filterData: data });
  };

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="movies-container">
      <div className="movies-filter-container">
        <MovieFilter onSubmitFilter={handleSubmitFilter}></MovieFilter>
      </div>
      {isLoading ? (
        <CardLoader></CardLoader>
      ) : (
        <>
          <div className="row">
            {page?.content.map((movie) => (
              <div className="col-xs-12 col-sm-6 col-xl-3" key={movie.id}>
                <Link to={`/movies/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              </div>
            ))}
          </div>
          <div className="row movie-pagination">
            <Pagination
              forcePage={page?.number}
              pageCount={page ? page.totalPages : 0}
              range={3}
              onChange={handlePageChange}
            ></Pagination>
          </div>
        </>
      )}
    </div>
  );
};

export default Movies;
