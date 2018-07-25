import axios from '@/utils/axios';

export default {
  fetchCinemasList({commit, state}) {
    return new Promise(async (resolve, reject) => {
      const params = state.filterCinema;
      const filterMovie = await axios.post(`/ajax/movie?forceUpdate=${new Date().getTime()}`, Object.assign(params, {city: state.city}));
      commit('setState', {filterCinemasList: filterMovie.cinemas});
      resolve(filterMovie);
    })
  }
}