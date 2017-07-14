// dispatcher

'use strict';

var rept;
const Dispatcher = function(serial, logger) {
  this.extId = null;
  this.logger = logger;
  this.serial = serial;
  rept = this.printer = new Repetier(serial);

  this.serial.onConnect.addListener(() => {
    this.logger.log('connected...');
    chrome.runtime.sendMessage(this.extId, {msg: 'connect', data: {connected: true}});
  });

  this.serial.onConnectError.addListener((err) => {
    this.logger.log('not connected...');
    chrome.runtime.sendMessage(this.extId, {msg: 'connect', data: {connected: false, msg: err}});
  });

  this.serial.onDisconnect.addListener(() => {
    this.logger.log('disconnected...');
    chrome.runtime.sendMessage(this.extId, {msg: 'disconnect', data: {connected: false}});
  });

  this.sendResp = function(payload) {
    if (!this.extId) {
      console.error('No hello message received');
      return;
    }
    chrome.runtime.sendMessage(this.extId, payload);
  }

  this.respondPorts = function() {
  	connection.getDevices((ports) => {
  	  this.sendResp({msg: 'ports', data: ports});
  	});
  };

  this.respondAbort = function() {
  	this.printer.abort(() => {
  	  this.sendResp({msg: 'abort'});
  	});
  };

  this.respondGetEprom = function() {
    this.printer.getEprom()
      .then((eprom) => this.sendResp({msg: 'geteprom', data: eprom}) )
      .catch((err) => this.sendResp({msg: 'geteprom', data: {err}}));
  };

  this.respondGetCalibration = function(params) {
    this.printer.calibrate(params.points, params.z)
      .then((points) => this.sendResp({msg: 'getcalibration', data: points}) )
      .catch((err) => this.sendResp({msg: 'getcalibration', data: {err}}));
  };


  this.respondSaveCalibration = (params) => {
    this.printer.saveCalibration(params)
      .then( () => this.sendResp({msg: 'savecalibration', data: {}}) )
      .catch((err) => this.sendResp({msg: 'savecalibration', data: {err}}));

  };

  this.getPrinterName = function(params) {
    this.printer.getPrinterName()
      .then((name) => this.sendResp({msg: 'getprintername', data: {name}}) )
      .catch((err) => this.sendResp({msg: 'getprintername', data: {err}}));
  };

  chrome.runtime.onConnectExternal.addListener((port) => {
    port.onMessage.addListener((msg) => {
    	this.logger.log('?: ' + msg.msg);

      if (msg.extId) {
        this.extId = msg.extId;
      }

      if (msg.msg === 'hello') {  // send extension id
      }
    	else if (msg.msg === 'connect') {
    		this.serial.connect(msg.data.port);
    	}
    	else if (msg.msg === 'disconnect') {
    		this.serial.disconnect();
    	}
      else if (msg.msg === 'ports') {
    		this.respondPorts();
    	}
    	else if (msg.msg === 'geteprom') {
    		this.respondGetEprom();
    	}
      else if (msg.msg === 'getcalibration') {
    		this.respondGetCalibration(msg.data);
    	}
      else if (msg.msg === 'savecalibration') {
      	this.respondSaveCalibration(msg.data);
      }
      else if (msg.msg === 'getprintername') {
    		this.getPrinterName(msg.data);
    	}
      else if (msg.msg === 'abort') {
    		this.respondAbort(msg.data);
    	}
    });
  });
};
