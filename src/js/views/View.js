import icons from "../../img/icons.svg"


export default class View{
    _data

    render(data){
    if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError()
    this._data = data
    this._clear()
    this._parentEl.insertAdjacentHTML("afterbegin", this._generateMarkUp())
    }
    update(data){
      this._data = data
      const newMarkup = this._generateMarkUp()
      const newDom = document.createRange().createContextualFragment(newMarkup)
      const newDomElements = Array.from(newDom.querySelectorAll("*"))
      const currentDomElements = Array.from(this._parentEl.querySelectorAll("*"))
      currentDomElements.forEach((currentel, i) => {
        const newEl = newDomElements[i] 

      if(!currentel.isEqualNode(newEl) && currentel.firstChild?.nodeValue.trim() !== "") currentel.textContent = newEl.textContent

      if(!currentel.isEqualNode(newEl)){
          Array.from(newEl.attributes).forEach(attr=> currentel.setAttribute(attr.name, attr.value))
      }
      })

    }
    renderSpinner(){
        const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`
        this._clear()
        this._parentEl.insertAdjacentHTML("afterbegin", markup)
      }
    
    renderError(message = this._errorMessage){
      const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
          `
      this._clear()
      this._parentEl.insertAdjacentHTML("afterbegin", markup)   
    }  
    _clear(){
        this._parentEl.innerHTML = ""
    }
    
    addHandlerRender(handler){
      ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
    }
}