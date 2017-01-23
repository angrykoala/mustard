"use strict";

const fs = require('fs');
const ID3Writer = require('browser-id3-writer');

const FrameSpec = { //Check browser-id3-writer and Wikipedia
    artists: "TPE1",
    genre: "TCON",
    title: "TIT2",
    albumArtist: "TPE2",
    album: "TALB",
};

module.exports = function(filename, tag, done) {
    fs.readFile(filename, (err, buffer) => {
        if (err) return done(err);
        const writerBuffer = generateTagWriter(buffer, tag);
        fs.writeFile(filename, writerBuffer, (err) => {
            return done(err);
        });
    });
};

function generateTagWriter(buffer,tag) {
    const writer = new ID3Writer(buffer);
    for (let field in FrameSpec) {
        if (FrameSpec.hasOwnProperty(field)) {
            if (validField(tag[field])) {
                writer.setFrame(FrameSpec[field], tag[field]);
            }
        }
    }

    writer.addTag();
    return Buffer.from(writer.arrayBuffer);
}


function validField(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === "string" && value.length === 0) return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (typeof value === "object" && Object.keys(value).length === 0) return false;
    return true;
}

//const coverBuffer = fs.readFileSync('path_to_cover.jpg');

/*
const writer = new ID3Writer(songBuffer);
writer.setFrame('TIT2', 'Home')
      .setFrame('TPE1', ['Eminem', '50 Cent'])
      .setFrame('TPE2', 'Eminem')
      .setFrame('TALB', 'Friday Night Lights')
      .setFrame('TYER', 2004)
      .setFrame('TRCK', '6/8')
      .setFrame('TPOS', '1/2')
      .setFrame('TCON', ['Soundtrack'])
      .setFrame('TBPM', 128)
      .setFrame('WPAY', 'https://google.com')
      .setFrame('USLT', {
          description: 'Original lyrics',
          lyrics: 'This is unsychronised lyrics'
      })
      .setFrame('TXXX', {
          description: 'Release Info',
          value: 'Double vinyl version was limited to 2500 copies'
      })
      .setFrame('TKEY', 'Fbm');
     /* .setFrame('APIC', {
          type: 3,
          data: coverBuffer,
          description: 'Super picture'
      });
writer.addTag();

const taggedSongBuffer = Buffer.from(writer.arrayBuffer);
fs.writeFileSync('sample.wav', taggedSongBuffer);
 */
