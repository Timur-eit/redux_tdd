/**
 * Get combine reducer
 * @param {{ [modelName: string]: Reducer<State, Action> }} obj
 * @returns combine reducer
 */
export function combineReducers(obj) {    
    return (state, action) => {
        const combinedStates = {};  
        for (const reducer in obj) {             
            
            console.log('STATE', state);
            
            combinedStates[reducer] = obj[reducer](state[reducer], action);
        };
        return combinedStates;
    }
}

/*
const s1 = [1,2,3];
const s2: number = 5;

interface R1Action extends Action {
    payload: number;
}

function r1(state = s1, action: R1Action) {
    if (action.type === "push") {
      return [...state, action.payload];
    }
    return state;
}

interface R2Action extends Action {
    payload: number;
}

function r2(state = s2, action: R2Action) {
    if (action.type === "add") {
      return state + action.payload;
    }
    return state;
}

type CombineReducerArg = {
    a: Reducer<typeof s1, R1Action>,
    b: Reducer<typeof s2, R2Action>,
}

type CombineReducerResult = Reducer<
    { a: typeof s1, b: typeof s2 },
    R1Action | R2Action
>;
*/

