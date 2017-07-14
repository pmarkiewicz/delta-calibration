// dispatcher

const bindDispatcher = (comm, fsm) => {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
  	  console.log(request);
  	  if (request.msg === 'ports') {
  		  updatePorts(request.data);
  	  }
      else if (request.msg === 'geteprom') {
        if (request.data.err) {
          logger('Get EPROM failed: ' + request.data.err);
          fsm.cancel();
        }
        else {
  		    fsm.eprom(request.data);
        }
  	  }
      else if (request.msg === 'getcalibration') {
        if (request.data.err) {
          logger('Get calibration points failed: ' + request.data.err);
          fsm.cancel();
        }
        else {
  		    fsm.calibration(request.data);
        }
  	  }
  	  else if (request.msg === 'connect') {
  		  connected = request.data.connected;
  		  if (connected) {
          comm.getPrinterName();
          logger('Port open');
        }
        else {
  			  logger(request.data.msg);
  		  }
  		  updateUI();
  	  }
      else if (request.msg === 'disconnect') {
  		  connected = false;

  		  updateUI();
  	  }
      else if (request.msg === 'abort') {
  		  logger('aborted');

  		  updateUI();
  	  }
      else if (request.msg === 'savecalibration') {
        if (request.data.err) {
          logger('Save calibration failed: ' + request.data.err);
        }
        else {
          logger('calibration saved');
        }
      }
      else if (request.msg === 'getprintername') {
        if (request.data.err) {
          logger('Get printer name failed: ' + request.data.err);
        }
        else {
          logger(request.data.name);
        }
      }
    }
  );
};
