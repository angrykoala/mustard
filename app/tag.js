"use strict";

class Tag {
    constructor(data) {
        this.title = data.title || "";
        this.artists = data.artists || [];
        this.genre = data.genre || []; //Improve this shit in the future
        this.albumArtist = data.albumArtist || "";
        this.albumTitle = data.albumTitle || "";
    }
}

module.exports=Tag;


/*
array of strings:

TPE1 (song artists)
TCOM (song composers)
TCON (song genres)
string

TIT2 (song title)
TALB (album title)
TPE2 (album artist)
TPE3 (conductor/performer refinement)
TPE4 (interpreted, remixed, or otherwise modified by)
TRCK (song number in album): '5' or '5/10'
TPOS (album disc number): '1' or '1/3'
TPUB (label name)
TKEY (initial key)
TMED (media type)
WCOM (commercial information)
WCOP (copyright/Legal information)
WOAF (official audio file webpage)
WOAR (official artist/performer webpage)
WOAS (official audio source webpage)
WORS (official internet radio station homepage)
WPAY (payment)
WPUB (publishers official webpage)
integer

TLEN (song duration in milliseconds)
TYER (album release year)
TBPM (beats per minute)
object

COMM (comments):

*/
