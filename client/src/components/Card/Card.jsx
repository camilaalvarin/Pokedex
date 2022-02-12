import React from "react";
import './CardStyles.css'

export default function Card ({name, image, type}) {

    let letra = name.toUpperCase()
    return (

        <div className="card">
            <div className="cover">
                <img src={image} alt="img not found" />
                {/* <div className={type === 'fire' ? 'img__back' : 'img__back2'}></div> */}
                <div className='img__back'></div>
                
                {/* {
                    type === 'fire' ? 
                    <div className='img__back'></div> :
                    <div className='img__back2'></div>
                } */}

                
            </div>
            <div className="description">
                <h3>{letra}</h3>
                <h4>{type}</h4>
                {/* <input type="button" value="Leer Más" /> */}
            </div>
        </div>
        // <div className="cardStyl">
        //     <img src={image} alt="img not found" width="200px" height="250px" />
        //     <h3>{name}</h3>
        //     <h5>{type}</h5>
        // </div>
    )
} 

// export function camila () {
//     <div class="container__cards">

//         <div className="card">
//             <div className="cover">
//                 <img src={image} alt="img not found" />
//                 <div className="img__back"></div>
//             </div>
//             <div claclassName="description">
//             <h3>{name}</h3>
//                 <p> <b>Types</b> </p>
//                 <h5>{type}</h5>
//                 <input type="button" value="Leer Más" />
//             </div>
//         </div>
//         </div>
// }