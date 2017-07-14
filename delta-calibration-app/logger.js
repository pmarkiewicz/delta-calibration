// logger
'use strict';
const Logger = function(debug) {
  this.debug = Boolean(debug);

  this.log = function(data) {
    if (this.debug) {
      chrome.runtime.sendMessage({msg: 'log', data});
    }
  }

  this.on = function() {
    if (!this.debug) {
      this.debug = true;
      this.createLogWindow();
    }
  };

  this.createLogWindow = function() {
    chrome.app.window.create('index.html', {
    id: "mainwin",
      innerBounds: {
        width: 320,
        height: 240
      }
    },
    () => this.log('debug is on'));
  };

  if (this.debug) {
    this.createLogWindow();
  }
};
