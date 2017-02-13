"use strict";

const {
    ipcRenderer
} = require('electron');

const tagReader = require('electron').remote.require('./app/main/tag_reader');
const tagWriter = require('electron').remote.require('./app/main/tag_writer');


const components = {
    "dropzone": require('./dropzone')
};

module.exports = {
    //    props: ['path'],
    data() {
        return {
            tag: {},
            path: "",
            loaded: false
        };
    },
    template: `
    <div class="song-edit-menu">
        <div class="ui form" v-if="loaded">
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

          <button class="ui button"v-on:click="save">Save</button>
        </div>
        <dropzone v-on:drop="loadSong"></dropzone>
    </div>
    `,
    mounted: function() {

    },
    methods: {
        save() {
            if (this.tag && this.path) { //improve these checks
                /*ipcRenderer.send('save-file', {
                    path: this.path,
                    tag: this.tag
                });*/
                
                tagWriter(this.path,this.tag,(err)=>{
                    if(err) console.log(err);
                    console.log("Saved?");
                })
            }
        },
        loadSong(path) {
            this.path=path;
            tagReader(path).then((data) => {
                this.tag = data;
                this.loaded = true;
            }).catch((err) => {
                this.loaded = false;
                console.log(err);
            })
        }
    },
    components: components
};
