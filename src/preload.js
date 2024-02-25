const {contextBridge, ipcRenderer} = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
    openDatabaseSelectDialogue: ()=> ipcRenderer.send("database-chosen")
})