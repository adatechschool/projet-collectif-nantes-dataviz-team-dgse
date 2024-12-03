import { doCardsList, displayCardList, indexPage, cardsList } from "./cardsList.mjs"
import { displayCard } from "./singleCard.mjs"

const grimoireImage = document.querySelector(".grimoire-image")
const leftSection = document.querySelector(".left-section")
const rightSection = document.querySelector(".right-section")
const nextPageButton = document.querySelector(".next-page-button")
const previousPageButton = document.querySelector(".previous-page-button")
const randomButton = document.querySelector(".random-button")
const setButton = document.querySelector(".set-button")
const rareButton = document.querySelector(".rare-button")
const colorButton = document.querySelector(".color-button")
const setTypeButton = document.querySelector(".set-type-button")
const authorButton = document.querySelector(".author-button")
const homeButton = document.querySelector(".home-button")

const artistList = []

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

authorButton.addEventListener("click",()=> {
    displayArtists(artistList,indexPage.index)
})

async function displayArtists(myList, myPage) {
    leftSection.innerHTML = ""
    rightSection.innerHTML = ""
    myPage = myPage * 12


    const reponse = await fetch("https://api.scryfall.com/catalog/artist-names")
    const json = await reponse.json()

    for (const artist of json.data) {
        myList.push(artist) 
    }

    for (let i = myPage; i < myPage + 6; i++) {

        if (i < myList.length) {
            const nameArtist = document.createElement("p")
            nameArtist.innerText = myList[i]
            nameArtist.classList.add("name-artist")
            leftSection.appendChild(nameArtist)
        }
    }
    
    for (let i = myPage; i < myPage + 12; i++){
        if (i < myList.length){   
            const nameArtist = document.createElement("p")
            nameArtist.innerText = myList[i]
            nameArtist.classList.add("name-artist")
            rightSection.appendChild(nameArtist)
        }
    }    
    console.log(artistList)
}



export {
    grimoireImage, leftSection, rightSection, nextPageButton, previousPageButton
}   