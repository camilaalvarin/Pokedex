import React from "react";
import {Link} from "react-router-dom";
import { useState , useEffect } from "react"; 
import {useDispatch,useSelector} from "react-redux";
import {getAllPokemons, orderByName, orderByAttack, filterByOrigin, getTypes, filterByTypes } from "../../actions/index"; 
import Card from "../Card/Card";
import './HomeStyles.css'
import Paginado from "../Paginado/Paginado"
import SearchBar from "../SearchBar/SearchBar";
import Loading from '../Loading/Loading'
import Logo from '../Landing/image/Pokémon_Logo.png'

export default function Home(){

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const types = useSelector((state) => state.type)
    console.log(types)
    const [orden,setOrden] = useState('');
    const [ordenAttack,setOrdenAttack] = useState('');

    // PAGINADO
    const [currentPage,setCurrentPage] = useState(1)
    const [pokemonsPerPage,setPokemonsPerPage] = useState(12)
    const indexOfLastPokemon = currentPage * pokemonsPerPage //12
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage //0
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon,indexOfLastPokemon)
    // pagina    primer indice    ultimo indice
    //    1           0                 6            6 personajes
    //    2           6                 13           6 personajes y asi hasta terminar paginado
    const page = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    // --------------------
    // HACIENDO BOTONES NEXT Y PREV

    console.log('allPokemons')
    let allPok =  allPokemons.length
    console.log(allPok)
    console.log('allPokemons')
    console.log('pokemonsPerPage')
    console.log(pokemonsPerPage)
    console.log('pokemonsPerPage')
    console.log('camilita')
    let camilita =  allPok/pokemonsPerPage;
    console.log(camilita)
    console.log('camilita')

    // -------------------------------------

    useEffect(() => {
        dispatch(getAllPokemons());
        dispatch(getTypes());
        // dispatch(filtroPorTipos());
    },[dispatch])

    // -------------------------------------

  
    
    // FIN PAGINADO


    const orderByNames = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setOrden(`Ordenado ${e.target.value}`)
    }
    const orderByAttacks = (e) => {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value))
        setOrdenAttack(`Ordenado ${e.target.value}`)
    }
    const filteredByOrigin = (e) => {
        e.preventDefault();
        dispatch(filterByOrigin(e.target.value))
    }

    function handleClick (e){
        e.preventDefault();
        dispatch(getAllPokemons());
    }
    
    function handleFilterByTypes(e) {
        dispatch(filterByTypes(e.target.value));
        setCurrentPage(1);
    }


    return (
        <div className="backgroundHome">
            <div className="logoDiv">
                <img className="Logo" src={Logo} width='350px' />
            </div>
            <SearchBar />

            <select className="homeSelect" onChange={e => {orderByNames(e)}}>
                <option value='asc'>Asc AZ</option>
                <option value='desc'>Desc ZA</option>
            </select>
            <select className="homeSelect" onChange={e => {orderByAttacks(e)}}>
                <option value='maxAttack'>Stronger to Weaker</option>
                <option value='minAttack'>Weaker to Stronger</option>
            </select>
            
            <select className="homeSelect" onChange={e => {filteredByOrigin(e)}}>
                <option value='all'>All</option>
                <option value='db'>Created</option>
                <option value='api'>Existentes</option>
            </select>

            <select className="homeSelect" onChange={(e) => {handleFilterByTypes(e)}}>
                    <option value="all">Types / Show All</option>
                    {types
                    .sort((a, b) => {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                    })
                    .map((t) => (
                        <option value={t.name.toLowerCase()} key={t.name}>
                        {t.name.toLowerCase()}
                        </option>
                    ))}
                </select>
                <br />
            <Link to='/pokemon'>
                <input type='submit' className="crear" value='Crear Pokemon!' />
            </Link>
            <button className="loadAllButton" onClick={(e) => handleClick(e)} >Load all pokémons</button> 
            
            <div  className="father-flex">
            {
            !currentPokemons.length?
                    <Loading /> :
            currentPokemons.map(el => {     
                        return (<div key={el.id}>
                                <Link to={"/home/" + el.id}>
                                    <Card name={el.name} image={el.image} type={el.type} key={el.id}/> 
                                </Link>
                            </div>
                        )
                })
            }
            </div>
            <div className="paginadoContainer">
               
                <div className="paginadoPages">
                    <Paginado
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    page={page}
                    />
                </div>
            </div>
        </div>
    )
}
