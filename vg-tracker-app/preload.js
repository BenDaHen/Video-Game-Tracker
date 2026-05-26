const testMgr = require("./models/testmgr")
const {contextBridge} = require("electron")

const getNames = () => {
    return testMgr.getNames()
}

contextBridge.exposeInMainWorld("api", {
    getNames: getNames
})