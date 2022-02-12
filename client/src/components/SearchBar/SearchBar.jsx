import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../actions";
import './Searchbar.css'

export default function SearchBar () {
    const dispatch = useDispatch();
    const [name, setName] = useState('')

    function onChange (e) {
        e.preventDefault();
        setName(e.target.value)
    }

    // const onClick = (e) => {
    //     e.preventDefault();
    //     dispatch(getByName(name))
    // }
    const onClick = (e) => {
        e.preventDefault();
        if (name.length === 0) {
          return alert("Please input a name to start the search");
        } else {
          dispatch(getByName(name));  
          setName("");
        }
    }

    return (
        <div>
            <input type='text' placeholder="Buscar Pokémon..." onChange={onChange} />
            <button className="goButton" type='submit' onClick={onClick}>GO!</button>
        </div>
    )
}