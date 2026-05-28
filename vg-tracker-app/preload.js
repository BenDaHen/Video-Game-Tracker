const { contextBridge, ipcRenderer } = require("electron")

//Expose the database functions as "api"
contextBridge.exposeInMainWorld('api', {
    getNames: () => ipcRenderer.invoke('get-names') //Do something on the get-names channel when api.getNames() is called
})