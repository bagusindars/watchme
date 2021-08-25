/* eslint-disable no-underscore-dangle */
import initialState from '../data/initialState';

class AppBar extends HTMLElement {
  constructor() {
    super();
    this._type = initialState.type;
  }

  set type(type) {
    this._type = type;
    this.render();
  }

  set filterClickEvent(event) {
    this._filterClickEvent = event;
    this.render();
  }

  set searchEvent(event) {
    this._searchEvent = event;
    this.render();
  }

  get inputValue() {
    return this.querySelector('#inputSearch').value;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
                     <nav>
                            <ul class="menu-link">
                                   <li class="brand">
                                          <i class="bi bi-camera-reels brand-logo"></i>
                                          <span>WatchMe</span>
                                   </li>
                                   <li><a id="appBarMovie" href="#" class="menu-link-href ${this._type === 'movie' && 'active'}">Movies</a></li>
                                   <li><a id="appBarTv" href="#" class="menu-link-href ${this._type === 'tv' && 'active'}">Tv Series</a></li>
                            </ul>
                            <div id="searchbar">
                                   <form action="" id="formSearch">
                                          <div class="form-group searchbar">
                                                 <button type="submit">
                                                        <i class="bi bi-search" id="btnSearch"></i>
                                                 </button>
                                                 <input type="text" placeholder="Search" id="inputSearch" required>
                                          </div>
                                   </form>
                            </div>
                     </nav>
              `;

    if (this._type !== 'movie') {
      this.querySelector('#appBarMovie').addEventListener('click', () => {
        this._filterClickEvent('movie');
      });
    }
    if (this._type !== 'tv') {
      this.querySelector('#appBarTv').addEventListener('click', () => {
        this._filterClickEvent('tv');
      });
    }

    this.querySelector('#formSearch').addEventListener('submit', (e) => {
      e.preventDefault();
      this._searchEvent();
    });
  }
}

customElements.define('app-bar', AppBar);
