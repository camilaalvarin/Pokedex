import axios from 'axios'

export function getAllPokemons() {
    return function (dispatch) {
        axios.get('http://localhost:3001/api/pokemon')
        .then((json) => {
            return dispatch ({
                type: 'GET_ALL_POKEMONS',
                payload: json.data
            })
        })
    }
} 

export function getDetail (id) {
    console.log(id)
    return function (dispatch) {

            axios.get('http://localhost:3001/api/pokemon/' + id)
            .then((json) => {
                console.log('json')
                console.log(json)
                return dispatch ({
                type: 'GET_DETAILS',
                payload: json.data
            }) 
            })
            
        } 
    }


export function getByName (name) {
    return function (dispatch) {
             axios.get('http://localhost:3001/api/pokemon?name=' + name)
            .then((json) => {
                dispatch ({
                    type: 'GET_BY_NAME',
                    payload: json.data
                })
            })
    }
}

export function orderByName (payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}
export function orderByAttack (payload) {
    return {
        type: 'ORDER_BY_ATTACK',
        payload
    }
}

export function getTypes(){
    return function (dispatch) {
        axios.get('http://localhost:3001/api/type')
        .then((json) => {
            return dispatch({
                type: 'GET_TYPES',
                payload: json.data
            })
        })
    }
}

export function filterByTypes(payload){
    //console.log(payload)
    return {
        type: 'FILTER_BY_TYPES',
        payload
    }
}


export function filterByOrigin (payload) {
    return {
        type: 'FILTER_BY_ORIGIN',
        payload
    }
}


export function postPokemon (payload) {
    return function (dispatch) {
        axios.post('http://localhost:3001/api/pokemon', payload)
        .then(response => response) 
    }
}


