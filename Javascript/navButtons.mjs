import { indexPage } from "./cardsList.mjs"
import { nextPageButton, previousPageButton } from "./script.mjs"

function disableNavButton(length){
    
    if (indexPage.index > length/12 - 1){
        nextPageButton.disabled = true
    }
    else{
        nextPageButton.disabled = false
    }

    if (indexPage.index < 1){
        previousPageButton.disabled = true
    }
    else{
        previousPageButton.disabled = false
    }
}

export {
    disableNavButton
}