import axios from 'axios'

export function getAllPokemons() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/api/pokemon')
        return dispatch ({
            type: 'GET_ALL_POKEMONS',
            payload: json.data
        })
    }
} 

export function getByName (name) {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/api/pokemon?name=' + name);
            return dispatch ({
                type: 'GET_BY_NAME',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
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

export function filterByStatus (payload) {
    return {
        type: 'FILTER_BY_STATUS',
        payload
    }
}

// export function getTypes () {
//     return async function (dispatch) {
//         var info = await axios.get('http://localhost:3001/api/type');
//         return dispatch ({
//             type: 'GET_TYPES',
//             payload: info.data
//         })
//     }
// }

export function getTypes(){
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/api/type');
        return dispatch({
            type: 'GET_TYPES',
            payload: json.data
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
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/api/pokemon', payload)
        return response
    }
}

export function getDetail (id) {
    console.log(id)
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/api/pokemon/' + id);
            console.log('json')
            console.log(json)
            return dispatch ({
                type: 'GET_DETAILS',
                payload: json.data
            }) 
        } catch (error) {
            console.log(error)
        }
    }
}