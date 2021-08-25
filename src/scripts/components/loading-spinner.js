class LoadingSpinner extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.size = this.getAttribute('size') || 'medium'; // size : medium,small
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
                    <style>
                         .loader-box{
                              display:flex;
                              justify-content:center;
                              height:80vh;
                              align-items:center;
                              flex-direction:column;
                         }
                         .loader {
                              border-radius: 50%;
                              border:3px solid #f3f3f3;
                              border-top:3px solid rgb(220, 22, 35);
                              -webkit-animation: spin 2s linear infinite; /* Safari */
                              animation: spin 2s linear infinite;
                              margin-bottom:5px;
                         }

                         .medium{
                              width: 120px;
                              height: 120px;
                         }

                         .small{
                               width: 70px;
                              height: 70px;
                         }

                         /* Safari */
                         @-webkit-keyframes spin {
                              0% { -webkit-transform: rotate(0deg); }
                              100% { -webkit-transform: rotate(360deg); }
                         }

                         @keyframes spin {
                              0% { transform: rotate(0deg); }
                              100% { transform: rotate(360deg); }
                         }
                    </style>
                   <div class="loader-box">
                         <div class="loader ${this.size}"></div>
                   </div>     
              `;
  }
}

customElements.define('loading-spinner', LoadingSpinner);
