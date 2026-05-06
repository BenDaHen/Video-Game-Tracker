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
    //Base URl
    const game_url = "https://api.igdb.com/v4/games/"
    const cover_art_url = "https://api.igdb.com/v4/covers"

    try {
        //Call the game API with specified fields in the body
        const response = await fetch(game_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': 'k7bfoqx7zwlvv5q6bdyrhq2gzapd69',
                'Authorization': 'Bearer 6gn8xu1u1exw9vgogrxnqpsqzvr3jf'
            },
            body: `search "${game}"; fields name, cover.image_id, release_date.human;`
        })
        //Get the Error Message
        if(!response.ok) {
            throw new Error(`Response Status: ${response.status}`)
        }

        //Get the response as a JSON object
        const result = await response.json()

        //Iterate through the result for each individual game and update HTML
        let searchResultsEl = document.getElementById("search-results")
        let searchResults = ""

        for (let i = 0; i < result.length; i++) {
            searchResults += `
                <p>Game ID: ${result[i].id}</p>
                <p>Game Name: ${result[i].name}</p>
            `
        }

        searchResultsEl.innerHTML = searchResults

        //Print the error message
        } catch (error) {
            console.error(error.message)
        }
}