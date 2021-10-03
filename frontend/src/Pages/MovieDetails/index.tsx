import { AxiosRequestConfig } from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { requestBackend } from "util/requests";
import { useForm } from "react-hook-form";
import ReviewCard from "Components/ReviewCard";
import { hasAnyRoles } from "util/auth";
import { Review } from "Types/Review";

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

  const [review, setReview] = useState<Review[]>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setReview(response.data);
      setIsLoading(false)
    });
  }, [movieId]);

  const onSubmit = (formData: FormData) => {

    formData.movieId = parseInt(movieId);

    console.log(formData);
    const params: AxiosRequestConfig = {
      url: "/reviews",
      withCredentials: true,
      method: "POST",
      data: formData,
    };
    setIsLoading(true);

    requestBackend(params)
      .then((Response) => {
        review?.push(Response.data);
        setReview(review);
        setIsLoading(false);
      })
      .catch((error) => {
      });
  };

  return (
    <div className="container-main">
      <div className="card-title">
        <h1>{`Tela detalhes do filme id: ${movieId}`}</h1>
      </div>
      {hasAnyRoles(["ROLE_MEMBER"]) && (
        <div className="base-card form-card-review">
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="mb-3">
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
      {!isLoading && (
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
