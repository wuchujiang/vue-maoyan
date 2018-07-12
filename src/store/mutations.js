import {SETSTATE} from './types';

export default {
  setState(state, newState) {
    for(let k in newState) {
      state[k] = newState[k];
    }
  },
}