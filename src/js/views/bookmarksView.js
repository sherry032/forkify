import previewView from "./previewView"

class BookmarksView extends previewView{
    _parentEl = document.querySelector('.bookmarks__list')
    _errorMessage = "No bookmarks found."

    addHandlerRender(handler){
      window.addEventListener("load", handler)
    }

    }

    export default new BookmarksView()