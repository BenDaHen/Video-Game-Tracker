const { contextBridge, ipcRenderer } = require("electron")

//Expose the database functions as "api"
contextBridge.exposeInMainWorld('api', {
    getNames: () => ipcRenderer.invoke('get-names')
})