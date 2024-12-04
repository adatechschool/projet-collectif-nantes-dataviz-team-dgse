import { disableNavButton, doCardsList } from "./cardsList.mjs"
import { leftSection, rightSection } from "./script.mjs"
import { myBookmark } from "./navButtons.mjs"

const setsList = []

async function doSetsList(){
    myBookmark.index = 0
    myBookmark.chapter = "sets"
    leftSection.classList.add("left-section-set")
    rightSection.classList.add("right-section-set")
    await getSetList()
    displaySetsList(setsList, 0)
}

async function getSetList(){
    const response = await fetch("https://api.scryfall.com/sets")
    const json = await response.json()

    for (const set of json.data){
        setsList.push(set)
    }
}

function displaySetsList(myList, myPage){
    leftSection.innerHTML = ""
    rightSection.innerHTML = ""

    disableNavButton(setsList.length)

    myPage = myPage * 18
    for (let i = myPage; i < myPage + 9; i++){
        if (i < myList.length){
            const setContainer = document.createElement("div")
            setContainer.classList.add("set-container")
            leftSection.appendChild(setContainer)
            const button = document.createElement("button")
            const url = myList[i].search_uri
            button.addEventListener("click", ()=> {// écoute si clique sur un bouton carte
                doCardsList(url)
            })
            button.classList.add("set-button")
            setContainer.appendChild(button)
            const iconSet = document.createElement("img")
            iconSet.classList.add("set-icon")
            iconSet.src = myList[i].icon_svg_uri
            button.appendChild(iconSet)
            const setName = document.createElement("p")
            setName.innerText = myList[i].name
            button.appendChild(setName)  
        }
    }

    for (let i = myPage + 9; i < myPage + 18; i++){
        if (i < myList.length){
            const setContainer = document.createElement("div")
            setContainer.classList.add("set-container")
            rightSection.appendChild(setContainer)
            const button = document.createElement("button")
            const url = myList[i].search_uri
            button.addEventListener("click", ()=> {// écoute si clique sur un bouton carte
                doCardsList(url)
            })
            button.classList.add("set-button")
            setContainer.appendChild(button)
            const iconSet = document.createElement("img")
            iconSet.classList.add("set-icon")
            iconSet.src = myList[i].icon_svg_uri
            button.appendChild(iconSet)
            const setName = document.createElement("p")
            setName.innerText = myList[i].name
            button.appendChild(setName)  
        }
    }
}



export {
    doSetsList, displaySetsList, setsList
}