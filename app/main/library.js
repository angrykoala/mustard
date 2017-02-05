"use strict";

const fs = require('fs');
const path = require('path');

const TagReader = require('./tag_reader');

const config = require('../config.json');

const supportedFormats = new Set(config.formats.map(ext => "." + ext));

console.log("Library file");

class Library {
    constructor() {
        console.log("constructor");
        this.loadedLibrary = new Map();
    }


    loadFile(path) {
        TagReader(path).then((tag) => {
            this.loadedLibrary.set(path, [tag]);
        }).catch((err) => {
            console.err("Error: " + err);
        });
    }

    loadFolder(folder) {
        console.log("Load Folder");
        return getFolderFiles(folder).then((musicFiles) => {
            console.log("then");
            let promises = musicFiles.map((file) => {
                return TagReader(path.join(folder, file));
            });
            console.log("promises",promises.length);
            return Promise.all(promises).then((tags) => {
                console.log("In all");
                this.loadedLibrary.set(folder, tags);
                console.log("Loaded "+ tags.length+" songs");
                return tags;
            }).catch((err) => {
                console.err("Error: " + err);
            });
        }); //add catch here
    }
    getSongsCount() {
        return this.loadedLibrary.size; //Fix this thingy
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
