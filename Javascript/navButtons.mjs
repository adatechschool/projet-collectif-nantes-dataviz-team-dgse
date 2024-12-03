import { displayCardList, cardsList } from "./cardsList.mjs"
import { nextPageButton, previousPageButton } from "./script.mjs"
import { displaySetsList, setsList } from "./setsList.mjs"

const myBookmark = {
    index: 0,
    chapter:""
}

function switchPage(){
    switch (myBookmark.chapter){
        case "cards":
            displayCardList(cardsList, myBookmark.index)
            break
        case "sets":
            displaySetsList(setsList, myBookmark.index)
            break
    }
}

function disableNavButton(length){
    
    if (myBookmark.index > length/12 - 1){
        nextPageButton.disabled = true
    }
    else{
        nextPageButton.disabled = false
    }

    if (myBookmark.index < 1){
        previousPageButton.disabled = true
    }
    else{
        previousPageButton.disabled = false
    }
}

export {
    disableNavButton, myBookmark, switchPage
}