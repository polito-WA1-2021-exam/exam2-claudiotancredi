'use strict';
/* Data Access Object (DAO) module for accessing users */

const db = require('./db');

exports.retrieveAll = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM images";
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
}