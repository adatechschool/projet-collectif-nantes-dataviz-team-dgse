const grimoireButton  = document.querySelector(".grimoire-button")
const grimoireImage = document.querySelector(".grimoire-image")

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