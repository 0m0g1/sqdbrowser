const path = require("path");
const {app, BrowserWindow, ipcMain, dialog} = require("electron/main");
const {dbManager} = require("./scripts/databasemaganer");

const databaseManager = new dbManager();
const pathToPages = path.join(__dirname, "pages");



function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    ipcMain.on("database-chosen", (event)=> {
        dialog.showOpenDialog(mainWindow, {
            properties: ["openFile"],
            title: "Select an sqlite database",
            filters: [
                {name: "SQlite database", extensions: "db"}
            ]
        })
        .then((result) => {
            const filePath = result.filePaths[0];
            if (filePath) {
                const database = databaseManager.openDatabase(filePath);
                databaseManager.getTableNames(database, (err, tableNames) => {
                    console.log(err, tableNames)
                    if (err) {
                        console.error(`Failed to get the table names`)
                    }
                    console.log(tableNames);
                })
                databaseManager.closeDatabase(database);
            } else {
                console.error(`There was an error fetching the file`)
            }
        })
        .catch((err) => {
            console.error(`There was an error opening the file dialoge: ${err}`);
        })
    })    

    mainWindow.loadFile(path.join(pathToPages, "index.html"));
}

app.on("ready", () => {
    createWindow();
})

app.on("window-all-closed", ()=> {
    if (process.platform !== "darwin") {
        app.quit();
    }
})