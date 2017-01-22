"use strict";


const components = {
    "song-summary":require('./app/renderer/components/song_summary')
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
