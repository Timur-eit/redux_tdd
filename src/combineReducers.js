/**
 * Get combine reducer
 * @param {{ [modelName: string]: Reducer<State, Action> }} obj
 * @returns combine reducer
 */
export function combineReducers(obj) {    
    return (state, action) => {
        const combinedStates = {};  
        for (const reducer in obj) {             
            combinedStates[reducer] = obj[reducer](state[reducer], action);
        };
        return combinedStates;
    }
}
