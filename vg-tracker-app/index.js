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
        }
    })

    //Create a new Database
    const db = new sqlite("./tracker.db")

    //Handle get names
    ipcMain.handle("get-names", (event, args) => {
        const query = "SELECT name FROM games"
        let statement = db.prepare(query)
        let result = statement.all()
        return result
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

