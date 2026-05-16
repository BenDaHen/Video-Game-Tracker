//Electron Import
const { app, BrowserWindow } = require('electron')

//Function to create the browser window
const createWindow = () => {
    const win = new BrowserWindow({
        width: 600,
        height: 280
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