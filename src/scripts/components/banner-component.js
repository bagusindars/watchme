/* eslint-disable no-underscore-dangle */
class BannerComponent extends HTMLElement {
  set data(data) {
    this._data = data;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this._data) {
      this.innerHTML = `
                     <div id="banner" class="mt-1">
                            <div id="image-box">
                                   <loading-spinner></loading-spinner>
                                   <img id="banner-image" src="https://image.tmdb.org/t/p/w1280/${this._data.backdrop_path}" alt="">
                            </div>
                            <div id="detail">
                                   <h1 class="title">${this._data.title || this._data.name}</h1>
                                   <div class="inline-side text-plain">
                                          <div class="date inline-side">
                                                 <i class="bi bi-calendar-event"></i>
                                                 <p class="date">${this._data.release_date || this._data.first_air_date}</p>
                                          </div>
                                          <div class="inline-side">
                                                 <i class="bi bi-star-fill rating"></i>
                                                 <p class="">${this._data.vote_average}</p>
                                          </div>
                                   </div>
                                   
                                   <p class="desc mt-1">${this._data.overview}</p>
                                   <button class="mt-2 btn btn-primary"><i class="bi bi-play-fill"></i>Watch</button>
                            </div>
                     </div>
              `;

      const imageElement = this.querySelector('#banner-image');
      imageElement.addEventListener('load', () => {
        this.querySelector('loading-spinner').style.display = 'none';
        imageElement.style.display = 'initial';
      });
    }
  }
}

customElements.define('banner-component', BannerComponent);
