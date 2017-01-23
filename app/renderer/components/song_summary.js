"use strict";

const {
    ipcRenderer
} = require('electron');

module.exports = {
    //props: ['tag', 'path'],
    data() {
        return {
            tag: {},
            path: ""
        };
    },
    template: `
    <div class="ui list song-summary">
      <div class="item"><strong>Title:</strong>{{tag.title}}</div>
      <div class="item"><strong>Genre:</strong>{{tag.genre}}</div>
      <div class="item"><strong>Album:</strong>{{tag.album}}</div>
      <div class="item"><i>File:</i>{{path}}</div>
      <button class="ui button" v-on:click="loadFile">Load</button>
    </div>  
    
    `,
    mounted: function() {
        ipcRenderer.on('file-loaded', (event, fileData) => {
            console.log(fileData);
            this.tag = fileData.tag;
            this.path = fileData.path

        });
    },
    methods: {
        loadFile() {
            ipcRenderer.send('load-file');

        }

    }
};
