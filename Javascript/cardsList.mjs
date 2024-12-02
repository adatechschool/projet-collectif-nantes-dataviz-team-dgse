import { leftSection, rightSection } from "./script.mjs"
import { displayCard } from "./singleCard.mjs"
import { disableNavButton } from "./navButtons.mjs"

const cardsList = [] //liste des cartes à afficher

const indexPage = {
    index : 0  //index de la page sur laquelle on est
}

async function doCardsList(urlurl) {
    leftSection.classList.remove("left-section-set")
    rightSection.classList.remove("right-section-set")
    await getCardsList(urlurl)
    displayCardList(cardsList, indexPage.index)
}

async function getCardsList(url){
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
    
    disableNavButton(cardsList.length) 

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

export {
    doCardsList, displayCardList, indexPage, cardsList, disableNavButton
}