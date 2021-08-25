/* eslint-disable no-use-before-define */
import apiService from '../api/apiService';
import initialState from '../data/initialState';

const main = () => {
  let state = initialState;

  const itemListElement = document.querySelector('item-list');
  const loadingElement = document.querySelector('loading-spinner');
  const appBarElement = document.querySelector('app-bar');
  const bannerElement = document.querySelector('banner-component');

  const getData = async (type = state.type, query = null, page = 1) => {
    try {
      state.isLoading = true;
      renderResult();
      let res;
      if (type !== 'search') {
        res = await (type === 'movie' ? apiService.getMovie(page) : apiService.getTvSeries(page));
      } else {
        res = await apiService.searchData(query, page);
      }

      state = {
        isLoading: false,
        type,
        result: res.data,
        searchQuery: query,
        dataList: page === 1 ? res.data.results : [...state.dataList, ...res.data.results],
      };
      renderResult();
    } catch (e) {
      state.isLoading = false;
      fallbackResult(e);
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const searchData = () => {
    const query = appBarElement.inputValue;
    getData('search', query);
  };

  const loadMoreData = () => {
    const page = state.result.page + 1;
    getData(state.type, state.searchQuery, page);
  };

  const renderBanner = () => {
    if (state.type !== 'search') {
      const result = state.result?.results[0];
      const data = result.backdrop_path ? result : state.result?.results[0 + 1];
      bannerElement.style.display = 'block';
      bannerElement.data = data;
    }
  };

  const renderResult = () => {
    if (state.isLoading) {
      loadingElement.style.display = 'block';
      itemListElement.style.display = 'none';
      bannerElement.style.display = 'none';
    } else {
      loadingElement.style.display = 'none ';
      itemListElement.style.display = 'grid';
      renderBanner();
      itemListElement.state = state;
    }

    if (state.result?.page === 1) {
      appBarElement.type = state.type;
    } else {
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  const fallbackResult = (message) => {
    loadingElement.style.display = 'none';
    itemListElement.style.display = 'block';
    appBarElement.type = 'search';
    itemListElement.renderError(message);
  };

  getData();
  appBarElement.filterClickEvent = getData;
  appBarElement.searchEvent = searchData;
  itemListElement.clickLoadMoreEvent = loadMoreData;
};

export default main;
