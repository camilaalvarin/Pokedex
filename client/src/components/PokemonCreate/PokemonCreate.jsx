import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { postPokemon, getType } from "../../actions";
import './pokemoncreate.css'

export default function PokemonCreate () {
    const disptach = useDispatch()
    const types = useSelector((state) => state.type)

    const [input, setInput] = useState({
        name: '',
        image: '',
        hp: '1',
        attack: '1',
        defense: '1',
        speed: '1',
        height: '1',
        weight: '1',
        type: []
    })

    console.log(input)

    useEffect(() => {
        disptach(postPokemon())
        // disptach(getType())
    }, [])

    const [errors, setErrors] = useState({})

    
        let activeButton = true
        if ( !input.name || 
        !/^([a-zA-Z]+)(\s[a-zA-Z]+)*$/.test(input.name) || 
        !/^\d+$/.test(input.hp) || 
        !/^\d+$/.test(input.attack) || 
        !/^\d+$/.test(input.defense) || 
        !/^\d+$/.test(input.speed) || 
        !/^\d+$/.test(input.weight) || 
        !/^\d+$/.test(input.height) || 
        input.type.length === 0) {
            activeButton = true
        } else {
            activeButton = false
        }
    const style = {
        color: 'red',
        fontWeight: 'bold'
    }

    function validate(input) {
        let errors = {} ;
        if (!input.name) {
            errors.name = 'Se requiere un Nombre'
        } else if (!/^([a-zA-Z]+)(\s[a-zA-Z]+)*$/.test(input.name)) {
            errors.name = 'El nombre no puede contener números'
        }
        if (!/^\d+$/.test(input.hp)) {
            errors.hp = 'El valor no puede ser negativo'
        }
        if (!/^\d+$/.test(input.attack)) {
            errors.attack = 'El valor no puede ser negativo'
        }
        if (!/^\d+$/.test(input.defense)) {
            errors.defense = 'El valor no puede ser negativo'
        }
        if (!/^\d+$/.test(input.speed)) {
            errors.speed = 'El valor no puede ser negativo'
        }
        if (!/^\d+$/.test(input.weight)) {
            errors.weight = 'El valor no puede ser negativo'
        }
        if (!/^\d+$/.test(input.height)) {
            errors.height = 'El valor no puede ser negativo'
        }
        return errors;
    }

    function onChange (e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })

        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input)
    }

    function onSubmit (e) {
        e.preventDefault();
        disptach(postPokemon(input))
        alert("Pokémon creado con exito")
        setInput({
            name: '',
            image: '',
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            height: '',
            weight: '',
            type: []
        })
        // history('/home')
    }


    function select (e) {
        setInput({
            ...input,
            type:[...input.type, e.target.value]
        })
    }

    return (
        <div>
            <h1>Crear Pokemon!</h1>
                <div className="createpokeFlex">
                    <div className="pokecreateBorder">
                        <form onSubmit={onSubmit}>
                            <div>
                                <label>Name: </label>
                                <input className="createInput" type='text' value={input.name} name='name' onChange={onChange} />
                                {errors.name && (
                                    <p className="error">{errors.name}</p>
                                )}
                                <br />
                                <label>Imagen: </label>
                                <input className="createInput" type='text' value={input.image} name='image' onChange={onChange} />
                                <br />
                                <label>hp: </label>
                                <input className="createInput" type='number' value={input.hp} name='hp' onChange={onChange}/>
                                {errors.hp && (
                                    <p className="error">{errors.hp}</p>
                                )}
                                <br />
                                <label>attack: </label>
                                <input className="createInput" type='number' value={input.attack} name='attack' onChange={onChange}/>
                                {errors.attack && (
                                    <p className="error">{errors.attack}</p>
                                )}
                                <br />
                                <label>defense: </label>
                                <input className="createInput" type='number' value={input.defense} name='defense' onChange={onChange}/>
                                {errors.defense && (
                                    <p className="error">{errors.defense}</p>
                                )}
                                <br />
                                <label>speed: </label>
                                <input className="createInput" type='number' value={input.speed} name='speed' onChange={onChange}/>
                                {errors.speed && (
                                    <p className="error">{errors.speed}</p>
                                )}
                                <br />
                                <label>height: </label>
                                <input className="createInput" type='number' value={input.height} name='height' onChange={onChange}/>
                                {errors.height && (
                                    <p className="error">{errors.height}</p>
                                )}
                                <br />
                                <label>weight: </label>
                                <input className="createInput" type='number' value={input.weight} name='weight' onChange={onChange}/>
                                {errors.weight && (
                                    <p className="error">{errors.weight}</p>
                                )}
                                <br />
                            </div>
            
                                <label className='LabelCreate'>Select types</label>
                                    <select className='pokeCreateSelect' disabled={input.type.length === 2} key='selectPoke' className = 'option' onChange={select}>
                                        <option className='' defaultValue='type' value='types'>Types</option>
                                        {types?.map((t) => 
                                            <option 
                                                // defaultValue={t.name}
                                                value= {t.name}
                                                key={t.id}
                                                >{t.name}
                                            </option>
                                        )}
                                    </select>
                                    <ul className="pokeCreateUl"><li className="pokeCreateLi">{input.type.map(el => el + ' ')} </li></ul>
                                    <br />
                                    <br />
                                    
                                    <br />
                            <button disabled={activeButton} className="crearpokebutton" type='submit'>CREAR POKEMON</button>
                        </form>
                    </div>
                </div>        
                <Link to='/home'>
                    <button className="crearpokeHome">HOME</button>
                </Link>
        </div>
    )
}
