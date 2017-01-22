"use strict";

const {ipcRenderer} = require('electron');

//Drag & Drop
  document.ondragover = document.ondrop = (ev) => {
      ev.preventDefault();
  };

  document.body.ondrop = (ev) => {
     loadFile(ev.dataTransfer.files[0].path);
      ev.preventDefault();
  };






  function loadFile(path){
      ipcRenderer.send('load-file',path);    
  }
