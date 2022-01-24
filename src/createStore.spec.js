import { createStore } from './createStore';

const INCREMENT = 'INCREMENT';

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
    	const reducer = (state, action) => {
        	if (action.type === INCREMENT) {
        		return state + 1;
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

	it("should support enchancer", () => {
		
		function enhancer(createStore) {		
			return function(reducer, initialState)	{
				const store = createStore(reducer, initialState);
				
				function myGetState() {
					return {
						...store.getState(),
						hello: 123,
					};
				}

				return {
					...store,
					getState: myGetState,
				};
			};
		}

		const initialState = {
			x: 1,
		};

		const reducer = (x) => x;

		const store = createStore(reducer, initialState, enhancer);

		expect(store.getState()).toEqual({
			x: 1,
			hello: 123,
		});

	})

	it("should support middleware enchancer", () => {
		const sideEffect1 = jest.fn();
		const sideEffect2 = jest.fn();
		
		const middleware1 = storeAPI => next => action => {
			sideEffect1(action);
			console.log("middleware 1")
			return next(action);
		}
		
		const middleware2 = storeAPI => next => action => {
			sideEffect2(action);
			console.log("middleware 2")
			return next(action);
		}

		
		function enhancer(createStore) {
		
			return function(reducer, initialState)	{
				const store = createStore(reducer, initialState);
				const { dispatch, getState } = store;
				const storeAPI = { dispatch, getState };
		
				function myDispatch(action) {
					// 2nd arg → next: (action) => ...
					const next = middleware2(storeAPI)(dispatch)
					return middleware1(storeAPI)(next)(action);
				}

				return {
					...store,
					dispatch: myDispatch,
				};
			};
		}

		const initialState = {
			x: 1,
		};
		
		const reducer = (state, action) => {
			if (action.type === "add") {
				return { ...state, x: state.x + 1 };
			}
			return state;
		};

		const store = createStore(reducer, initialState, enhancer);

		store.dispatch({ type: "add" });
		
		expect(sideEffect1).toHaveBeenCalledTimes(1);
		expect(sideEffect2).toHaveBeenCalledTimes(1);
	})
})