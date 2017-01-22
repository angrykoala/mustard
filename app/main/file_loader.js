"use strict";

const {
    dialog
} = require('electron');




module.exports = {
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
