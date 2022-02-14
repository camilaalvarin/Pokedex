import React from "react";
import './Paginado.css'

export default function Paginado ({allPokemons, page, pokemonsPerPage, currentPage, setCurrentPage}){
    const pageNumbers = []
    
    for (let i = 0; i <= Math.ceil(allPokemons/pokemonsPerPage)-1 ; i++) {
        pageNumbers.push(i + 1)    
    }
    console.log('pageNumbersPAGE')
    console.log(pageNumbers)
    console.log('pageNumbersPAGE')

    

    return(
        <nav>
            <ul >
                {pageNumbers &&
                pageNumbers.map(number => (
                    <li key={number} >
                        <a onClick={() => page(number)}>{number}</a>
                    </li>
                ))
                }
            </ul>
        </nav>
    )
}