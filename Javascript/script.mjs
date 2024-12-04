import { doCardsList, displayCardList, cardsList } from "./cardsList.mjs"
import { doSetsList } from "./setsList.mjs"
import { myBookmark, switchPage } from "./navButtons.mjs"
import { displayCard } from "./singleCard.mjs"
import { displayArtists, artistList } from "./displayArtists.mjs"

const grimoireImage = document.querySelector(".grimoire-image")
const leftSection = document.querySelector(".left-section")
const rightSection = document.querySelector(".right-section")
const rightSectionhome = document.querySelector(".right-section-homepage")
const nextPageButton = document.querySelector(".next-page-button")
const previousPageButton = document.querySelector(".previous-page-button")
const openBookButton = document.querySelector('.openBook-button')
const grimoireContainer = document.querySelector('.grimoire-container')
const searchInput = document.querySelector(".magic-ball-input")
const randomButton = document.querySelector(".random-button")
const setButton = document.querySelector(".set-button")
const rareButton = document.querySelector(".rare-button")
const colorButton = document.querySelector(".color-button")
const authorButton = document.querySelector(".author-button")
const homeButton = document.querySelector(".home-button")

openBookButton.addEventListener("click", ()=>
    {
    grimoireContainer.style.display = 'flex';
    openBookButton.style.display = 'none'
    // nextPageButton.style.display = "none"
    // previousPageButton.style.display = "none" 
    rightSection.innerHTML = `<article><h1>Mode d'emploi</h1> <p>Afin de naviguer au mieux, vous pouvez utiliser les boutons "Set", "Couleur" et "Rareté" ci dessus.</p>
                                <p>le moteur de recherche "Boule de cristal" en haut à droite peut vous aider</p></article>`;
    leftSection.innerHTML = `<article><h1>Bienvenue dans le monde magique de </h1><h2>MAGIC THE GATHERING</h2></article>`;
    doSetsList()                         
    })

// Validation en appuyant sur Entrée
searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const searchTerm = searchInput.value
        performSearch(searchTerm);
        
    }
});

function performSearch(myString) {
    
    nextPageButton.style.display = "flex"
    previousPageButton.style.display = "flex"
    if (myString === '') {
        resultMessage.textContent = 'Veuillez saisir un terme de recherche';
        resultMessage.style.color = 'red';
        return;
    }
    const url = `https://api.scryfall.com/cards/search?q=${myString}`
        doCardsList(url);   
}

nextPageButton.addEventListener("click", ()=> { // ajoute un écouteur d'évenements "clique" sur bouton suivant
    myBookmark.index ++
    switchPage()
})
previousPageButton.addEventListener("click", ()=> { // ajoute un écouteur d'évenements "clique" sur bouton précédent
    myBookmark.index --
    switchPage()
})

randomButton.addEventListener("click", ()=> {
    displayCard("random")
})

authorButton.addEventListener("click",()=> {
    displayArtists(artistList,indexPage.index)
})

export {
    grimoireImage, leftSection, rightSection, nextPageButton, previousPageButton,openBookButton, grimoireContainer, searchInput
} 