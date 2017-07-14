// calibration fsm

// calibration FSM

const CalibrationFSM = function(comm) {
  const State = Object.freeze({
    NOT_STARTED:   Symbol("not_started"),
    EPROM:  Symbol("eprom"),
    CALIBRATION: Symbol("calibration"),
    COMPLETED: Symbol("completed")
  });

  this.epromContent = null;

  this.comm = comm;
  this.state = State.NOT_STARTED;


  this.start = function() {
  	if (this.state != State.NOT_STARTED && this.state != State.COMPLETED) {
  		console.log('Expected state NOT_STARTED, current state: ' + this.state.toString());
      logger('Internall error, aborted');
  		return;
  	}

    this.epromContent = null;
  	this.state = State.EPROM;
  	this.comm.getEprom();
  };

  this.abort = function() {
  	logger('Aborted');
  	this.state = State.NOT_STARTED;

  	this.comm.abort();
  };

  this.cancel = function() {
    logger('Cancelled');
  	this.state = State.NOT_STARTED;
  };

  this.eprom = function(epromData) {
  	if (this.state != State.EPROM) {
  		console.log('Expected state EPROM, current state: ' + this.state.toString());
      logger('Internal error, aborted');
  		return;
  	}

  	// eeprom arrived
  	// fill info about printer
    this.epromContent = epromData;
  	epromToHTML(epromData);
    selectRepetier();
  	const probePoints = getTestPoints();

  	this.state = State.CALIBRATION;

  	this.comm.getCalibration(probePoints, epromData.EPR_Z_PROBE_HEIGHT.value);
  };

  this.calibration = function(epromData) {
  	if (this.state != State.CALIBRATION) {
  		console.log('Expected state EPROM, current state: ' + this.state.toString());
      logger('Internal error, aborted');
  		return;
  	}

  	// eeprom arrived
  	// fill info about printer
  	pointsToHtml(epromData);
    calculateCorrections();
  	this.state = State.COMPLETED;
    logger('Calculation done, you can save corrections');
  };

  this.saveEprom = function() {
    if (this.state != State.COMPLETED) {
  		console.log('Calibration not completed, current state: ' + this.state.toString());
      logger('Calibration not completed');
  		return;
  	}

    calculateCorrections();
    const corr = getCorrections();

    const data = [];

    for ([name, val] of Object.entries(corr)) {
      const v = this.epromContent[name];
      v.value = val;
      data.push(v);
    }

    comm.saveCalibration(data);
  };
};
