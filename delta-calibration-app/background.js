// backround.js
'use strict';

const log = new Logger(true);
const connection = new SerialConnection(log);
const dispatcher = new Dispatcher(connection, log);

chrome.runtime.onMessage.addListener( (msg) => {
  if (msg.msg === 'TEST') {
    console.log("test...");
  }
});
