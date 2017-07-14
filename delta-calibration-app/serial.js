//console.log('serial.js');
'use strict';

var SerialConnection = function(logger) {
  this.logger = logger;
  this.connectionId = -1;
  this.lineBuffer = "";
  this.boundOnReceive = this.onReceive.bind(this);
  this.boundOnReceiveError = this.onReceiveError.bind(this);
  this.onConnect = new chrome.Event();
  this.onConnectError = new chrome.Event();
  this.onDisconnect = new chrome.Event();
  this.onReadLine = new chrome.Event();
  this.onError = new chrome.Event();
};

SerialConnection.prototype.onConnectComplete = function(connectionInfo) {
  if (!connectionInfo) {
    this.logger.log("Connection failed.");
	  this.onConnectError.dispatch(chrome.runtime.lastError.message);
    return;
  }
  this.connectionId = connectionInfo.connectionId;
  chrome.serial.onReceive.addListener(this.boundOnReceive);
  chrome.serial.onReceiveError.addListener(this.boundOnReceiveError);
  this.onConnect.dispatch();
};

SerialConnection.prototype.onDisconnectComplete = function() {
  this.connectionId = -1;
  chrome.serial.onReceive.removeListener(this.boundOnReceive);
  chrome.serial.onReceiveError.removeListener(this.boundOnReceiveError);
  this.onDisconnect.dispatch();
};

SerialConnection.prototype.onReceive = function(receiveInfo) {
  if (receiveInfo.connectionId !== this.connectionId) {
    return;
  }

  this.lineBuffer += ab2str(receiveInfo.data);

  var index;
  while ((index = this.lineBuffer.indexOf('\n')) >= 0) {
    var line = this.lineBuffer.substr(0, index + 1);
    this.onReadLine.dispatch(line);
    this.lineBuffer = this.lineBuffer.substr(index + 1);
  }
};

SerialConnection.prototype.onReceiveError = function(errorInfo) {
  if (errorInfo.connectionId === this.connectionId) {
    this.onError.dispatch(errorInfo.error);
  }
};

SerialConnection.prototype.getDevices = function(callback) {
  chrome.serial.getDevices(callback)
};

SerialConnection.prototype.connect = function(path) {
  chrome.serial.connect(path, {bitrate: 115200}, this.onConnectComplete.bind(this))
};

SerialConnection.prototype.send = function(msg) {
  if (this.connectionId < 0) {
    throw 'Invalid connection';
  }
  chrome.serial.send(this.connectionId, str2ab(msg), function() {});
};

SerialConnection.prototype.disconnect = function() {
  if (this.connectionId < 0) {
    throw 'Invalid connection';
  }

  chrome.serial.disconnect(this.connectionId, this.onDisconnectComplete.bind(this));
};

SerialConnection.prototype.flush = function() {
  chrome.serial.flush(this.connectionId, () => {});
};
