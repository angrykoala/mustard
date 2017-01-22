"use strict";

const {
    dialog
} = require('electron');




module.exports = {
    //Make these async with callback
    loadFileDialog(win) {
        return dialog.showOpenDialog(win,{
            title: "Load File",
            properties: ['multiSelections', 'openFile'],
        });
    },

    loadLibraryDialog(win) {
        return dialog.showOpenDialog(win,{
            title: "Load Folder",
            properties: ['openDirectory'],
        });
    }
};
