"use strict";


const {
    ipcMain
} = require('electron');
const fileLoader = require('./file_loader');
const tagReader = require('../tag_reader');

module.exports = function(win) {

    ipcMain.on('load-file', (event) => {
        const file = fileLoader.loadFileDialog(win);

        if (file && file[0]) {
            tagReader(file[0], (err, data) => {
                if (!err) {
                    console.log("Data loaded");
                    event.sender.send("file-loaded", {
                        tag: data,
                        path: file
                    });
                }
            });
        }
    });

};
