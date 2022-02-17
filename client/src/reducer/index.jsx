const initialState = {
    pokemons : [],
    allPokemons : [],
    type : [],
    details : []
}

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }

        case 'ORDER_BY_NAME':
            const nameSort = action.payload === 'asc' ?
                state.allPokemons.sort(function(a,b) {
                    if (a.name > b.name) {
                        return 1
                    }
                    if (b.name > a.name) {
                        return -1
                    }
                    return 0
                }) :
                state.allPokemons.reverse() 
                
                return {
                    ...state,
                    pokemons: nameSort 
                }
            
            case 'GET_BY_NAME':
                return { 
                    ...state,
                    pokemons: action.payload
                }
                case 'ORDER_BY_ATTACK':
                    const attackSort = action.payload  === 'maxAttack' ?
                    state.allPokemons.sort(function(a,b) {return b.attack - a.attack}) :
                    state.allPokemons.sort(function(a,b) {return a.attack - b.attack}) 
                
                return {
                    ...state,
                    pokemons: attackSort 
                }

                case 'FILTER_BY_ORIGIN':
                    const allPokemons = state.allPokemons;
                    const getOriginFilter = action.payload === 'db' ?    //action.payload === 'all' ? allPokemons :
                    allPokemons.filter(p => p.createdDb === true) :
                    allPokemons.filter(p => !p.createdDb)

                    return {
                        ...state,
                        pokemons: getOriginFilter
                    }

                    case 'GET_TYPES':
                    return {
                        ...state,
                        type: action.payload
                    };


                    case 'GET_DETAILS':
                    return{
                        ...state,
                        details : action.payload
                    }  

                    case 'FILTER_BY_TYPES': 
                    let allPokemons0 = state.allPokemons;
                    let filteredByType = action.payload === 'all' ? allPokemons0 :
                    allPokemons0.filter(p => p.type.includes(action.payload))
                    
                    if (filteredByType.length <= 0) {
                        filteredByType = allPokemons0;
                        alert("There are no pokemon of the indicated type");
                      }
                      return {
                        ...state,
                        pokemons: filteredByType,
                      };

            default: return state
    }
}

export default rootReducer