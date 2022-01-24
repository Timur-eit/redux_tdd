import { combineReducers } from './combineReducers';

describe('combineReducers', () => {
    function r1(state = [1,2,3], action) {
        if (action.type === "push") {
            return [...state, action.payload];
        }
        return state;
    }
    
    function r2(state = 5, action) {
        if (action.type === "add") {
            return state + action.payload;
        }
        return state;
    }
        
    const reducer = combineReducers({
        model1: r1,
        model2: r2,
    });
    
    test('works for unknown actions', () => {
        const state = {
            a: [1,2,3],
            b: 5,
        };
        const globalStates = reducer(state, '@@redux/INIT');
        expect(globalStates).toEqual({
            model1: [1, 2, 3],
            model2: 5,
        });
    });

    test('works for known actions', () => {
        const state = {
            a: [1,2,3],
            b: 5,
        };
        const updatedState = reducer(state, {type: 'push', payload: 100});

        expect(updatedState).toEqual({
            model1: [1, 2, 3, 100],
            model2: 5,
        });
    });
});