"use strict";

module.exports = {
    mounted: function() {
        console.log("MOUNTED");
        //Overrides default ondrop behaviour
        document.ondragover = (ev) => {
            ev.preventDefault();
        };

        document.ondrop = (ev) => {
            console.log("ON DROP");
            ev.preventDefault();
            this.$emit('drop',ev.dataTransfer.files[0].path);
        //    this.loadFile(ev.dataTransfer.files[0].path);
        };
    },
    methods: {
        /*loadFile(path) { 
            Library.loadFile(path).then((tag) => {
                console.log("Loaded");
            });
        },*/
    }
};
