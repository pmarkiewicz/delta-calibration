console.log('main.js');
'use strict';

var receivedData = [];
var lastUpdate;

var connection = new SerialConnection();

const showControls = function(on) {
	if (on) {
	  document.querySelector('#connect_button').style.display = 'none';
	  document.querySelector('#disconnect_button').style.display = 'inline-block';
	  document.querySelector('#refresh_button').style.display = 'none';
	  document.querySelector('#port_list').style.disable = 'true';
	  document.querySelector('#control_box').style.display = 'block';
	}
	else {
		document.querySelector('#connect_button').style.display = 'inline-block';
		document.querySelector('#disconnect_button').style.display = 'none';
	  document.querySelector('#refresh_button').style.display = 'inline-block';
		document.querySelector('#port_list').style.disable = '';
	  document.querySelector('#control_box').style.display = 'none';
	}
}

connection.onConnect.addListener(function() {
  log('connected...');
  // remove the connection drop-down
  chrome.runtime.sendMessage(extId, {msg: 'connect', data: {connected: true}});

});

connection.onConnectError.addListener(function(msg) {
  log('not connected...' + msg);
  chrome.runtime.sendMessage(extId, {msg: 'connect', data: {connected: false, msg}});

});

connection.onDisconnect.addListener(function() {
  log('disconnected...');
  // remove the connection drop-down
  chrome.runtime.sendMessage(extId, {msg: 'disconnect', data: {}});

});

/*
connection.onReadLine.addListener(function(line) {
	lastUpdate = Date.now() + 100;
	log('' + lastUpdate + '  read line: ' + line);
	receivedData.push(line);

});
*/
// Handle the 'Connect' button
document.querySelector('#connect_button').addEventListener('click', function() {
  // get the device to connect to
  var dropDown = document.querySelector('#port_list');
  var devicePath = dropDown.options[dropDown.selectedIndex].value;
  // connect
  log("Connecting to "+devicePath);
  connection.connect(devicePath);
});

document.querySelector('#disconnect_button').addEventListener('click', function() {
  // get the device to connect to
  showControls(false);
  connection.disconnect();
});


document.querySelector('#clear_button').addEventListener('click', function() {
	document.querySelector('#buffer').innerHTML = "";
});

////////////////////////////////////////////////////////

// Toggle LED state
//var timerId;

document.querySelector('#M205').addEventListener('click', function() {
  	receivedData = [];
	lastUpdate = Date.now() + 2000;
    connection.send("M205\n");
	
	const timerId = setInterval(() => { 
		if (Date.now() > lastUpdate) {
			log('done');
			clearInterval(timerId);
		}
		else {
			log('.');
		}
	}, 200);
});


document.querySelector('#M206').addEventListener('click', function() {
	let g = new GCode(connection);
	g.setVariable().then((d) => {
		console.log('done...' + d)
	});
  
});

document.querySelector('#EPR').addEventListener('click', function() {
	
	let g = new GCode(connection);
	g.setVariable().then((d) => console.log('done...' + d));
});

const extId = 'nfdpdeieakfhlopnckpocknbpnnpnmlf';

const respondPorts = function() {
	connection.getDevices(function(ports) {
	  chrome.runtime.sendMessage(extId, {msg: 'ports', data: ports});
	});
}

const respondGetEprom = function() {
	let o = parseLines(epr_test);
	chrome.runtime.sendMessage(extId, {msg: 'geteprom', data: o});
};

const respondGetCalibration = function(data) {
	
};

// app id mobhmmbeelebfgimlbjkjcdhgoekfoip
chrome.runtime.onConnectExternal.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
	log('?: ' + msg.msg);
    if (msg.msg === 'ports') {
		respondPorts();
	}
	else if (msg.msg === 'geteprom') {
		respondGetEprom();
	}
	else if (msg.msg === 'getcalibration') {
		respondGetCalibration(msg.data);
	}
	else if (msg.msg === 'connect') {
		connection.connect(msg.data.port);
	}
	else if (msg.msg === 'disconnect') {
		connection.disconnect();
	}
  });
});




