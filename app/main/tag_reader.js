"use strict";

const fs = require('fs');
const MusicMetadata = require('musicmetadata'); //Only read

const Tag = require('../common/tag');

module.exports = function(filename) {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filename);
        MusicMetadata(stream, (err, metadata) => {
            if (err) return reject(err);
            let result = new Tag({
                title: metadata.title,
                artists: metadata.artist,
                genre: metadata.genre, //Improve this shit in the future
                albumArtist: metadata.albumartist,
                album: metadata.album
            });
            resolve(result);
        });
    });
};
