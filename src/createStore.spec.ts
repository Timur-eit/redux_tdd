import { createStore } from './createStore';

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
      const reducer = (state: number | undefined, action : { type: string }) => {
        if (action.type === 'increment') {
            return state! + 1;
        }
        return state;
      };
      const store = createStore(reducer, 0);
      store.dispatch({type: 'increment'});
      const state = store.getState();

      expect(state).toEqual(1);
      
  })
  
})