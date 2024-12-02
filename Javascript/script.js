import { chooseSet, displayCardList, indexPage, cardsList } from "./cardsList.mjs"

const grimoireImage = document.querySelector(".grimoire-image")
const leftSection = document.querySelector(".left-section")
const rightSection = document.querySelector(".right-section")
const nextPageButton = document.querySelector(".next-page-button")
const previousPageButton = document.querySelector(".previous-page-button")

chooseSet()

nextPageButton.addEventListener("click", ()=> { // ajoute un écouteur d'évenements "clique" sur bouton suivant
    indexPage.index ++
    displayCardList(cardsList, indexPage.index)
})
previousPageButton.addEventListener("click", ()=> { // ajoute un écouteur d'évenements "clique" sur bouton précédent
    indexPage.index --
    displayCardList(cardsList, indexPage.index)
})

export {
    grimoireImage, leftSection, rightSection, nextPageButton, previousPageButton
}