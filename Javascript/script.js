import { doCardsList, displayCardList, indexPage, cardsList } from "./cardsList.mjs"
import { displayCard } from "./singleCard.mjs"

const grimoireImage = document.querySelector(".grimoire-image")
const leftSection = document.querySelector(".left-section")
const rightSection = document.querySelector(".right-section")
const nextPageButton = document.querySelector(".next-page-button")
const previousPageButton = document.querySelector(".previous-page-button")
const randomButton = document.querySelector(".random-button")

doCardsList("https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Ablb&unique=prints")

nextPageButton.addEventListener("click", ()=> { // ajoute un écouteur d'évenements "clique" sur bouton suivant
    indexPage.index ++
    displayCardList(cardsList, indexPage.index)
})
previousPageButton.addEventListener("click", ()=> { // ajoute un écouteur d'évenements "clique" sur bouton précédent
    indexPage.index --
    displayCardList(cardsList, indexPage.index)
})

randomButton.addEventListener("click", ()=> {
    displayCard("random")
})

export {
    grimoireImage, leftSection, rightSection, nextPageButton, previousPageButton
}   