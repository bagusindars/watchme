class LoadMore extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = '<button class="btn btn-primary">Load More</button>';
  }
}

customElements.define('loadmore-component', LoadMore);
