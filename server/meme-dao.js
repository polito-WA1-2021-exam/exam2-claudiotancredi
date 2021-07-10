'use strict';
/* Data Access Object (DAO) module for accessing users */

const db = require('./db');

exports.retrieveAll = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT memes.id, memes.title, images.url, memes.sentence1, memes.sentence2, memes.sentence3, images.cssSentencesPosition, memes.cssFontClass, memes.cssColourClass, memes.protected, users.name, memes.user FROM memes, images, users WHERE memes.bgImage=images.id AND memes.user=users.id";
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

exports.retrieveOnlyPublic = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT memes.id, memes.title, images.url, memes.sentence1, memes.sentence2, memes.sentence3, images.cssSentencesPosition, memes.cssFontClass, memes.cssColourClass, memes.protected, users.name, memes.user FROM memes, images, users WHERE memes.protected=0 AND memes.bgImage=images.id AND memes.user=users.id";
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

exports.deleteByID = (id, user) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM memes WHERE id = ? AND user = ?';
        db.run(sql, [id, user], function (err) {
            if (err)
                reject(err);
            else if (this.changes === 0)
                reject({
                    errors: [{
                        value: id, msg: "The specified id does not point to any resource on the server. Please be sure to point to an existing resource",
                        param: "id", location: "params"
                    }]
                })
            else
                resolve();
        });
    });
}

exports.insertMeme = (meme, user) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO memes (title, bgImage, sentence1, sentence2, sentence3, cssFontClass, cssColourClass, protected, user) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.run(sql, [meme.title, meme.imageId, meme.sentence1, meme.sentence2, meme.sentence3, meme.cssFontClass, meme.cssColourClass, meme.prot, user], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.lastID);
        });
    });
};