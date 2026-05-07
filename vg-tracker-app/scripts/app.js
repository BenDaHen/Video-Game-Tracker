//Dummy Data
let dummy_title = "Trails in the Sky First Chapter"
let dummy_cover_art = "https://images.igdb.com/igdb/image/upload/t_cover_big/co96kj.webp"
let dummy_release_date = "September 19, 2025"
let dummy_price = 59.99

//Get Buttons
let updateBtn = document.getElementById("update-button")
let deleteBtn = document.getElementById("delete-button")

//Get other Data
let gameTitle = document.getElementById("title-1")
let gameCA = document.getElementById("cover-art-1")
let gameRD = document.getElementById("release-date-1")
let gamePrice = document.getElementById("price-1")

updateBtn.addEventListener("click", function() {
    gameTitle.textContent = dummy_title
    gameCA.src = dummy_cover_art
    gameRD.textContent = dummy_release_date
    gamePrice.textContent = dummy_price
})

deleteBtn.addEventListener("click", function() {
    gameTitle.textContent = "Game Title"
    gameCA.src = "./images/cat.jpg"
    gameRD.textContent = "Release Date"
    gamePrice.textContent = "Price"
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
            body: `search "${game}"; fields name;`
        })
        //Get the Error Message
        if(!response.ok) {
            throw new Error(`Response Status: ${response.status}`)
        }

        //Get the response as a JSON object
        const result = await response.json()

        //Iterate through the result for each individual game and update HTML
        for (let i = 0; i < result.length; i++) {
            searchResults += `
                <p>Game ID: ${result[i].id}</p>
                <p>Game Name: ${result[i].name}</p>
            `

            //Store the game ids for cover art and release date API cals
            gameIDs.push(result[i].id)
        }

    //Print the error message
    } catch (error) {
        console.error(error.message)
    }

    try {
        //Call the covers API with specified fields in the body
        const response = await fetch(cover_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': 'k7bfoqx7zwlvv5q6bdyrhq2gzapd69',
                'Authorization': 'Bearer 6gn8xu1u1exw9vgogrxnqpsqzvr3jf'
            },
            body: `fields image_id; where game=(${gameIDs[0]}, ${gameIDs[1]}, ${gameIDs[2]}, ${gameIDs[3]}, ${gameIDs[4]}, ${gameIDs[5]}, ${gameIDs[6]}, ${gameIDs[7]}, ${gameIDs[8]}, ${gameIDs[9]});`
        })
        //Get the Error Message
        if(!response.ok) {
            throw new Error(`Response Status: ${response.status}`)
        }

        //Get the response as a JSON object
        const result = await response.json()

        //Iterate through the result for each individual game and update HTML
        for (let i = 0; i < result.length; i++) {
            searchResults += `
                <image src='https://images.igdb.com/igdb/image/upload/t_cover_big/${result[i].image_id}.jpg'>
            `
        }

        //Print the error message
    } catch (error) {
        console.error(error.message)
    }

    try {
        //Call the release date API with specified fields in the body
        const response = await fetch(release_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': 'k7bfoqx7zwlvv5q6bdyrhq2gzapd69',
                'Authorization': 'Bearer 6gn8xu1u1exw9vgogrxnqpsqzvr3jf'
            },
            body: `fields human; where game=(${gameIDs[0]}, ${gameIDs[1]}, ${gameIDs[2]}, ${gameIDs[3]}, ${gameIDs[4]}, ${gameIDs[5]}, ${gameIDs[6]}, ${gameIDs[7]}, ${gameIDs[8]}, ${gameIDs[9]});`
        })
        //Get the Error Message
        if(!response.ok) {
            throw new Error(`Response Status: ${response.status}`)
        }

        //Get the response as a JSON object
        const result = await response.json()

        //Iterate through the result for each individual game and update HTML
        for (let i = 0; i < result.length; i++) {
            searchResults += `
                <p>Release Date: ${result[i].human}</p>
            `
        }

        //Print the error message
    } catch (error) {
        console.error(error.message)
    }

    searchResultsEl.innerHTML = searchResults
}