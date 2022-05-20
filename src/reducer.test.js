import deepFreeze from 'deep-freeze';
import counterReducer from './reducer';

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test('should return a proper initial state when called with undefined state', () => {
    const state = {};
    const action = {
      type: 'DO_NOTHING',
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('good is incremented', () => {
    const action = {
      type: 'GOOD',
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });

    console.log('old state' + JSON.stringify(state));
    console.log('new state' + JSON.stringify(newState));
  });

  test('ok is incremented', () => {
    const action = {
      type: 'OK',
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  });

  test('bad is incremented', () => {
    const action = {
      type: 'BAD',
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });
  });

  it('final state', () => {
    const action = {
      type: 'DO_NOTHING',
    };

    const actionG = {
      type: 'GOOD',
    };

    const actionO = {
      type: 'OK',
    };

    const actionB = {
      type: 'BAD',
    };
    const state = initialState;

    deepFreeze(state);
    let newState = counterReducer(state, actionG);
    for (let i = 0; i < 4; i++) {
      newState = counterReducer(newState, actionG);
    }
    for (let i = 0; i < 4; i++) {
      newState = counterReducer(newState, actionO);
    }
    for (let i = 0; i < 2; i++) {
      newState = counterReducer(newState, actionB);
    }
    newState = counterReducer(newState, action);
    expect(newState).toEqual({
      good: 5,
      ok: 4,
      bad: 2,
    });
  });

  it('zero works', function () {
    const actionG = {
      type: 'GOOD',
    };

    const actionZ = {
      type: 'ZERO',
    };

    const state = initialState;

    deepFreeze(state);
    let newState = counterReducer(state, actionG);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });

    newState = counterReducer(newState, actionZ);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0,
    });
  });
});
