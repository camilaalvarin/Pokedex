import React from "react";
import './CardStyles.css'

export default function Card ({name, image, type, Types}) {

     let letra = name    // .toUpperCase()
    return (

        <div className="card">
            <div className="cover">
                <img src={image} alt="img not found" />
                {/* <div className={type[0] === 'fire' ? 'img__back2' : 'img__back'}></div> */}
                {/* <div className={type[0] === 'water' ? 'camilaaa' : 'img__back'}></div> */}

                {/* de guille ↓ */}
                {/* className={(style === 'glass') ? 'glass' : '' */}
                <div className='img__back'></div>
                {/* <div className={(type[0] === 'fire') ? 'img__back' : 'camilaaap'}></div> */}
                {/* <div className={(type[0] === 'grass') ? 'camilaaap' : ''}></div> */}
                
                {/* {
                    type === 'fire' ? 
                    <div className='img__back'></div> :
                    <div className='img__back2'></div>
                } */}

                
            </div>
            <div className="description">
                <h3>{letra}</h3>
                <div>
                    <div className="descriptionTypes">
                        {type && type.map((el,index)=>{
                            return <p key={index}>{el}</p>
                        })}

                        {/* {Types && Types.map((el,index)=>{
                            return <p key={index}>{el.name}</p>
                        })} */}
                    </div>
                </div>

                
                {/* <input type="button" value="Leer Más" /> */}
            </div>
        </div>
    )
} 
