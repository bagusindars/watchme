import axios from 'axios';

const apiKey = '12a848907b74413e64b8782c034a0b93';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

export { axiosInstance, apiKey };
