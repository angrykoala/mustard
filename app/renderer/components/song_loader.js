"use strict";

const Library = require('electron').remote.require('./app/main/library');

module.exports = {
    mounted: function() {
        //Overrides default ondrop behaviour
        document.ondragover = (ev) => {
            ev.preventDefault();
        };

        document.ondrop = (ev) => {
            ev.preventDefault();
            this.loadFile(ev.dataTransfer.files[0].path);
        };
    },
    methods: {
        loadFile(path) { 
            Library.loadFile(path).then((tag) => {
                console.log("Loaded");
            });
        },
    }
};
