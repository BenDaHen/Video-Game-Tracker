//Electron Import
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const sqlite = require('better-sqlite3')

//Function to create the browser window
const createWindow = () => {
    const win = new BrowserWindow({
        width: 600,
        height: 280,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            sandbox: true,
        }
    })

    //Create/retrieve the Database
    const db = new sqlite("./tracker.db")

    //Handle get names
    ipcMain.handle("get-names", (event, args) => { //Listening on the get-names channel
        //Perform the required query and return the result
        const query = "SELECT name FROM games"
        let statement = db.prepare(query)
        let result = statement.all()
        return result
    })

    //Handle get cover
    ipcMain.handle("get-covers", (event, args) => { //Listening on the get-names channel
        //Perform the required query and return the result
        const query = "SELECT cover FROM games"
        let statement = db.prepare(query)
        let result = statement.all()
        return result
    })

    //Handle adding a new entry
    ipcMain.on("add-entry", (event, id, name, cover, release_date) => { //Listening on the get-names channel
        //Perform the required query and return the result
        console.log("Adding Entry to Database")
        console.log(`ID: ${id}`)
        console.log(`Name: '${name}'`)
        console.log(`Cover: '${cover}'`)
        console.log(`Release Date: '${release_date}'`)
        const query = `
            INSERT INTO games(id, name, cover, release_date)
            VALUES(${id}, '${name}', '${cover}', '${release_date}')
        `
        // let statement = db.prepare(query)
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