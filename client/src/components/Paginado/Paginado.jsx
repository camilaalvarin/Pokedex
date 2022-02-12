import React from "react";
import './Paginado.css'

export default function Paginado ({allPokemons, paginado, charactersPerPage}){
    const pageNumbers = []
    
    for (let i = 0; i <= Math.ceil(allPokemons/charactersPerPage)-1 ; i++) {
        pageNumbers.push(i + 1)    
    }
    // console.log(pageNumbers)
    // console.log(characterPerPage)

    function sig () {

    }
    return(
        <nav>
            <ul >
                <button>FIRST</button>
                <button onClick={() => paginado(pageNumbers + 1)}>NEXT</button>
                {pageNumbers &&
                pageNumbers.map(number => (
                    <li key={number} >
                        <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))
                }
                <button>PREV</button>
                <button>LAST</button>
            </ul>
        </nav>
    )
}