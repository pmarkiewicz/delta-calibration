// comm

const Comm = function() {
  this.callApp = function(o) {
  	//chrome.extension.sendMessage({ msg: "startapp" });
  	port = chrome.runtime.connect(APP_ID);
    o['extId'] = chrome.runtime.id;
  	port.postMessage(o);
  };

  this.reqPorts = function() {
  	this.callApp({msg: 'ports'});
  };

  this.sendHello = function() {
    this.callApp({msg: 'hello', data: chrome.runtime.id});
  };

  this.connectPort = function(port) {
  	this.callApp({msg: 'connect', data: {port: port}});
  };

  this.disconnectPort = function(port) {
  	this.callApp({msg: 'disconnect'});
  };

  this.getEprom = function() {
  	this.callApp({msg: 'geteprom'});
  };

  this.getCalibration = function(points, z) {
  	this.callApp({msg: 'getcalibration', data: {points, z}});
  };

  this.saveCalibration = function(data) {
    this.callApp({msg: 'savecalibration', data: data});
  };

  this.getPrinterName = function(data) {
    this.callApp({msg: 'getprintername'});
  };

  this.abort = function() {
    this.callApp({msg: 'abort'});
  };
};
