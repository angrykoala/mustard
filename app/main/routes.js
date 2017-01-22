"use strict";


const {
    ipcMain
} = require('electron');
const fileLoader = require('./file_loader');
const tagReader = require('../tag_reader');

module.exports = function(win) {

    ipcMain.on('load-file', (event, arg) => {
        const file = fileLoader.loadFileDialog(win);
        tagReader(file[0],(err,data)=>{
            console.log(data);
        });
        //event.sender.send('asynchronous-reply', 'pong')
    });

};
