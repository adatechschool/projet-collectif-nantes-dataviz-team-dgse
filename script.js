const grimoireImage = document.querySelector(".grimoire-image")


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



grimoireButton.addEventListener('click', ()=>{ //ouvre notre grimoire
    grimoireButton.classList.add("open")
    grimoireImage.src = "grimoire_ouvert.jpg"
    grimoireButton.disabled = true
})
const leftSection = document.querySelector(".left-section")
//appeler les infos d'une carte
async function displayCard(info) {
    try {
        const response = await fetch(`https://api.scryfall.com/cards/${info}`);
        const infoCard = await response.json();
   
        console.log(infoCard.image_uris.large);
   
        const imgContainer = document.createElement("img");
        imgContainer.src = infoCard.image_uris.normal; 
        imgContainer.alt = infoCard.name 
        
        leftSection.appendChild(imgContainer);

        const dataContainer = document.createElement("p");

    } catch (error) {
        console.error("Carte non trouvée", error);
    }
}

displayCard('df6317b0-15fd-4924-9302-41bed2354546');
