const grimoireButton  = document.querySelector(".grimoire-button")
const grimoireImage = document.querySelector(".grimoire-image")

grimoireButton.addEventListener('click', ()=>{ //ouvre notre grimoire
    grimoireButton.classList.add("open")
    grimoireImage.src = "grimoire_ouvert.jpg"
    grimoireButton.disabled = true
})
