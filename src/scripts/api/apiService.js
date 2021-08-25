import { axiosInstance, apiKey } from './axiosInstance';

export default {
  getMovie(page = 1) {
    const res = axiosInstance.get(`/movie/popular?api_key=${apiKey}&page=${page}`);
    return res;
  },
  getTvSeries(page = 1) {
    const res = axiosInstance.get(`/tv/popular?api_key=${apiKey}&page=${page}`);
    return res;
  },
  searchData(query, page = 1) {
    const res = axiosInstance.get(`/search/multi?api_key=${apiKey}&page=${page}&query=${query}`);
    return res;
  },

};
