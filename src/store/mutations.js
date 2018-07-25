import {SETSTATE} from './types';

export default {
  setState(state, newState) {
    for(let k in newState) {
      state[k] = newState[k];
    }
  },
  setFilterParams(state, obj) {
    const filterCinema = state.filterCinema;
    state.filterCinema = Object.assign(filterCinema, obj);
  }
}