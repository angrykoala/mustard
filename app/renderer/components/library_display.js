"use strict";

const Library = require('electron').remote.require('./app/main/library');

module.exports = {
    data() {
        return {
            songs: []
        };
    },
    template: `
    <div class="ui celled list">
        <div v-for="song in songs" class="item">
          <!--<img class="ui avatar image" src="/images/avatar/small/helen.jpg">-->
          <div class="content">
            <div class="header">{{song.title}}</div>
            {{song.artists[0] || ""}} - {{song.album}}
          </div>
        </div>
    </div>
    `,
    mounted: function() {
        /*    Library.loadFolder('example/folder').then((loadedData)=>{
                console.log(loadedData.length);
                this.songs=loadedData;
            });*/

    }
};
