"use strict";

const fs = require('fs');
const MusicMetadata = require('musicmetadata'); //Only read


module.exports=function(filename, done) {
    const stream=fs.createReadStream(filename);
    MusicMetadata(stream, function(err, metadata) {
        done(err,metadata);
    });
};
