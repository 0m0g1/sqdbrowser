const sqlite3 = require("sqlite3");

function openDatabase(pathToDatabase) {
    return new sqlite3.Database(pathToDatabase);
}

function closeDatabase(database) {
    database.close((err) => {
        if (err) {
            console.error(`There was error closing the database`);
        }
        console.log(`Successfully closed the database`);
    })
}

function getTableNames(database, callback) {
    database.all(`SELECT name FROM sqlite_master WHERE type="table"`, (err, tables) => {
        if (err) {
            console.error(`There was an error fetching the table names: ${err}`);
            callback(err, null);
        }
        const tableNames = tables.map(table => table.name);
        callback(null, tableNames);
    })
}

class dbManager {
    constructor() {
        this.openDatabase = openDatabase;
        this.closeDatabase = closeDatabase;
        this.getTableNames = getTableNames;
    }
}


module.exports = {
    dbManager
}