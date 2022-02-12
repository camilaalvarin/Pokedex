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
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        type: []
    })

    console.log(input)

    const [errors, setErrors] = useState({})

    useEffect(() => {
        disptach(postPokemon())
    }, [])

    function onChange (e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })

        // setErrors({   //validate
        //     ...input,
        //     [e.target.name] : e.target.value
        // })
    }

    function camila (e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function checkbox (e) {
        setInput({
            ...input,
            type: [...input.type, e.target.value]
        })
    }


    function onSubmit (e) {
        e.preventDefault();
        disptach(postPokemon(input))

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

    function inputDelete (el) {
        setInput({
            ...input,
            type: input.type.filter(t => t !== el)
        })
    }

    function select (e) {
        setInput({
            ...input,
            // [e.target.name] : e.target.value
            type:[...input.type, e.target.value]
        })
    }

    // -------------------------------------------------------------------------------------
    
const handleSelect = (e) => {
        if(input.type?.indexOf(Number(e.target.value)) === -1){
            setInput({  
                ...input,
                type:[...input.type, Number(e.target.value)]
            })
            setErrors({
                ...input,
                type:[...input.type, Number(e.target.value)]
            })
        }
        else{
            alert('Este tipo ya existe')
        }
    }



    //----------------------------------------------------------------------------------------

    return (
        <div>

        <h1>Crear Pokemon!</h1>
            <div className="createpokeFlex">
            <div className="pokecreateBorder">
                <form onSubmit={onSubmit}>
                    <div>
                        <label>Name: </label>
                        <input className="createInput" type='text' value={input.name} name='name' onChange={onChange} />
                        <br />
                        <label>Imagen: </label>
                        <input className="createInput" type='text' value={input.image} name='image' onChange={onChange} />
                        <br />
                        <label>hp: </label>
                        <input className="createInput" type='number' value={input.hp} name='hp' onChange={onChange}/>
                        <br />
                        <label>attack: </label>
                        <input className="createInput" type='number' value={input.attack} name='attack' onChange={onChange}/>
                        <br />
                        <label>defense: </label>
                        <input className="createInput" type='number' value={input.defense} name='defense' onChange={onChange}/>
                        <br />
                        <label>speed: </label>
                        <input className="createInput" type='number' value={input.speed} name='speed' onChange={onChange}/>
                        <br />
                        <label>height: </label>
                        <input className="createInput" type='number' value={input.height} name='height' onChange={onChange}/>
                        <br />
                        <label>weight: </label>
                        <input className="createInput" type='number' value={input.weight} name='weight' onChange={onChange}/>
                        <br />
                    </div>
                    {/* <select onClick={select}>
                        {
                            types.map(t => 
                                <option onChange={camila} value={t.name}>{t.name}</option>
                                )
                        }
                    </select>
                    <br /> */}
                    {/* <select>
                        <ul>
                            <li>{input.type.map(t => t + ', ')}</li>
                        </ul>
                    </select> */}
    
                        <label className='LabelCreate'>Tipos de Pokemon:</label>
                            <select key='selectPoke' className = 'option' onChange={select}>
                                <option value='' disabled='true' selected>Tipos de pokemon</option>
                                {types?.map((t) => 
                                    <option 
                                        value= {t.name}
                                        key={t.id}
                                        >{t.name}
                                    </option>
                                )}
                            </select>


                    <button className="crearpokebutton" type='submit'>CREAR POKEMON</button>
                </form>
            </div>
            </div>        
        <Link to='/home'>
            <button className="crearpokeHome">HOME</button>
        </Link>
        </div>
    )
}
