import { combineReducers, R1Action, R2Action } from './combineReducers';

describe('combineReducers', () => {

    const s1 = [1,2,3];
    const s2: number = 5;

    function r1(state = s1, action: R1Action) {
        if (action.type === "push") {
          return [...state, action.payload];
        }
        return state;
    }

    function r2(state = s2, action: R2Action) {
        if (action.type === "add") {
          return state + action.payload;
        }
        return state;
    }

    const states = {a: s1, b: s2 };
    const action1: R1Action = { type: 'push', payload: 5 };
    const action2: R1Action = { type: 'add', payload: 1 };

    const reducers = combineReducers({
        model1: r1,
        model2: r2,
    });

    
    const globalStates = reducers(states, '@@redux/INIT');

    it('combined reducers returns object with states', () => {
        
        expect(globalStates).toHaveProperty('model1');
        expect(globalStates).toHaveProperty('model2');
    });
    it('combined reducers includes initial states', () => {
        expect(globalStates.model1).toStrictEqual(s1);
        expect(globalStates.model2).toEqual(s2);
    })
});