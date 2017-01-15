"use strict";

//This file is just for testing purposes
const readMeta = require('./app/tag_reader');
const writeMeta = require('./app/tag_writer');
const Tag = require('./app/tag');

readMeta("test/resources/sample2.mp3", (err, meta) => {
    console.log(meta);
    let tag = new Tag({
        title: "title test"
    });
    writeMeta("test/resources/sample2.mp3", tag, () => {
        readMeta("test/resources/sample2.mp3", (err, meta) => {
            console.log(meta);
        });

    });
});
/*
var ffmetadata = require("ffmetadata"); //requires FFmpeg or libav
 
// Read song.mp3 metadata 
ffmetadata.read("sample.mp3", function(err, data) {
    if (err) console.error("Error reading metadata", err);
    else console.log(data);
});
 
/*
// Set the artist for song.mp3 
var data = {
  artist: "Me",
  thingy: "Pepe"
};
ffmetadata.write("sample.mp3", data, function(err) {
    if (err) console.error("Error writing metadata", err);
    else console.log("Data written");
});*/
