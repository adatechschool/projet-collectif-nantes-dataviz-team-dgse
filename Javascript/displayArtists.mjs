import { leftSection, rightSection } from "./script.mjs"
import { myBookmark } from "./navButtons.mjs"
const artistList = []

async function displayArtists(myList, myPage) {
    artistList.length = 0
    myBookmark.chapter = "artists"
    leftSection.innerHTML = ""
    rightSection.innerHTML = ""
    leftSection.classList.add("left-section-set")
    rightSection.classList.add("right-section-set")
    myPage = myPage * 24

    
    const reponse = await fetch("https://api.scryfall.com/catalog/artist-names")
    const json = await reponse.json()

    for (const artist of json.data) {
        myList.push(artist) 
    }

    for (let i = myPage; i < myPage + 12; i++) {

        if (i < myList.length) {
            const nameArtist = document.createElement("ul")
            nameArtist.innerHTML = `<li>${myList[i]}</li></br>`
            nameArtist.classList.add("name-artist")
            leftSection.appendChild(nameArtist)
        }
    }
    
    for (let i = myPage+12; i < myPage + 24; i++){
        if (i < myList.length){   
            const nameArtist = document.createElement("ul")
            nameArtist.innerHTML = `<li>${myList[i]}</li></br>`
            nameArtist.classList.add("name-artist")
            rightSection.appendChild(nameArtist)
        }
    }    
    console.log(artistList)
}

export { 
    displayArtists, artistList 
}