import React, { useEffect, useState } from 'react';
import './LandingPage.css'
import { useSelector } from 'react-redux';

import image1 from './pics/img1.jpg';
import image2 from './pics/img2.jpg';
import image3 from './pics/img3.jpg';
import image4 from './pics/img4.jpg';
import image5 from './pics/img5.jpg';
import image6 from './pics/img6.jpg';


const images = [image1, image2, image3, image4, image5];
const delay = 10000;

function LandingPage() {
    const sessionUser = useSelector(state => state.session.user);
    const [index, setIndex] = useState(0);
    const timeoutRef = React.useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() =>
            setIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            ), delay);
        return () => {
            resetTimeout();
        };
    }, [index]);

    return (
        <>
            {sessionUser ? (
                <div className="postlanding-body">
                    <div className="postlanding-container">
                        <div className='postlanding-texts'>
                            <div>
                                <p className='postlanding-text1'>Welcome to flickrio!</p>
                            </div >
                            <div>
                                <p className='postlanding-text2'>
                                    Feel free to explore around!
                                </p>
                            </div>
                        </div >
                        <div>
                            <img className='background-image' src={image6} alt=""></img>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='landing-container'>
                    <div className='landing-texts'>
                        <div>
                            <p className='landing-text1'>Find your cutie.</p>
                        </div >
                        <div>
                            <p className='landing-text2'>
                                Join the flickrio community, home to tens of billions of
                                <br />
                                photos and Sanrio fans.
                            </p>
                        </div>
                        <div>
                            <a href='/signup'>
                                <button className='landing-button'>Start for free</button>
                            </a>
                        </div>
                    </div >
                    <div className='landing-slideshow'>
                        <div className='landing-slideshowSlider' style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                            {images.map((image, index) => (
                                <img className='landing-slide' key={index} src={image} alt=""></img>
                            ))}
                        </div>
                    </div>
                    {/* maybe include a footer? */}
                </div >
            )
            }
        </>
    )
}

export default LandingPage;
