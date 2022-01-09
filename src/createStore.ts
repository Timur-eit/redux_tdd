type Action = { type: string };
type Reducer<S, A> = (state: S, action: A) => S;

export function createStore<S, A extends Action>(reducer: Reducer<S | undefined, A>, initialState?: S) {
    let state = reducer(initialState, { type: "@@redux/INIT" } as A);
    let subscribeCallback: undefined | ( () => void );

    const getState = () => state;
    const subscribe = (cb: () => void) => {
        subscribeCallback = cb;
    };
    const dispatch = (action: A) => {
        state = reducer(getState(), action);
        subscribeCallback && subscribeCallback();
    };

    return { dispatch, getState, subscribe };
}