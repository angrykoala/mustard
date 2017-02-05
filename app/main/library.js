"use strict";

const fs = require('fs');
const path = require('path');

const TagReader = require('./tag_reader');

const config = require('../config.json');

const supportedFormats = new Set(config.formats.map(ext => "." + ext));

class Library {
    constructor() {
        this.songsCount=0;
        this.loadedLibrary = new Map();
    }


    loadFile(path) {
        TagReader(path).then((tag) => {
            this.songsCount++;
            this.loadedLibrary.set(path, [tag]);
        }).catch((err) => {
            console.err("Error: " + err);
        });
    }

    loadFolder(folder) {
        return getFolderFiles(folder).then((musicFiles) => {
            let promises = musicFiles.map((file) => {
                return TagReader(path.join(folder, file));
            });
            return Promise.all(promises).then((tags) => {
                this.songsCount+=promises.length;
                this.loadedLibrary.set(folder, tags);
                return tags;
            }).catch((err) => {
                console.err("Error: " + err); //TODO: an error should only affect 1 promise
            });
        }); //add catch here
    }
    getSongsCount() {
        return this.songsCount;
    }
}

function getFolderFiles(folder) {
    return new Promise((resolve, reject) => {
        fs.readdir(folder, (err, res) => {
            if (err) return reject(err);
            let musicFiles = res.filter((file) => {
                let extension = path.extname(file);
                return supportedFormats.has(extension);
            });
            return resolve(musicFiles);
        });
    });
}

module.exports = new Library();
