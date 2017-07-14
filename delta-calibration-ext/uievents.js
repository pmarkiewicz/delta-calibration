// ui events

const bindEvents = function(comm, fsm) {
  document.querySelector('#connect_button').addEventListener('click', (ev) => {
    ev.preventDefault();
    comm.connectPort(getPort());
  });

  document.querySelector('#disconnect_button').addEventListener('click', function(ev) {
    ev.preventDefault();
    comm.disconnectPort();
  });

  document.querySelector('#refresh_button').addEventListener('click', function(ev) {
    ev.preventDefault();
    comm.reqPorts();
  });

  document.querySelector('#calibrate_button').addEventListener('click', function(ev) {
    ev.preventDefault();
    fsm.start();
  });

  document.querySelector('#abort_button').addEventListener('click', function(ev) {
    ev.preventDefault();
    fsm.abort();
  });

  document.querySelector('#save_button').addEventListener('click', function(ev) {
    ev.preventDefault();
    fsm.saveEprom();
  });

  document.querySelector('#test_button').addEventListener('click', function(ev) {
    ev.preventDefault();
  });

};
