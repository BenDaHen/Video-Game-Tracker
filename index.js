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