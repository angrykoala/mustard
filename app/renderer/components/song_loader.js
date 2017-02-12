"use strict";

const Library = require('electron').remote.require('./app/main/library');

module.exports = {
    data() {

    },
    template: `
        <div class="drop-zone" v-on:drop="onDrop">
            <p>Drop FIles Here</p>
        </div>
    `,
    methods: {
        loadFile(path) {
            //ipcRenderer.send('load-file',path);   
            Library.loadFile(path).then((tag) => {
                console.log(tag);
            });
        },
        onDrop(ev) {
            this.loadFile(ev.dataTransfer.files[0].path);
            ev.preventDefault();
        }


    }
};
