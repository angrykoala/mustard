"use strict";


const components = {

};


const app = new Vue({ // jshint ignore:line
    el: '#app',
    data: {
        message: 'Hello Vue!'
    },
    components: components,
    mounted() {
        console.log("Vue mounted ");
    },
    updated() {

    }
});

const {ipcRenderer} = require('electron')



function loadFile(){
    console.log("loadFile");
    ipcRenderer.send('load-file');
    
    
}
