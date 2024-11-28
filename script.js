const grimoireImage = document.querySelector(".grimoire-image")
const leftSection = document.querySelector(".left-section")
const rightSection = document.querySelector(".right-section")
const nextPageButton = document.querySelector(".next-page-button")
const previousPageButton = document.querySelector(".previous-page-button")

let cardsList = []
let indexPage = 0


nextPageButton.addEventListener("click", ()=> {
    indexPage ++
    displayCardList(cardsList,indexPage)
})
previousPageButton.addEventListener("click", ()=> {
    indexPage --
    displayCardList(cardsList,indexPage)
})

async function chooseSet() {
    await getCardsList()
    displayCardList(cardsList,indexPage)
}

async function getCardsList(){
    let url = "https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Ablb&unique=prints"
    let i = 0
    let response
    let json
    
    do {
        response = await fetch(url)
        json = await response.json()
        
        for (card of json.data){
            cardsList.push(card)
        }

        console.log("json.data",json.data)
        i ++

        if (json.has_more){
            url = json.next_page
        }
    } while (json.has_more && i < 10)
    
    console.log("cardList",cardsList)
}

function displayCardList(myList, myPage) {
    leftSection.innerHTML = ""
    rightSection.innerHTML = ""
    
    disableNavButton()

    myPage = myPage * 12
    for (i = myPage; i < myPage + 6; i++){
        if (i < cardsList.length){
            const cardSmall = document.createElement("div")
            cardSmall.classList.add("card-small")
            leftSection.appendChild(cardSmall)
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

    for (i = myPage + 6; i < myPage + 12; i++){
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
    
    if (indexPage > cardsList.length/12 - 1){
        nextPageButton.disabled = true
    }
    else{
        nextPageButton.disabled = false
    }

    if (indexPage < 1){
        previousPageButton.disabled = true
    }
    else{
        previousPageButton.disabled = false
    }
}

chooseSet()

//appeler les infos d'une carte
async function displayCard(id) {
    leftSection.innerHTML = ""
    rightSection.innerHTML = ""
    try {
        const response = await fetch(`https://api.scryfall.com/cards/${id}`);
        const infoCard = await response.json();
   
        //console.log(infoCard.image_uris.large);
   
        const imgContainer = document.createElement("img");
        
        imgContainer.src = infoCard.image_uris.normal;
        imgContainer.alt = infoCard.name 
        
        
        imgContainer.classList.add("card-normal")
        leftSection.appendChild(imgContainer);
        

        const dataContainer = document.createElement("p");
        dataContainer.innerHTML =`<article><h1>${infoCard.name}</h1></br><p><u><strong>Mana</u></strong></br><p>${infoCard.mana_cost}</p></br></p><p><u><strong>Type</u></strong></br><p>${infoCard.type_line}</p></br><p><u><strong>Effet</u></strong></br><p>${infoCard.oracle_text}</p></br><p><u><strong>Att/Def</u></strong></br><p>${infoCard.power||"-"} / ${infoCard.toughness||"-"}</p></br><p><u><strong>Rareté</u></strong></br><p>${infoCard.rarity}</p></br><p><u><strong>Collection</u></strong></br><p>${infoCard.set_name}</p></br><p><u><strong>Couleur</u></strong></br><p>${infoCard.colors}</p></br><p><u><strong>Citation</u></strong></br><p>${infoCard.flavor_text||""}</p></br><p><u><strong>Artiste / Année</u></strong></br><p>${infoCard.artist||""} / ${infoCard.frame||""}</p></article>`;
        dataContainer.classList.add("card-normal-text")
        rightSection.appendChild(dataContainer)
        

    } catch (error) {
        console.error("Carte non trouvée", error);
    }
}