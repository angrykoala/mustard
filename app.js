"use strict";


const components = {
    "song-summary":require('./app/renderer/components/song_summary'),
    "song-edit": require('./app/renderer/components/song_edit'),
    "library-display": require('./app/renderer/components/library_display'),
    "song-loader": require('./app/renderer/components/song_loader')
};




const app = new Vue({ // jshint ignore:line
    el: '#app',
    data: {
        message: 'Hello Vue!'
    },
    components: components,
    mounted() {
        console.log("Vue mounted");
        
        //Overrides default ondrop behaviour
        document.ondragover = document.ondrop = (ev) => {
            ev.preventDefault();
        };
    },
    updated() {

    }
});
