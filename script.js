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




const leftSection = document.querySelector(".left-section")
const rightSection = document.querySelector(".right-section")
//appeler les infos d'une carte
async function displayCard(info) {
    try {
        const response = await fetch(`https://api.scryfall.com/cards/${info}`);
        const infoCard = await response.json();
   
        //console.log(infoCard.image_uris.large);
   
        const imgContainer = document.createElement("img");
        
        imgContainer.src = infoCard.image_uris.normal;
        imgContainer.alt = infoCard.name 
        
        
        imgContainer.classList.add("card-normal")
        leftSection.appendChild(imgContainer);
        

        const dataContainer = document.createElement("p");
        dataContainer.innerHTML +=`<article><h2>${item.sign}</h2><p>${item.description}</p></article>`;


    } catch (error) {
        console.error("Carte non trouvée", error);
    }
}

displayCard('df6317b0-15fd-4924-9302-41bed2354546');
