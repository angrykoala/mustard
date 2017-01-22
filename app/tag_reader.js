"use strict";

const fs = require('fs');
const MusicMetadata = require('musicmetadata'); //Only read

const Tag=require('./tag');


module.exports=function(filename, done) {
    const stream=fs.createReadStream(filename);
    MusicMetadata(stream, function(err, metadata) {
        done(err,new Tag({
            title : metadata.title,
            artists : metadata.artists,
            genre : metadata.genre, //Improve this shit in the future
            albumArtist : metadata.albumartist,
            albumTitle : metadata.album            
        }));
    });
};
