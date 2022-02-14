import React from "react";
import { Link } from 'react-router-dom'
import './Landing.css'
import background from "../Landing/image/Purple-Eared-Pikachu-Animation-by-moxie2D-Pikachu-art-.gif"

export default function LandingPage() {
    return (
        <div className="camilitaaa">
            {/* <img className="background" src={background} /> */}
            <div className="welcomeDiv">
                <Link to='/home'>
                    <img className="landingPokeButton" src={'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1026px-Pok%C3%A9_Ball_icon.svg.png'} />
                </Link>
                <h1>Enter</h1>
            </div>
        </div>
    )
}

// con moves https://cdn.streamloots.com/uploads/5eb3db772a3fcd0035f7ff40/10172dc2-f05e-4804-948f-94ec8a1747ce.gif
