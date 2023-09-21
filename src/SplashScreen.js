
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';

import './styles/SplashScreen.css';
import ClipLoader from "react-spinners/ClipLoader";
import useSound from 'use-sound'
import mySound from './assets/sound.mp3'

function SplashScreen({ escape: escape }) {

    const [isLoading, setIsLoading] = useState(true);
    const [clicks, setClicks] = useState(0);
    const [playSound] = useSound(mySound)

    const audio = new Audio('')
    const logo = require(`./assets/logo.png`);

    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false);
        }, 1500);

    }, []);

    function onClick() {
        setClicks(clicks + 1);
        if (clicks == 2) playSound();
    }

    return (
        <div onClick={(e) => onClick()} style={{ 'height': '100vh', 'width': '100%', 'backgroundColor': 'black' }}>
            <button id="skip-intro-button" style={{ 'width': 0, 'height': 0, 'opacity': 0 }} onClick={(e) => escape()} />

            {isLoading &&
                (<div style={{ 'position': 'absolute', 'top': '360px', 'right': '875px' }}>
                    <ClipLoader
                        color={'red'}
                        loading={true}
                        size={150}
                        data-testid="loader"
                    />
                </div>)}

            {!isLoading &&


                (<div style={{ 'position': 'absolute', 'top': '360px', 'right': '675px' }}>
                    <img className='bounce' width={600} src={logo} />
                </div>)}



        </div>
    );
}

export default SplashScreen;