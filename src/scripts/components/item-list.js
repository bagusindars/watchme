/* eslint-disable no-underscore-dangle */
class ItemList extends HTMLElement {
  set state(state) {
    this._state = state;
    this.render();
  }

  set clickLoadMoreEvent(event) {
    this._clickLoadMoreEvent = event;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this._state?.dataList) {
      if (this._state?.type === 'search') {
        this.innerHTML = `<h1 class="mt-2">${this._state?.dataList.length >= 1 ? "You're looking" : 'No result'} for "${this._state?.searchQuery}"</h1><div id="item-list" class="mt-2 grid-container"></div>`;
      } else {
        this.innerHTML = '<div id="item-list" class="mt-2 grid-container"></div>';
      }
      const itemListInner = this.querySelector('#item-list');
      this._state?.dataList.forEach((result) => {
        const ItemElement = document.createElement('item-detail');
        ItemElement.item = result;
        itemListInner.appendChild(ItemElement);
      });
    }

    const totalPage = this._state?.result?.total_pages;
    if (totalPage > 1 && this._state?.result?.page < totalPage) {
      const buttonLoadMore = document.createElement('loadmore-component');
      this.appendChild(buttonLoadMore);
      buttonLoadMore.addEventListener('click', this._clickLoadMoreEvent);
    }
  }

  renderError(message) {
    this.innerHTML = `
              <div class="error-box">
                     <h2>Something went wrong. Try reloading the page</h2>
                     <p class="mt-1">Error : <span>${message.response?.status}</span> </p>
              </div>
              
         `;
  }
}

customElements.define('item-list', ItemList);
