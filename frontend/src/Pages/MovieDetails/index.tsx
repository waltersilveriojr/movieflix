import { AxiosRequestConfig } from "axios";
import { useParams } from "react-router";
import { useEffect, useState, useCallback } from "react";
import { requestBackend } from "util/requests";
import { useForm } from "react-hook-form";
import ReviewCard from "Components/ReviewCard";
import { hasAnyRoles } from "util/auth";
import { Review } from "Types/Review";
import { Movie } from "Types/Movie";
import MovieCard from "Components/MovieCard";
import LoaderDetail from "./LoaderDetail";
import { toast } from 'react-toastify';

import "./styles.css";

type FormData = {
  movieId: number;
  text: string;
};

const MovieDetails = () => {
  type UrlParams = {
    movieId: string;
  };

  const { movieId } = useParams<UrlParams>();
  const [movie, setMovie] = useState<Movie>();

  const [review, setReview] = useState<Review[]>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormData>();

  const formClear = () => {
    setValue('text','');
  }

  const [isLoading, setIsLoading] = useState(false);

  const loadReviews = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movie?.id}/reviews`,
      withCredentials: true,
    };
    requestBackend(params).then((response) => {
      setReview(response.data);
    });
  }, [movie]);

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/movies/${movieId}`,
      withCredentials: true,
    };
    setIsLoading(true);
    requestBackend(config).then((response) => {
      setMovie(response.data);
      setIsLoading(false);
    });
  }, [movieId]);

  useEffect(() => {
     loadReviews();
  }, [loadReviews]);

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);

    console.log(formData);
    const params: AxiosRequestConfig = {
      url: "/reviews",
      withCredentials: true,
      method: "POST",
      data: formData,
    };

    requestBackend(params)
      .then((Response) => {
        toast.info('Avaliacão inserida com sucesso');
        loadReviews();
        formClear();
      })
      .catch((error) => {
        toast.error('Erro gravando avaliação');
      });
  };

  return (
    <div className="container-main">
      {isLoading ? (
        <div>
          <LoaderDetail></LoaderDetail>
        </div>
      ) : (
        <>
          <div>
            <MovieCard movie={movie ? movie : null} synopsis={true}></MovieCard>
          </div>
          {hasAnyRoles(["ROLE_MEMBER"]) && (
            <div className="base-card form-card-review">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input
                    {...register("text", {
                      required: "Campo Obrigatório!",
                    })}
                    type="text"
                    className={`form-control form-input ${
                      errors.text ? "is-invalid" : ""
                    } `}
                    placeholder="Deixe sua avaliação aqui"
                    name="text"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.text?.message}
                  </div>
                </div>
                <div className="form-review-submit">
                  <button className="btn">SALVAR AVALIAÇÃO</button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
      {review?.length && (
        <div className="base-card card-reviews">
          {review?.map((item) => (
            <ReviewCard
              userName={item.user.name}
              description={item.text}
              key={item.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
