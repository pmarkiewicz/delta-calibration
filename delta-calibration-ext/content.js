// content

insertUI();

const comm = new Comm();
const fsm = new CalibrationFSM(comm);
bindDispatcher(comm, fsm);
bindEvents(comm, fsm);
comm.sendHello();
comm.reqPorts();
