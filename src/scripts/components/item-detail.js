/* eslint-disable no-underscore-dangle */
import nullImg from '../../assets/null-img.jpg';

class Item extends HTMLElement {
  set item(item) {
    this._item = item;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.classList.add('item', 'grid-col-2', 'grid-col-md-3', 'grid-col-sm-4', 'grid-col-xs-6', 'grid-col-xxs-12');
    this.setAttribute('title', (this._item.title || this._item.original_name));

    let date; let imgSrc;
    if (this._item.release_date || this._item.first_air_date) {
      date = (this._item.release_date || this._item.first_air_date).substring(0, 4);
    } else {
      date = '--';
    }

    if (this._item.poster_path) {
      imgSrc = `https://image.tmdb.org/t/p/w400/${this._item.poster_path}`;
    } else {
      imgSrc = nullImg;
    }

    this.innerHTML = `
                     <div class="img-frame">
                            <loading-spinner size="small"></loading-spinner>
                            <img id="item-detail-image" src="${imgSrc}" alt="">
                     </div>
                     <div class="detail mt-1">
                            <h3 class="title">${(this._item.title || this._item.name).substring(0, 20)}</h3>
                            <div class="inner" style="font-size: 13px;">
                                   <p class="year">${date}</p>
                            </div>
                     </div>
                     <p class="button-rating">${this._item.vote_average ? this._item.vote_average : '0'}</p>
              `;
    const imageElement = this.querySelector('#item-detail-image');
    imageElement.addEventListener('load', () => {
      this.querySelector('loading-spinner').style.display = 'none';
      imageElement.style.display = 'initial';
    });
  }
}

customElements.define('item-detail', Item);
