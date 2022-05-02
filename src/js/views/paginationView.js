import icons from "../../img/icons.svg"
import View from "./View"

class PaginationView extends View{
    _parentEl = document.querySelector(".pagination");
    _generateMarkUp(){
        const totalPages = Math.ceil(this._data.results.length / this._data.searchResultPerPage)
        const currentPage = this._data.page
        
        const btnPre =  `
        <button class="btn--inline pagination__btn--prev" data-goto="${currentPage - 1}">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
        </button>
        `
        const btnNext =  `
        <button class="btn--inline pagination__btn--next" data-goto="${currentPage + 1}">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </button>
        `
        console.log(totalPages);
        //page 1, there are other pages
        if(totalPages > 1 && currentPage === 1) return btnNext
        //on page 1, there are no other pages
        if(totalPages ===1) return "";
       
        //on page 2 and up, there are other pages
        if(totalPages > 1 && currentPage > 1 && currentPage < totalPages) return btnPre + btnNext
        //last page
        if(totalPages > 1 && currentPage === totalPages) return btnPre

        
    }
    addHanderClick(handler){
        this._parentEl.addEventListener("click", function(e){
            const btn = e.target.closest(".btn--inline")
            if(!btn) return;
            const goToPage = +btn.dataset.goto
            console.log(goToPage);
            handler(goToPage)

           

            // document.querySelectorAll(".preview").forEach(el=> el.classList.remove("preview__link--active"))
            // e.target.closest(".preview").classList.add("preview__link--active")
        })
      }

}

export default new PaginationView()