export type Action = { type: string };
export type Reducer<S, A> = (state: S, action: A) => S;

export function createStore<S, A extends Action>(
    reducer: Reducer<S | undefined, A>,
    initialState?: S,
    enhancer?: Function,
) {
    if (enhancer !== undefined) {
        const enhancedCreateStore = enhancer(createStore);
        return enhancedCreateStore(reducer, initialState);
    }

    let state = reducer(initialState, { type: "@@redux/INIT" } as A);    

    const subscribers: Array<() => void> = [];

    const getState = () => state;
    const subscribe = (cb: () => void) => {
        subscribers.push(cb);
        const inner = () => {
            const cbIndex = subscribers.indexOf(cb);
            subscribers.splice(cbIndex, 1);
        };
        return inner;
    };
    const dispatch = (action: A) => {
        state = reducer(getState(), action);
        subscribers.forEach((cb) => cb());
        
    };

    return { dispatch, getState, subscribe };
}