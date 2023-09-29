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
    var [rating, setRating] = useState({});
    var [runTimeString, setRunTimeString] = useState('');
    var [starringString, setStarringString] = useState('');
    var [loading, setLoading] = useState(true);


    useEffect(() => {

        sakilaApi.getById(sakilaApi.Entities.Film, id).then((movie) => {

            var imagePath;
            try {

                imagePath = require(`./assets/posters/${movie.title}.png`);
            }
            catch (e) {

                imagePath = require(`./assets/posters/title.png`);
            }

            const adjective = movie.description.split(" ")[1];

            const bg = require(`./assets/backgrounds/${adjective}.jpg`);
            const ratingImg = require(`./assets/ratings/${movie.rating}.svg`);

            const starringString = 'Starring: ' + movie.actors.map((a) => a.firstName + ' ' + a.lastName).join(', ');


            const runTimeInt = movie.length;
            const h = Math.floor(runTimeInt / 60);
            const m = runTimeInt - h * 60;
            var s = '';
            if (h == 0) s = m + 'm';
            else s = h + 'h ' + m + 'm';

            setRunTimeString(s);
            setMovie(movie);
            setBg(bg);
            setImg(imagePath);
            setRating(ratingImg);
            setStarringString(starringString);
            setLoading(false);
        })

    }, []);


    return !loading && (
        <div id="movie-detail-container" class="movie-detail-container" style={{ backgroundImage: `url(${bg})` }} >
            <div className='movie-detail-shadow'>

                <div class='movie-detail-left'>

                    <div class="movie-static-container">
                        <img class="movie-static" src={img} />
                    </div>
                </div>

                <div className='movie-detail-right'>

                    <div className='title-and-description'>
                        <div style={{ 'display': 'inline' }}>
                            <h1 class="title">{movie.title}</h1>
                            <p class="runTime">{() => movie.release_year.substring(0, 4)}</p>
                        </div>
                        <p class="description">{movie.description}</p>
                        <p class="starring">{starringString}</p>

                        <div>
                            <img src={rating} class="rating" />
                            <p class="runTime">{runTimeString}</p>
                        </div>
                        <div className='rent-buttons'>
                            <Link to={"/checkout/" + movie.filmId}>
                                <div className='button'>
                                    Rent Now for £{movie.rentalRate}
                                </div>

                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div >

    );
}




export default MovieDetail;