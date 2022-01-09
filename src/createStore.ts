type Action = { type: string };
// export interface AnyAction extends Action {
//     [extraProps: string]: any
// }
type Reducer<S, A> = (state: S, action: A) => S;


const store = createStore<number, { type: "a" | "b" }>(x => x);

// store.dispatch({type: 1});

export function createStore<S, A extends Action>(reducer: Reducer<S | undefined, A>, initialState?: S) {
    let state = reducer(initialState, { type: "@@redux/INIT" } as A);

    const getState = () => state;
    const subscribe = () => { return };
    const dispatch = (action: A) => {
        state = reducer(getState(), action);
    };

    return { dispatch, getState, subscribe };
}