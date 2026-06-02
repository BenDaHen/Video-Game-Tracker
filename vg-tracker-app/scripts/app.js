//Render the database when opening the app
document.addEventListener('DOMContentLoaded', async () => { //Call this function when the app starts
    renderDB()
})

//Render the Database
async function renderDB() {
    console.log("Rendering the DB")
    let dbResults = await window.api.getAll() //Database functions are exposed as "api"
    let trackedGameEl = document.getElementById("tracked-games")

    //Strings to store data
    let idArray = []
    let namesArray = []
    let coverArray = []
    let releaseDateArray = []

    //Get all the ids
    dbResults.map((element) => {
        idArray.push(element.id)
    })

    //Get all the names
    dbResults.map((element) => {
        namesArray.push(element.name)
    })

    //Get all the covers
    dbResults.map((element) => {
        coverArray.push(element.cover)
    })

    //Get all the release dates
    dbResults.map((element) => {
        releaseDateArray.push(element.release_date)
    })

    //Reset the renderer
    trackedGameEl.innerHTML = ""

    //Render out each game
    for (let i = 0; i < namesArray.length; i++) {
        trackedGameEl.innerHTML += `
            <div id="${idArray[i]}">
                <div class="game-box">
                    <!-- Release Date -->
                    <div class="release-date-box">
                        <h1>${releaseDateArray[i]}</h1>
                    </div>
                    <!-- Cover Art -->
                    <div class="cover-art-box">
                        <image class="cover-art" src='${coverArray[i]}'>
                    </div>
                    <!-- Title -->
                    <div class="title-box">           
                        <h2>${namesArray[i]}</h2>
                    </div>
                </div>
                <div id=btn-${idArray[i]}>
                    <button class="add-remove-button remove-button" onclick="deleteEntry(${idArray[i]})">Remove from Tracker</button>
                </div>
            </div> 
        `
    }
}

//Add a button to delete all values in DB
function deleteAll() {
    window.api.deleteAll()
    renderDB()
}

//Insert an entry into the database
function addEntry(id, name, cover, release_date) {
    window.api.addEntry(id, name, cover, release_date)
    renderDB() //Re-render the database
}

//Delete an entry from the database
function deleteEntry(id) {
    window.api.deleteEntry(id)
    renderDB()
}

//Get Buttons
let deleteBtn = document.getElementById("delete-button")

deleteBtn.addEventListener("click", function() {
    deleteAll()
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
    //Base URl
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
            gameCovers.push(`https://images.igdb.com/igdb/image/upload/t_cover_big/${result[i].cover?.image_id}.jpg`) //API provides a placeholder image when one does not exist
            gameDates.push(result[i].release_dates?.[0]?.human || "TBD") //If a release date exists and is not falsy, get the human value at index 0, otherwise "TBD"
        }

    //Print the error message
    } catch (error) {
        console.error(error.message)
    }

    //Create search results HTML and update element
    for(let i = 0; i < gameIDs.length; i++) {
        //Check if the game is already in the tracker
        let dbResults = await window.api.getAll()
        let idArray = []

        dbResults.map((element) => {
            idArray.push(element.id)
        })

        //Search result if game is in the database
        if(idArray.includes(gameIDs[i]) === true) {
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
                                <image class="cover-art" src='${gameCovers[i]}'>
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
        //Search result if game is not in the database
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
                                <image class="cover-art" src='${gameCovers[i]}'>
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

    //Clear search results
    let searchResultsEl = document.getElementById("search-results")
    searchResultsEl.innerHTML = ""

    //Append to DB
    addEntry(gameID, gameName, gameCover, gameReleaseDate)
}