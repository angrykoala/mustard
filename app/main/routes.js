"use strict";


const {
    ipcMain
} = require('electron');
const fileLoader = require('./load_dialogs');
const tagReader = require('./tag_reader');
const tagWriter = require('./tag_writer');

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

    ipcMain.on('save-file', (event, arg) => {
        console.log("Save File", arg);
        tagWriter(arg.path[0], arg.tag,()=>{
            console.log("Saved");
        });

    });

};
