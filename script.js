const grimoireImage = document.querySelector(".grimoire-image")
const leftSection = document.querySelector(".left-section")


async function game() {
    const cardList = await getCardsList()
    displayCardList(cardList)
}

async function getCardsList(){
    const response = await fetch("https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Ablb&unique=prints")
    const json = await response.json()
    console.log(json)
    return json
}

function displayCardList(myList) {
console.log(myList.data[0].name)
console.log(myList.data[0].image_uris.small)
for (i = 0; i < 6; i++){
    leftSection.innerHTML += `<div class="card-small"><img src="${myList.data[i].image_uris.small}">
                             <div>${myList.data[i].name}<div/><div/><br>`
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