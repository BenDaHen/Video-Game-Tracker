//Electron Import
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const sqlite = require('better-sqlite3')

//Change the app name
app.setName('Video Game Tracker')

//Function to create the browser window
const createWindow = () => {
    const win = new BrowserWindow({
        width: 530,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            sandbox: true,
        }
    })

    //Create/retrieve the Database
    const db = new sqlite("./tracker.db")

    //Handle get all
    ipcMain.handle("get-all", (event, args) => { //Listening on the get-all channel
        //Perform the required query and return the result
        const query = "SELECT * FROM games"
        let statement = db.prepare(query)
        let result = statement.all()
        return result
    })

    //Handle adding a new entry
    ipcMain.on("add-entry", (event, id, name, cover, release_date) => { //Listening on the get-names channel
        //Perform the required query and return the result
        const query = `
            INSERT INTO games(id, name, cover, release_date)
            VALUES(${id}, '${name}', '${cover}', '${release_date}')
        `

        db.exec(query)
    })

    //Handle deleting an entry
    ipcMain.on("delete-entry", (event, id) => {
        const query = `DELETE FROM games WHERE id=${id}`
        db.exec(query)
    })

    //Use the following HTML file
    win.loadFile('index.html')

    //Disable the menu bar up top
    win.setMenuBarVisibility(false)
}

//Wait for the app to load, then create the window
app.whenReady().then(() => {
    createWindow()
})