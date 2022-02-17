import React from "react";
import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getByName } from "../../actions";
import './Searchbar.css'

export default function SearchBar () {
    const dispatch = useDispatch();
    const [name, setName] = useState('')

    const estado = useSelector((state) => state.allPokemons)

    function onChange (e) {
        e.preventDefault();
        setName(e.target.value)
    }
    const onClick = (e) => {
        e.preventDefault();
        if (name.length === 0) {
          return alert("Hay que ingresar un nombre");
        } 
        else {
          dispatch(getByName(name)); 
        }
    }


    return (
        <form>
            <input type='text' placeholder="Buscar Pokémon..." onChange={onChange} />
            <button className="goButton" type='submit' onClick={onClick}>GO!</button>
        </form>
    )
}