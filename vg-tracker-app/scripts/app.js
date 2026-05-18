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

async function callAPI(game) {
    //Base URls
    const game_url = "https://api.igdb.com/v4/games/"
    const cover_url = "https://api.igdb.com/v4/covers"
    const release_url = "https://api.igdb.com/v4/release_dates"

    //Search Results and store IDs for later calls
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
            gameCovers.push(`<image class="cover-art" src='https://images.igdb.com/igdb/image/upload/t_cover_big/${result[i].cover?.image_id}.jpg'>`)
            gameDates.push(result[i].release_dates?.[0]?.human || "TBD") //If a release date exists and is not falsy, get the human value at index 0, otherwise "TBD"
        }

    //Print the error message
    } catch (error) {
        console.error(error.message)
    }

    //Create search results HTML and update element
    for(let i = 0; i < gameIDs.length; i++) {
        searchResults += `
            <div class="game-box">
                <!-- Release Date -->
                <div class="release-date-box">
                    <h1>${gameDates[i]}</h1>
                </div>
                <!-- Cover Art -->
                <div class="cover-art-box">
                    ${gameCovers[i]}
                </div>
                <!-- Title -->
                <div class="title-box">           
                    <h2>${gameNames[i]}</h2>
                </div>
            </div>
        `
        //<p>ID: ${gameIDs[i]}</p>
    }

    searchResultsEl.innerHTML = searchResults
}