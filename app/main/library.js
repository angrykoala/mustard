"use strict";

const fs = require('fs');
const path = require('path');

const TagReader = require('./tag_reader');

const config = require('../config.json');

const supportedFormats = new Set(config.formats.map(ext => "." + ext));

console.log("Library file");

class Library {

    constructor() {
        this.loadedLibrary = new Map();
    }


    loadFile(path) {
        TagReader(path).then((tag) => {
            this.loadedLibrary.set(path, [tag]);
        }).catch((err) => {
            console.err("Error: "+err);
        });
    }

    loadFolder(folder) {
        getFolderFiles(folder, (err, musicFiles) => {
            let promises = musicFiles.map((file) => {
                return TagReader(path.join(folder,file));
            });
            Promise.all(promises).then((tags) => {
                this.loadedLibrary.set(folder, tags);
                console.log("Everything loaded",this.getSongsCount());
            }).catch((err) => {
                console.err("Error: "+err);
            });
        });
    }
    getSongsCount(){
        return this.loadedLibrary.size; //Fix this thingy
    }
}

function getFolderFiles(folder, done) {
    fs.readdir(folder, (err, res) => {
        if (err) return done(err);
        let musicFiles = res.filter((file) => {
            let extension = path.extname(file);
            return supportedFormats.has(extension);
        });
        return done(null, musicFiles);
    });
}

module.exports = new Library();
