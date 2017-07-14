// ui
var connected = false;

const template = `
  <select id="port_list"><option value=''>Please Wait...</option></select>
  <button id="connect_button">Connect</button>
  <button id="disconnect_button" style="display:none">Disconnect</button>
  <button id="refresh_button">Refresh</button>
  <button id="calibrate_button"> --Calibrate Repetier -- </button>
  <button id="save_button">Save</button>
  <button id="abort_button">Abort</button>
  <button id="test_button">test</button>
  <div id="calibration_log" width="100%">log here...</div>`;

const insertUI = function() {
	const frm = document.querySelector('form');
	const tbl = frm.querySelector('table');

	const div = document.createElement("div");
	div.setAttribute("style", "margin: 2px; border: 1px solid gray; background: lightGray");

	div.innerHTML = template;

	frm.insertBefore(div, tbl);
}

const logger = function(msg) {
  const log = document.querySelector('#calibration_log');
  const s = log.innerHTML;

  log.innerHTML = s + '<br>' + msg;
};

const updateUI = function() {
	const port = getPort();

	const off = (id) => { document.querySelector('#' + id).style.display = 'none'; }
	const on = (id) => { document.querySelector('#' + id).style.display = 'inline-block'; }
	const onoff = (id, cond) => { cond ? on(id) : off(id); }

	onoff('connect_button', port.length > 0 && !connected);
	onoff('disconnect_button', connected);
	onoff('refresh_button', !connected);
  onoff('calibrate_button', connected);
  onoff('abort_button', connected);
};

const selectRepetier = function() {
  document.querySelector('input[type="radio"][value="Repetier"]').click();
};

const calculateCorrections = function() {
  document.querySelector('input[type="button"][value="Calculate"]').click();
};

const getPort = function() {
	const port_list = document.querySelector('#port_list');
	return port_list[port_list.selectedIndex].value;
};

const updatePorts = function(ports) {
	const dropDown = document.querySelector('#port_list');
	dropDown.innerHTML = '';

	if (ports.length === 0) {
		document.querySelector('#port_list').innerHTML = '<option value="">no port detected</option>';
	}
	else {
		for (const port of ports) {
			const newOption = document.createElement("option");

			newOption.text = port.path;
			if (port["displayName"]) {
				newOption.title = port["displayName"];
			}
			newOption.value = port.path;
			dropDown.appendChild(newOption);
		}
	}

	updateUI();
};



const epromToHTML = function(data) {
  const toHtml = {
    EPR_STEPS_PER_MM: 'stepspermm',
    EPR_DELTA_TOWERX_OFFSET_STEPS: 'oldxstop',
    EPR_DELTA_TOWERY_OFFSET_STEPS: 'oldystop',
    EPR_DELTA_TOWERZ_OFFSET_STEPS: 'oldzstop',
    EPR_DELTA_DIAGONAL_ROD_LENGTH: 'oldrodlength',
    EPR_DELTA_HORIZONTAL_RADIUS: 'oldradius',
    EPR_Z_LENGTH: 'oldhomedheight',
    EPR_DELTA_ALPHA_A: 'oldxpos',
    EPR_DELTA_ALPHA_B: 'oldypos',
    EPR_DELTA_ALPHA_C: 'oldzpos',
    EPR_DELTA_MAX_RADIUS: 'bedradius',
  };

  for ([name, id] of Object.entries(toHtml)) {
    const v = data[name].value;
    document.querySelector(`#${id}`).value = v;
  }
};

const getTestPoints = function() {
  document.querySelector('#suggestButton').click();

  const no = parseInt(document.querySelector('#numPoints').value);

  const probePoints = [];

  for (i = 0; i < no; i++) {
	  const x = parseFloat(document.querySelector('#probeX'+i).value);
	  const y = parseFloat(document.querySelector('#probeY'+i).value);
	  probePoints.push({i, x, y});
  }

  return probePoints;
};

const pointsToHtml = function(points) {
  for (pt of points) {
    document.querySelector('#probeZ'+ pt.i).value = pt.z;
  }
};

const getCorrections = function() {
  const data = {};

  const fromHtml = {

    EPR_DELTA_TOWERX_OFFSET_STEPS: 'newxstop',
    EPR_DELTA_TOWERY_OFFSET_STEPS: 'newystop',
    EPR_DELTA_TOWERZ_OFFSET_STEPS: 'newzstop',
    EPR_DELTA_DIAGONAL_ROD_LENGTH: 'newrodlength',
    EPR_DELTA_HORIZONTAL_RADIUS: 'newradius',
    EPR_Z_LENGTH: 'newhomedheight',
    EPR_DELTA_ALPHA_A: 'newxpos',
    EPR_DELTA_ALPHA_B: 'newypos',
    EPR_DELTA_ALPHA_C: 'newzpos',
  };

  for ([name, id] of Object.entries(fromHtml)) {
    const v = document.querySelector(`#${id}`).value;
    data[name] = v;
  }

  return data;
};
