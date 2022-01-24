const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE item (
            width INTEGER, 
            height INTEGER,
            content TEXT
            )`,
            (err) => {
                if (err) {
                    // Table already created
                    // console.log(err)
                } else {
                    // Table just created, creating some rows
                    const insert = 'INSERT INTO item (width, height, content) VALUES (?,?,?)';
                    db.run(insert, [100, 150, 'Hello'])
                    db.run(insert, [150, 100, 'World'])
                }
            });
    }
});


module.exports = db
