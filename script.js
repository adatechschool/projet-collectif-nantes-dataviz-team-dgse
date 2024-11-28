const grimoireImage = document.querySelector(".grimoire-image")

//////////Maison de Grace
//
///////////////////////

const leftSection = document.querySelector(".left-section")

async function getCardsList(){
    const response = await fetch("https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Ablb&unique=prints")
    const json = await response.json()
    console.log(json)
    return json
}

async function game() {
const cardList = await getCardsList()
displayCard(cardList)
}

function displayCard(myList) {
console.log(myList.data[0].name)
console.log(myList.data[0].image_uris.small)
for (i = 0; i < 6; i++){
    leftSection.innerHTML += `<div class="card-small"><img src="${myList.data[i].image_uris.small}">
                             <div>${myList.data[i].name}<div/><div/><br>`
}
}

//for 0 a 1 en j
// for de 0 8 en i
// j ++

game()

//une conteneur avec 2 div dedans par carte



