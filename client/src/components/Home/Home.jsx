import React from "react";
import {Link} from "react-router-dom";
import { useState , useEffect } from "react"; 
import {useDispatch,useSelector} from "react-redux";
import {getAllPokemons, orderByName, orderByAttack, filterByOrigin, getTypes, filterByTypes } from "../../actions/index"; 
import Card from "../Card/Card";
import './HomeStyles.css'
import Paginado from "../Paginado/Paginado"
import SearchBar from "../SearchBar/SearchBar";

export default function Home(){

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    // const allTypes = useSelector((state) => state.type);
    const types = useSelector((state) => state.type)
    console.log(types)
    const [orden,setOrden] = useState('');
    const [ordenAttack,setOrdenAttack] = useState('');

    // PAGINADO
    const [currentPage,setCurrentPage] = useState(1)
    const [charactersPerPage,setCharactersPerPage] = useState(12)
    const indexOfLastCharacter = currentPage * charactersPerPage //6
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage //0
    const currentCharacters = allPokemons.slice(indexOfFirstCharacter,indexOfLastCharacter)
    console.log(currentCharacters)
    // pagina    primer indice    ultimo indice
    //    1           0                 6            6 personajes
    //    2           6                 13           6 personajes y asi hasta terminar paginado
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    // --------------------
    // HACIENDO BOTONES NEXT Y PREV

    let actual = currentPage;

    function next (){
        setCurrentPage(actual + 1)
    }

    function prev (){
        setCurrentPage(actual - 1)
    }

    function last (){
        setCurrentPage(4)
    }

    function first (){
        setCurrentPage(1)
    }

    // let lastPage = Math.ceil(allPokemons/charactersPerPage) 
    // let lastPageother = allPokemons + charactersPerPage
    // console.log('lasPage' + lastPage)
    // console.log('lasPage' + lastPageother)
    
    // FIN PAGINADO

    useEffect(() => {
        dispatch(getAllPokemons());
        dispatch(getTypes());
    },[dispatch])

    // const onClick = (e) => {
    //     e.preventDefault();
    //     dispatch(getAllPokemons())
    // }

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
        // setOrdenAttack(`Ordenado ${e.target.value}`)
    }

    function handleClick (e){
        e.preventDefault();
        dispatch(getAllPokemons());
    }

    // function filterType(e){
    //     dispatch(getTypes(e.target.value));
    // }
    
    function handleFilterByTypes(e) {
        dispatch(filterByTypes(e.target.value));
        setCurrentPage(1);
    }


    return (
        <div>
            <h1>Pokedexxx</h1>

            <SearchBar />

            <select onChange={e => {orderByNames(e)}}>
                <option value='asc'>Ascendente</option>
                <option value='desc'>Descendente</option>
            </select>
            <select onChange={e => {orderByAttacks(e)}}>
                {/* <option value='all'>Todos</option> */}
                <option value='maxAttack'>Stronger to Weaker</option>
                <option value='minAttack'>Weaker to Stronger</option>
            </select>
            
            <select onChange={e => {filteredByOrigin(e)}}>
                <option value='all'>Todos</option>
                <option value='db'>Creados</option>
                <option value='api'>Existentes</option>
            </select>

            <select onChange={(e) => {handleFilterByTypes(e)}}>
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
            <button className="refreshButton" onClick={(e) => handleClick(e)} >Refresh!</button> 

                
                {/* 
                <select>
                    <option value='all'>Todos</option>
                    <option value='alive'>Vivos</option>
                    <option value='deceased'>Muertos</option>
                    <option value='unknown'>Desconocido</option>
                    <option value='presumeddead'>Probablemente muerto</option>
                </select>
            */}
            
            
            <div  className="father-flex">
            {  currentCharacters?.map(el => {
                        return (<div>
                                <Link to={"/home/" + el.id}>
                                    <Card name={el.name} image={el.image} type={el.type} Types={el.Types} key={el.id}/>
                                </Link>
                            </div>
                        )
                })
            }
            </div>
            
            <button type="button" disabled={currentPage === 1} onClick={first}>FIRST</button>
            <button type="button" disabled={currentPage === 1} onClick={prev}>PREV</button>
            <button type="button" disabled={currentPage === 4} onClick={next}>NEXT</button>
            <button type="button" disabled={currentPage === 4} onClick={last}>LAST</button>
            <Paginado
            charactersPerPage={charactersPerPage}
            allPokemons={allPokemons.length}
            paginado={paginado}
            />
            {/* <SearchBar /> */}
        </div>
    )
}
