"use strict";


const {
    ipcMain
} = require('electron');
const fileLoader = require('./file_loader');

module.exports = function(win) {

    ipcMain.on('load-file', (event, arg) => {
        fileLoader.loadFileDialog(win)
        //event.sender.send('asynchronous-reply', 'pong')
    });

};
