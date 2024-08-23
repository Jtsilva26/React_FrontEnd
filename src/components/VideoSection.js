import React from "react";
import { Button } from "./Button";
import '../App.css';
import './VideoSection.css';

function VideoSection() {
    return (
        <div className="video-container">

            <video src="/videos/mountain.mp4" autoPlay loop muted />

            <h1>JOIN OUR TEAM</h1>
            <p>"Together, we'll find solutions</p>
            <div className="video-btns">
                <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>
                    GET STARTED
                </Button>
            </div>
        </div>
    )
}

export default VideoSection;