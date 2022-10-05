import previewView from "./previewView"

class ResultView extends previewView{
    _parentEl = document.querySelector(".results")
    _errorMessage = "No recipes found for your query! Please try again."

    
  }

export default new ResultView()