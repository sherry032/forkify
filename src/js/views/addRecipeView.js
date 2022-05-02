import View  from "./View"
import icons from "../../img/icons.svg"

class AddRecipeView extends View{
    _parentEl = document.querySelector(".upload")
    _btnOpen = document.querySelector(".nav__btn--add-recipe")
    _btnClose = document.querySelector(".btn--close-modal")
    _overLay = document.querySelector(".overlay")
    _window = document.querySelector(".add-recipe-window")
    _errorMessage = "Recipe was successfully uploaded"
    constructor(){
        super()
        this._addHandlerShowWindow()
        this._addHandlerCloseWindow()
    }

    toggleHiddenClass(){
        this._overLay.classList.toggle("hidden")
        this._window.classList.toggle("hidden")
    }

    _addHandlerShowWindow(){
        this._btnOpen.addEventListener("click", this.toggleHiddenClass.bind(this))
    }
    _addHandlerCloseWindow(){
        this._btnClose.addEventListener("click", this.toggleHiddenClass.bind(this))
        this._overLay.addEventListener("click", this.toggleHiddenClass.bind(this))
    }
    addHandlerUpload(handler){
     this._parentEl.addEventListener("submit", function(e){
          e.preventDefault()
          const dataArr = new FormData(this)
          const data = Object.fromEntries(dataArr)
          handler(data)
     })
    }
}

export default new AddRecipeView()
