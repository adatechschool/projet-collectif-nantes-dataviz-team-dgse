const grimoireImage = document.querySelector(".grimoire-image")
const leftSection = document.querySelector(".left-section")
const rightSection = document.querySelector(".right-section")
const nextPageButton = document.querySelector(".next-page-button")

let cardsList = [] 

nextPageButton.addEventListener("click", ()=> {
    
})

async function game() {
    const cardList = await getCardsList()
    displayCardList(cardList)
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
    return cardsList
}

function displayCardList(myList) {
    console.log(myList[0].name)
    console.log(myList[0].image_uris.small)
    for (i = 0; i < 6; i++){
        leftSection.innerHTML += `<div class="card-small"><img src="${myList[i].image_uris.small}">
                                <div>${myList[i].name}<div/><div/><br>`
    }

    for (i = 6; i < 12; i++){
        rightSection.innerHTML += `<div class="card-small"><img src="${myList[i].image_uris.small}">
                                <div>${myList[i].name}<div/><div/><br>`
    }
}

game()










//appeler les infos d'une carte
async function displayCard(info) {
    try {
        const response = await fetch(`https://api.scryfall.com/cards/${info}`);
        const infoCard = await response.json();
   
        //console.log(infoCard.image_uris.large);
   
        const imgContainer = document.createElement("img");
        imgContainer.src = infoCard.image_uris.normal; 
        imgContainer.alt = infoCard.name 
        
        leftSection.appendChild(imgContainer);

        const dataContainer = document.createElement("p");

    } catch (error) {
        console.error("Carte non trouvée", error);
    }
}