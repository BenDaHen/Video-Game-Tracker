const { contextBridge, ipcRenderer } = require("electron")

//Expose the database functions as "api"
contextBridge.exposeInMainWorld('api', {
    getNames: () => ipcRenderer.invoke('get-names'), //Do something on the get-names channel when api.getNames() is called
    getCovers: () => ipcRenderer.invoke('get-covers'), //Do something on the get-covers channel when api.getCovers() is called
    addEntry: (id, name, cover, release_date) => ipcRenderer.send('add-entry', id, name, cover, release_date) //Do something on the add-entry channel when api.addEntry() is called
})