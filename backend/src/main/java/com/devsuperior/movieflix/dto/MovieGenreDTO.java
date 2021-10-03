package com.devsuperior.movieflix.dto;

import com.devsuperior.movieflix.entities.Movie;

public class MovieGenreDTO extends MovieDTO {

	private static final long serialVersionUID = 1L;

	private String synopsis;
	private GenreDTO genre;
	
	public MovieGenreDTO() {
		// TODO Auto-generated constructor stub
	}
	
	
	public MovieGenreDTO(String synopsis) {
		super();
		this.synopsis = synopsis;
	}
	
	
	public MovieGenreDTO(Movie entity) {
		super(entity);
		synopsis = entity.getSynopsis();
		genre = new GenreDTO(entity.getGenre());
	}

	public String getSynopsis() {
		return synopsis;
	}

	public void setSynopsis(String synopsis) {
		this.synopsis = synopsis;
	}
	
	public GenreDTO getGenre() {
		return genre;
	}

	public void setGenre(GenreDTO genre) {
		this.genre = genre;
	}
}
