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

        // case 'ORDER_BY_NAME':
        //     const nameSort = action.payload === 'asc' ?
        //         state.allPokemons.sort(function(a,b) {
        //             if (a.name > b.name) {
        //                 return 1
        //             }
        //             if (b.name > a.name) {
        //                 return -1
        //             }
        //             return 0
        //         }) :
        //         state.allPokemons.sort(function(a,b) {
        //             if (a.name > b.name) {
        //                 return -1
        //             }
        //             if (b.name > a.name) {
        //                 return 1
        //             }
        //             return 0
        //         }) 
                
        //         return {
        //             ...state,
        //             pokemons: nameSort 
        //         }

        // REVISAR ↑
        // case 'ORDER_BY_NAME':
        //     const nameSort = action.payload === 'asc' ?
        //         state.allPokemons.sort() :
        //         state.allPokemons.reverse() 
                
        //         return {
        //             ...state,
        //             pokemons: nameSort 
        //         }
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

                // case 'ORDER_BY_ATTACK':
                //     const attackSort = action.payload === 'maxAttack' ?
                //     state.allPokemons.sort(function(a,b) {
                //         if (a.attack > b.attack) {
                //             return 1
                //         }
                //         if (b.attack > a.attack) {
                //             return -1
                //         }
                //         return 0 
                //     }) :
                //     state.allPokemons.sort(function(a,b) {
                //     if (a.attack > b.attack) {
                //         return -1
                //     }
                //     if (b.attack > a.attack) {
                //         return 1
                //     }
                //     return 0
                // }) 
                
                // return {
                //     ...state,
                //     pokemons: attackSort 
                // }

                // case 'ORDER_BY_ATTACK':
                //     // const allPokemons2 = state.allPokemons;
                //     const attackSort = action.payload === 'all' ? allPokemons :
                //     action.payload === 'maxAttack' ?
                //     state.allPokemons.sort(function(a,b) {return b.attack - a.attack}) :
                //     state.allPokemons.sort(function(a,b) {return a.attack - b.attack}) 
                
                // return {
                //     ...state,
                //     pokemons: attackSort 
                // }
                case 'ORDER_BY_ATTACK':
                    // const allPokemons2 = state.allPokemons;
                    const attackSort = action.payload  === 'maxAttack' ?
                    state.allPokemons.sort(function(a,b) {return b.attack - a.attack}) :
                    state.allPokemons.sort(function(a,b) {return a.attack - b.attack}) 
                
                return {
                    ...state,
                    pokemons: attackSort 
                }

                // FUNCIONA ↓
                // case 'ORDER_BY_ATTACK':
                // let orderByAttacks = action.payload === 'maxAttack' ? state.allPokemons.sort(function(a,b){
                //     return (b.attack - a.attack)
                // }): state.pokemons.sort(function(a,b){
                //     return (a.attack - b.attack)
                // })

                // return{
                //     ...state,
                //     pokemons: orderByAttacks
                // } 
                // FUNCIONA ↑

                case 'FILTER_BY_ORIGIN':
                    const allPokemons = state.allPokemons;
                    const getOriginFilter = action.payload === 'all' ? allPokemons :
                    action.payload === 'db' ?
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

                    // case 'GET_TYPES':
                    //     const pokemonsBck = state.allPokemons;
                    //     const filterType = action.payload === 'all' ? pokemonsBck : pokemonsBck.filter(p => p.name === action.payload)
                    //     return{
                    //         ...state,
                    //         type : filterType
                    //     } 

                    case 'FILTER_BY_TYPES': 
                    // let nada = 'no hay pokemons de type'
                    let allPokemons0 = state.allPokemons;
                    // console.log(allPokemons0)

                    let filteredByType = action.payload === 'all' ? allPokemons0 :
                    allPokemons0.filter(p => p.type === action.payload )
                    
                    if (filteredByType.length <= 0) {
                        filteredByType = allPokemons0;
                        alert("There are no pokemon of the indicated type");
                      }
                      return {
                        ...state,
                        pokemons: filteredByType,
                      };

                    // case 'FILTER_BY_TYPES':
                    // const filteredByType = action.payload === 'all' ? state.allPokemons :
                    // state.allPokemons.filter(p => p.type === action.payload)
                    // if(filteredByType){
                    //     return {
                    //         ...state,
                    //         pokemons: filteredByType
                    //     }
                    // } else {
                    //     alert('NOOO')
                    // };

                    case 'GET_DETAILS':
                    return{
                        ...state,
                        details : action.payload
                    }  


            default: return state
    }
}

export default rootReducer