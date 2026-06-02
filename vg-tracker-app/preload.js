const { contextBridge, ipcRenderer } = require("electron")

//Expose the database functions as "api"
contextBridge.exposeInMainWorld('api', {
    getAll: () => ipcRenderer.invoke('get-all'), //Do something on the get-all channel when api.getAll() is called
    deleteAll: () => ipcRenderer.send('delete-all'),
    addEntry: (id, name, cover, release_date) => ipcRenderer.send('add-entry', id, name, cover, release_date), //Do something on the add-entry channel when api.addEntry() is called
    deleteEntry: (id) => ipcRenderer.send('delete-entry', id)
})