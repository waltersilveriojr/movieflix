import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Genre } from "Types/Genre";
import { requestBackend } from "util/requests";

import "./styles.css";

export type MovieFilterData = {
  genre: Genre | null;
};

type Props = {
  onSubmitFilter: (data: MovieFilterData) => void;
};

const MovieFilter = ({ onSubmitFilter }: Props) => {
  const [selectGenre, setSelectGenre] = useState<Genre[]>([]);

  const { register, handleSubmit, setValue, getValues, control } =
    useForm<MovieFilterData>();

  const onSubmit = (formData: MovieFilterData) => {
    onSubmitFilter(formData);
  };

  const handleChangeGenre = (value: Genre) => {
    setValue("genre", value);

    const obj: MovieFilterData = {
      genre: getValues("genre")
    };
    onSubmitFilter(obj);
  };

  useEffect(() => {
    requestBackend({
      method: "GET",
      url: "/genres",
      withCredentials: true,
    }).then((response) => {
      setSelectGenre(response.data);
    });
  }, []);

  return (
    <div className="base-card movie-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="movie-form-container">
        <Controller
          name="genre"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={selectGenre}
              isClearable
              placeholder="Gêneros"
              classNamePrefix="movie-filter-select"
              onChange={(value) => handleChangeGenre(value as Genre)}
              getOptionLabel={(genre: Genre) => genre.name}
              getOptionValue={(genre: Genre) => String(genre.id)}
            />
          )}
        />
      </form>
    </div>
  );
};

export default MovieFilter;
