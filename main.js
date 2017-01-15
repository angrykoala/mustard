"use strict";

const {
    app,
    BrowserWindow
} = require('electron');


function isDevEnv() {
    return true;
    //return process.env.NODE_ENV === "dev";
}

//Global reference to window
let win;

function createWindow() {

    let winConfig = {
        width: 500,
        height: 500,
        minWidth: 200,
        minHeight: 300,
        webgl: false
    };
    if (isDevEnv()) {
        winConfig.width += 300;
    }

    win = new BrowserWindow(winConfig);

    win.loadURL(`file://${__dirname}/index.html`);


    if (isDevEnv()) win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    //For macOS
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    //FOR macOS
    if (win === null) {
        createWindow();
    }
});
