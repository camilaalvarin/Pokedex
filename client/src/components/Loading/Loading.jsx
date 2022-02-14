import React from "react";
import './loading.css';
import LoadingImg from '../Card/image/loading3.gif'

export default function Loading(){
    return(
        <div>
            <div className='loading'></div>
            <h2>Loading Pokemon...</h2>
            <img src={LoadingImg}/>
        </div>
    )
}