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
