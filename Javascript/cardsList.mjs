import { nextPageButton, previousPageButton, leftSection, rightSection } from "./script.js"
import { displayCard } from "./singleCard.mjs"

const cardsList = [] //liste des cartes à afficher

const indexPage = {
    index : 0  //index de la page sur laquelle on est
}

async function chooseSet() {
    await getCardsList()
    displayCardList(cardsList, indexPage.index)
}

async function getCardsList(){
    let url = "https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Ablb&unique=prints"
    let i = 0
    let response
    let json
    
    do {
        response = await fetch(url)
        json = await response.json()
        
        for (const card of json.data){ //pour chaque carte dans la liste de cartes
            cardsList.push(card) //ajoute la carte dans le tableau "cardsList"
        }
 
        console.log("json.data", json.data)
        i ++

        if (json.has_more){ //est ce qu'il y a une page en plus?
            url = json.next_page //si oui change url pour celle de la page d'après
        }
    } while (json.has_more && i < 10)
    
    console.log("cardList", cardsList)
}

function displayCardList(myList, myPage) { //affiche la liste de cartes
    leftSection.innerHTML = ""
    rightSection.innerHTML = ""
    
    disableNavButton()

    myPage = myPage * 12
    for (let i = myPage; i < myPage + 6; i++){
        if (i < cardsList.length){
            const cardSmall = document.createElement("div")
            cardSmall.classList.add("card-small")
            leftSection.appendChild(cardSmall)
            const button = document.createElement("button")
            const id = myList[i].id
            button.addEventListener("click", ()=> {// écoute si clique sur un bouton carte
                displayCard(id)
            })
            cardSmall.appendChild(button)
            const imageCard = document.createElement("img")
            imageCard.src = myList[i].image_uris.small
            button.appendChild(imageCard)
            const nameCard = document.createElement("p")
            nameCard.innerText = myList[i].name
            cardSmall.appendChild(nameCard)  
        }
    }

    for (let i = myPage + 6; i < myPage + 12; i++){
        if (i < cardsList.length){
            const cardSmall = document.createElement("div")
            cardSmall.classList.add("card-small")
            rightSection.appendChild(cardSmall)
            const button = document.createElement("button")
            const id = myList[i].id
            button.addEventListener("click", ()=> {
                displayCard(id)
            })
            cardSmall.appendChild(button)
            const imageCard = document.createElement("img")
            imageCard.src = myList[i].image_uris.small
            button.appendChild(imageCard)
            const nameCard = document.createElement("p")
            nameCard.innerText = myList[i].name
            cardSmall.appendChild(nameCard)
        }
    }
}

function disableNavButton(){
    
    if (indexPage.index > cardsList.length/12 - 1){
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
    chooseSet, displayCardList, indexPage, cardsList
}