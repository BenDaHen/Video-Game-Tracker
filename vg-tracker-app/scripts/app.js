//Database Test
document.addEventListener('DOMContentLoaded', async () => { //Call this function when the app starts
    console.log("Testing the DB")
    let names = await window.api.getNames() //Database functions are exposed as "api"
    // let covers = await window.api.getCover()

    let namesEl = document.getElementById("db-test")

    let nameString = names.map((element) => {
        return element.name
    }).join("<br />")

    // let coversString = covers.map((element) => {
    //     return element.cover
    // }).join("<br />")
    
    namesEl.innerHTML = nameString
    // names.innerHTML += coversString
})

async function renderDB() {
    console.log("Testing the DB")
    let names = await window.api.getNames() //Database functions are exposed as "api"
    // let covers = await window.api.getCover()

    let namesEl = document.getElementById("db-test")

    let nameString = names.map((element) => {
        return element.name
    }).join("<br />")

    // let coversString = covers.map((element) => {
    //     return element.cover
    // }).join("<br />")
    
    namesEl.innerHTML = nameString
    // names.innerHTML += coversString
}

//Insert an entry into the database
function addEntry(id, name, cover, release_date) {
    window.api.addEntry(id, name, cover, release_date)
    renderDB() //Re-render the database
}

//Dummy Data
let dummy_title = "Trails in the Sky First Chapter"
let dummy_cover_art = "https://images.igdb.com/igdb/image/upload/t_cover_big/co96kj.webp"
let dummy_release_date = "September 19, 2025"

//Get Buttons
let updateBtn = document.getElementById("update-button")
let deleteBtn = document.getElementById("delete-button")

//Get other Data
let gameTitle = document.getElementById("title-1")
let gameCA = document.getElementById("cover-art-1")
let gameRD = document.getElementById("release-date-1")

updateBtn.addEventListener("click", function() {
    gameTitle.textContent = dummy_title
    gameCA.src = dummy_cover_art
    gameRD.textContent = dummy_release_date
})

deleteBtn.addEventListener("click", function() {
    gameTitle.textContent = "Game Title"
    gameCA.src = "./images/cat.jpg"
    gameRD.textContent = "Release Date"
})

//Get Search Bar info
let searchBar = document.getElementById("search-bar")
let searchBarButton = document.getElementById("search-bar-button")

searchBarButton.addEventListener("click", function() {
    callAPI(searchBar.value)
})

//Tracked game IDs for later use
let trackedGameIDs = []

async function callAPI(game) {
    //Base URls
    const game_url = "https://api.igdb.com/v4/games/"

    //Search Results
    let gameIDs = []
    let gameNames = []
    let gameCovers = []
    let gameDates = []
    let searchResults = ""
    let searchResultsEl = document.getElementById("search-results")

    try {
        //Call the game API with specified fields in the body
        const response = await fetch(game_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': 'k7bfoqx7zwlvv5q6bdyrhq2gzapd69',
                'Authorization': 'Bearer 6gn8xu1u1exw9vgogrxnqpsqzvr3jf'
            },
            body: `search "${game}"; fields name, release_dates.human, cover.image_id;`
        })
        //Get the Error Message
        if(!response.ok) {
            throw new Error(`Response Status: ${response.status}`)
        }

        //Get the response as a JSON object
        const result = await response.json()

        console.log(result.length)


        //Iterate through the result for each individual game and get the ids and names
        for (let i = 0; i < result.length; i++) {
            //Store the game ids for cover art and release date API calls
            gameIDs.push(result[i].id)
            gameNames.push(result[i].name)
            gameCovers.push(result[i].cover?.image_id)
            gameDates.push(result[i].release_dates?.[0]?.human || "TBD") //If a release date exists and is not falsy, get the human value at index 0, otherwise "TBD"
        }

    //Print the error message
    } catch (error) {
        console.error(error.message)
    }

    //Create search results HTML and update element
    for(let i = 0; i < gameIDs.length; i++) {
        //Check if the game is already in the tracker
        if(trackedGameIDs.includes(gameIDs[i]) === true) {
            searchResults += `
                <div id="searched-game-${i}">
                    <div id="${gameIDs[i]}">
                        <div class="game-box">
                            <!-- Release Date -->
                            <div class="release-date-box">
                                <h1>${gameDates[i]}</h1>
                            </div>
                            <!-- Cover Art -->
                            <div class="cover-art-box">
                                <image class="cover-art" src='https://images.igdb.com/igdb/image/upload/t_cover_big/${gameCovers[i]}.jpg'>
                            </div>
                            <!-- Title -->
                            <div class="title-box">           
                                <h2>${gameNames[i]}</h2>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>Game already on list</p>
                    </div>
                </div>   
            `
        }
        //Otherwise add the game
        else {
            searchResults += `
            <div id="searched-game-${i}">
                <div id="${gameIDs[i]}">
                    <div class="game-box">
                        <!-- Release Date -->
                        <div class="release-date-box">
                            <h1>${gameDates[i]}</h1>
                        </div>
                        <!-- Cover Art -->
                        <div class="cover-art-box">
                            <image class="cover-art" src='https://images.igdb.com/igdb/image/upload/t_cover_big/${gameCovers[i]}.jpg'>
                        </div>
                        <!-- Title -->
                        <div class="title-box">           
                            <h2>${gameNames[i]}</h2>
                        </div>
                    </div>
                </div>
                <div>
                    <button class="add-remove-button add-button" onclick="addGame(${i}, ${gameIDs[i]}, '${gameNames[i]}', '${gameCovers[i]}', '${gameDates[i]}')">Add to Tracker</button>
                </div>
            </div> 
            `
        }
    }

    searchResultsEl.innerHTML = searchResults
}

//Add a search result to the main tracker
function addGame(gameNumber, gameID, gameName, gameCover, gameReleaseDate) {
    console.log("Calling addGame Function")
    //Tracker for number of games on list

    //Get the game to be added
    let searchedGameEl = document.getElementById(`${gameID}`)

    //Get the current tracked games
    let trackedGamesEl = document.getElementById("tracked-games")

    //Add the game
    let newGame = searchedGameEl.outerHTML

    console.log("Searched game outer HTML: " + searchedGameEl.outerHTML)

    trackedGamesEl.innerHTML += newGame

    //Add the remove button
    trackedGamesEl.innerHTML += `
        <div id=btn-${gameID}>
            <button class="add-remove-button remove-button" onclick="removeGame(${gameID})">Remove from Tracker</button>
        </div>
    `

    //Add the game ID to tracked games list
    trackedGameIDs.push(gameID)

    //Clear search results
    let searchResultsEl = document.getElementById("search-results")
    searchResultsEl.innerHTML = ""

    //Append to DB
    addEntry(gameID, gameName, gameCover, gameReleaseDate)
}

//Remove a game from the main tracker
function removeGame(gameID) {
    //Get the game to be removed
    let trackedGameEl = document.getElementById(`${gameID}`)
    let removeButtonEl = document.getElementById(`btn-${gameID}`)

    //Remove the element from the tracked games array
    let position = trackedGameIDs.indexOf(gameID)
    trackedGameIDs.splice(position, 1) //Remove 1 element at the position of the gameID

    //Remove the game HTML from the tracker
    trackedGameEl.outerHTML = ""
    removeButtonEl.outerHTML = ""
}