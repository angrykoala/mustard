"use strict";

const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

const TagReader = require('./tag_reader');

const config = require('../config.json');

const supportedFormats = new Set(config.formats.map(ext => "." + ext));

class Library {
    constructor() {
        this.songsCount = 0;
        this.loadedLibrary = new Map();
        this.events = new EventEmitter();
    }

    loadFile(path) {
        return TagReader(path).then((tag) => {
            this.songsCount++;
            this.loadedLibrary.set(path, [tag]);
            this.events.emit('load',[tag]);
            return [tag];
        }).catch((err) => {
            console.error("Error: " + err);
        });
    }

    loadFolder(folder) {
        return getFolderFiles(folder).then((musicFiles) => {
            let promises = musicFiles.map((file) => {
                return TagReader(path.join(folder, file));
            });
            return Promise.all(promises).then((tags) => {
                this.songsCount += promises.length;
                this.loadedLibrary.set(folder, tags);
                this.events.emit('load',tags);
                return tags;
            }).catch((err) => {
                console.error("Error: " + err); //TODO: an error should only affect 1 promise
            });
        }); //add catch here
    }

    onDelete(callback) {
        this.events.on('delete', callback);

    }
    onLoad(callback) {
        console.log("On Load");
        this.events.on('load', callback);
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
