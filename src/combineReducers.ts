import { Action, createStore, Reducer } from "./createStore";

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

const store1 = createStore(r1);
const store2 = createStore(r2);

type CombineReducerArg = {
    a: Reducer<typeof s1, R1Action>,
    b: Reducer<typeof s2, R2Action>,
}

type CombineReducerResult = Reducer<
    { a: typeof s1, b: typeof s2 },
    R1Action | R2Action
>;

function combineReducers(obj: CombineReducerArg): CombineReducerResult {
    // @ts-ignore
    return (state, action = '@@redux/INIT') => {
        const combinedStates = {};
  
        for (const reducer in obj) { 
            // @ts-ignore
            combinedStates[reducer] = obj[reducer](state[reducer], action);
        };
        return combinedStates;
  };

};

const r = combineReducers({
  a: r1,
  b: r2,
});

// r({undefined}, {type: "qwerty"}) === {
//   a: [1,2,3],
//   b: 5
// }

// const store = createStore(r); // ошибка

const states = {a: s1, b: s2 };
const action1: R1Action = { type: 'push', payload: 5 };
const action2: R1Action = { type: 'add', payload: 1 };

// @ts-ignore
console.log(r(states));

// @ts-ignore
// console.log(createStore(r(states, action1)));