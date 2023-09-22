
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';

import MovieList from './MovieList';
import * as sakilaApi from './sakilaApi';
import MovieDetail from './MovieDetail';
import FilmsByCategoryList from './FilmsByCategoryList';
import * as ReactDOM from 'react-dom';
import './styles/Movie.css';
import { ErrorBoundary } from 'react-error-boundary';

function Movie(props) {

    const movie = props.movie;
    var imagePath;

    try {

        imagePath = require(`./assets/posters/${movie.title}.png`);
    }
    catch (e) {

        imagePath = require(`./assets/posters/title.png`);
    }

    return (
        <ErrorBoundary>
            <Link to={'/movie/' + movie.film_id}>
                <div id={"movie-" + movie.film_id} key={movie.id} className='movie'>

                    <div className="movie__thumbnail">
                        <img
                            src={imagePath}
                            alt={movie.title}
                            className="thumbnail" />
                    </div>

                    <div class="movie-title-parent">
                        <div class="movie-title">
                            <p>{movie.title}</p>
                        </div>
                    </div>

                </div>
            </Link>
        </ErrorBoundary>
    )
}

export default Movie;