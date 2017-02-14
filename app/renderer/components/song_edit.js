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
            loaded: false,
            genre: ""
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
            <input type="text" placeholder="Song Genre" v-model="genre">
          </div>
          <div class="field">
            <label>Album</label>
            <input type="text" placeholder="Album" v-model="tag.album">
          </div>

          <button class="ui button"v-on:click="save">Save</button>
          <button class="ui button"v-on:click="cancel">Cancel</button>
        </div>
        <div v-else>
            Drop File        
        </div>
        <dropzone v-on:drop="loadSong"></dropzone>
    </div>
    `,
    mounted: function() {

    },
    methods: {
        save() {
            console.log("save",this.genre);
            if (this.tag && this.path) { //improve these checks
                /*ipcRenderer.send('save-file', {
                    path: this.path,
                    tag: this.tag
                });*/
                
                //this.tag.genre[0]=this.genre; //Why this doesn't work????
                this.tag.genre=[this.genre];

                tagWriter(this.path, this.tag, (err) => {
                    if (err) console.log(err);
                    console.log("Saved?");
                })
            }
        },
        cancel() {
            this.loaded = false;
            this.path = "";
            this.tag = {};

        },
        loadSong(path) {
            this.path = path;
            tagReader(path).then((data) => {
                this.tag = data;
                this.loaded = true;
                this.genre=data.genre[0];
            }).catch((err) => {
                this.loaded = false;
                console.log(err);
            })
        }
    },
    components: components
};
