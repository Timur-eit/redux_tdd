import { Action, createStore, Reducer } from "./createStore";

export interface R1Action extends Action {
    payload: number;
}
export interface R2Action extends Action {
    payload: number;
}

// const store1 = createStore(r1);
// const store2 = createStore(r2);

type CombineReducerArg = {
    [modelName: string]: Reducer<number[], R1Action> | Reducer<number, R2Action>,    
}

type CombineReducerResult = Reducer<
    { [modelName: string]: number[] | number },
    (R1Action | R2Action) | string
>;

export function combineReducers(obj: CombineReducerArg): CombineReducerResult {
    
    type GetCombinedState = (
        state: { [modelName: string]: number[] | number },
        action?: (R1Action | R2Action) | string
    ) => { [modelName: string]: number[] | number }

    const getCombinedState: GetCombinedState = (state, action = '@@redux/INIT') => {
        const combinedStates = {};  
        for (const reducer in obj) { 
            // @ts-ignore
            combinedStates[reducer] = obj[reducer](state[reducer], action);
        };
        return combinedStates;
    }
    
    return getCombinedState;
};


// r({undefined}, {type: "qwerty"}) === {
//   a: [1,2,3],
//   b: 5
// }

// const store = createStore(r); // ошибка

// @ts-ignore
// console.log(createStore(r(states, action1)));