// MovieList.js
import React, { useEffect, useState } from 'react';
import './styles/MovieDetail.css';
import * as sakilaApi from './sakilaApi';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'bootstrap';



function MovieDetail() {

    const { id } = useParams();

    var [movie, setMovie] = useState({});
    var [bg, setBg] = useState({});
    var [img, setImg] = useState({});
    var [starringString, setStarringString] = useState('');


    useEffect(() => {

        sakilaApi.getById(sakilaApi.Entities.Film, id).then((movie) => {

            const imagePath = require(`./assets/posters/${movie.title}.png`);
            const adjective = movie.description.split(" ")[1];

            const bg = require(`./assets/backgrounds/${adjective}.jpg`);

            const starringString = 'Starring: ' + movie.actors.map((a) => a.first_name + ' ' + a.last_name).join(', ');

            setMovie(movie);
            setBg(bg);
            setImg(imagePath);
            setStarringString(starringString);
        })

    }, []);


    return (
        <div class="movie-detail-container" style={{ backgroundImage: `url(${bg})` }} >
            <div className='movie-detail-shadow'>

                <div class='movie-detail-left'>

                    <img class="movie-static" src={img} />
                </div>

                <div className='title-and-description'>

                    <h1 class="title">{movie.title}</h1>
                    <p class="description">{movie.description}</p>
                    <p class="starring">{starringString}</p>

                    <Link to={"/checkout/" + movie.film_id}>
                        <div className='button'>
                            Rent Now for {movie.rental_rate}
                        </div>

                    </Link>
                </div>
            </div>

        </div >

    );
}




export default MovieDetail;