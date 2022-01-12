import { createStore } from './createStore';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

describe('createStore', () => {
	it("should return object with subscribe, dispatch & getState methods", () => {
		const store = createStore(x => x);

    	expect(store).toHaveProperty("dispatch");
    	expect(store).toHaveProperty("getState");
    	expect(store).toHaveProperty("subscribe");
  	})
  	it ('default state should be initialState', () => {
    	const store = createStore((s) => s, 'qwerty');
    	const state = store.getState();

    	expect(state).toEqual('qwerty');
  	})
  	it('default state should be equal default reducer state in case there no second param', () => {
    	const store = createStore((x = "asdfgh") => x);
    	const state = store.getState();

    	expect(state).toEqual('asdfgh');
	})
  	it ('after dispatch state should be changed', () => {
    	const reducer = (
			state: number | undefined,
			action: { type: string }
		) => {
        	if (action.type === INCREMENT) {
        		return state! + 1;
        	}
        	return state;
    	};
    	const store = createStore(reducer, 0);
    	store.dispatch({ type: INCREMENT });
    	const state = store.getState();

    	expect(state).toEqual(1);
  	})
	it ('callback function in subscribe should be invoked after each state changing', () => {
		const store = createStore((s) => s, 'qwerty');
		// https://www.codewars.com/kata/i-spy
		const listener = jest.fn();
		store.subscribe(listener);

		store.dispatch({ type: INCREMENT });
		expect(listener).toHaveBeenCalledTimes(1);

		store.dispatch({ type: INCREMENT });
		expect(listener).toHaveBeenCalledTimes(2);
	})
	it ('multiple callback functions in subscribe should be invoked after each state changing', () => {
		const store = createStore((s) => s, 'qwerty');
		const listener1 = jest.fn();
		const listener2 = jest.fn();
		store.subscribe(listener1);
		store.subscribe(listener2);

		store.dispatch({ type: INCREMENT });
		expect(listener1).toHaveBeenCalledTimes(1);
		expect(listener2).toHaveBeenCalledTimes(1);

		store.dispatch({ type: INCREMENT });
		expect(listener1).toHaveBeenCalledTimes(2);
		expect(listener2).toHaveBeenCalledTimes(2);
	})
	it ('unsibscribe', () => {
		const store = createStore((s) => s, 'qwerty');
		const listener1 = jest.fn();
		const listener2 = jest.fn();

		store.subscribe(listener1);
		const unsubscribe2 = store.subscribe(listener2);

		store.dispatch({ type: INCREMENT });
		expect(listener1).toHaveBeenCalledTimes(1);
		expect(listener2).toHaveBeenCalledTimes(1);

		unsubscribe2();

		store.dispatch({ type: INCREMENT });
		expect(listener1).toHaveBeenCalledTimes(2);
		expect(listener2).toHaveBeenCalledTimes(1);
	})
})