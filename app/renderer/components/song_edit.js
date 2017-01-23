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
    <div class="ui form">
      <div class="field">
        <label>Title</label>
        <input type="text" placeholder="Song Title" v-model="tag.title">
      </div>
      <div class="field">
        <label>Genre</label>
        <input type="text" placeholder="Song Genre" v-model="tag.genre">
      </div>
      <div class="field">
        <label>Album</label>
        <input type="text" placeholder="Album" v-model="tag.album">
      </div>

      <button class="ui button"v-on:click="updateData">Update</button>
      <button class="ui button" v-on:click="loadFile">Load</button>
    </div>
    
    `,
    mounted: function() {
        ipcRenderer.on('file-loaded', (event, fileData) => {
            console.log(fileData);
            this.tag = fileData.tag;
            this.path = fileData.path;

        });
    },
    methods: {
        loadFile() {
            ipcRenderer.send('load-file');

        },
        updateData() {
            if(this.tag && this.path){ //improve these checks
                ipcRenderer.send('save-file',{path:this.path,tag:this.tag});
            }
            
        }

    }
};
