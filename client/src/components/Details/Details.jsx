import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../../actions/index"
import './Details.css'

export default function Details (props) {   //{name, image, type, Types, id, height, weight, attack, speed}
    console.log(props) 
    const dispatch = useDispatch()
    const params = useParams();
    const pokemonDetail = useSelector((state) => state.details)
    console.log(pokemonDetail)
    console.log('MIRA ACA')

    // useEffect(() => {
    //     dispatch(getDetail(params.id))
    //     console.log(props.match.params.id)
    // }, [dispatch])
    
    const {id} = useParams();

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(getDetail(props.match.params.id))
    //     console.log(props.match.params.id)
    // }, [dispatch])


    
    return (
        <div className="detailContainerFlex">
        <div className="card2">
            <div className="cover2">
            <h1>{pokemonDetail.name}</h1>
            <img src={pokemonDetail.image} />
            <div className='img__back2'></div>
                
            </div>
            <div className="description2">
                <div className="detailsDescFlex">
                    <div>
                    {pokemonDetail.type && pokemonDetail.type.map((el,index)=>{
                        return <p key={index}>{el}</p>
                    })}

                    {/* {pokemonDetail.Types && pokemonDetail.Types.map((el,index)=>{
                        return <p key={index}>{el.name}</p>
                    })} */}
                  
                    </div>
                </div>
                <div className="detailFlex">
                    <div className="divMargin">  
                        <h3>ID {pokemonDetail.id}</h3> 
                        <h3>Life: {pokemonDetail.hp}</h3>
                        <h3>Height: {pokemonDetail.height}</h3>
                        <h3>Weight: {pokemonDetail.weight}</h3>
                    </div>

                    <div>
                        <h3>Attack: {pokemonDetail.attack}</h3>
                        <h3>Defense: {pokemonDetail.defense}</h3>
                        <h3>Speed: {pokemonDetail.speed}</h3>
                        {/* <h3>{pokemonDetail.type.map(t => {
                            return (
                            <span>{t}</span>
                            )
                        })}</h3>  */}
                        
                    </div>
                </div>
            </div>
            <div>
                        <Link to='/home'>
                            <button className="detailbutton">Volver al home</button>
                        </Link>
                    </div>
        </div>
        
        </div>
    )
}


{/* <div className="detailContainerFlex">
                <div className="detailsCard">
                    <div className="border">
                        <div>
                        <h1>{pokemonDetail.name}</h1>
                        </div>
                    <div>
                            <img src={pokemonDetail.image} />
                           <h3>{pokemonDetail.type}</h3>
                        <h3>{pokemonDetail.type.map((t) => {
                            return (
                            <span>{t}</span>
                            )
                        })}</h3> 
                       </div>
                        <div className="detailFlex">
                          <div>  
                                <h3>ID {pokemonDetail.id}</h3> 
                                <h3>Life: {pokemonDetail.hp}</h3>
                                <h3>Height: {pokemonDetail.height}</h3>
                                <h3>Weight: {pokemonDetail.weight}</h3>
                            </div>

                            <div>
                                <h3>Attack: {pokemonDetail.attack}</h3>
                                <h3>Defense: {pokemonDetail.defense}</h3>
                                <h3>Speed: {pokemonDetail.speed}</h3>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link to='/home'>
                            <button>Volver al home!</button>
                        </Link>
                    </div>
                </div> 

            

             {
                pokemonDetail.length>0?
                <div>
                    <h1>Hello</h1>
                    <h1>Soy {pokemonDetail.name}</h1>
                </div> : 
                <p>Loading...</p>
            } 
            
         </div>  */}

                {/* <p>Loading...</p> */}
