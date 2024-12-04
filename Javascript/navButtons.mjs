import { displayCardList, cardsList } from "./cardsList.mjs"
import { displayArtists } from "./displayArtists.mjs"
import { nextPageButton, previousPageButton } from "./script.mjs"
import { displaySetsList, setsList } from "./setsList.mjs"
import { artistList } from "./displayArtists.mjs"

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
        case "artists":
            displayArtists(artistList, myBookmark.index)
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