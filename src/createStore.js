// type Action = { type: string };
// type Reducer<S, A> = (state: S, action: A) => S;

/**
 * 
 * @param {Reducer<S, A> = (state: S, action: A) => S} reducer
 * @param {any} initialState. 
 * @param {Function} enhancer.
 * @returns store - object with methods dispatch, getState, subscribe.
 */
export function createStore(reducer, initialState, enhancer) {

    if (enhancer !== undefined) {
        const enhancedCreateStore = enhancer(createStore);
        return enhancedCreateStore(reducer, initialState);
    }

    let state = reducer(initialState, { type: "@@redux/INIT" });

    const subscribers = [];

    const getState = () => state;
    const subscribe = (cb) => {
        subscribers.push(cb);
        const inner = () => {
            const cbIndex = subscribers.indexOf(cb);
            subscribers.splice(cbIndex, 1);
        };
        return inner;
    };
    const dispatch = (action) => {
        state = reducer(getState(), action);
        subscribers.forEach((cb) => cb());

    };

    return { dispatch, getState, subscribe };
}