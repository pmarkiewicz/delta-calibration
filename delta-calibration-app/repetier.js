// gcode
'use strict';

const Repetier = function(serial) {
	this.MOVE_OFFSET_Z = 10;
	this.SERIAL_PORT_TIMEOUT = 5000;

	this.serial = serial;
	this.lastUpdate = Date.now();
	this.receivedData = [];
	this.error = "";
	this.eprom = new Eprom();

	this.serial.onReadLine.addListener((line) => {
		this.lastUpdate = Date.now() + 100;
		if (!line.startsWith('wait')) {	// TODO: replace with ignore table
			this.receivedData.push(line);
		}
	});

	this.serial.onError.addListener((err) => {
		this.error = err;
	});


	this.isOkReceived = () => {
		for (l of this.receivedData) {
			if (l.toUpperCase().startsWith('OK')) {
				return true;
			}
		}

		return false;
	}

	this.send = (code) => {
		return new Promise((resolve, reject) => {
			this.serial.flush();
			this.receivedData = [];
			this.error = "";
			this.lastUpdate = Date.now() + this.SERIAL_PORT_TIMEOUT;
			this.serial.send(code + '\n');

			const timerId = setInterval(() => {
				if (this.error) {
					clearInterval(timerId);
					reject(this.error);
				}
				else if (this.isOkReceived() || Date.now() > this.lastUpdate) {
					clearInterval(timerId);
					resolve(this.receivedData);
				}
			}, 200);
		});
	};

	this.home = () => {
		console.log("G28");
		return this.send("G28");
	};

	this.moveTo = (x, y, z, speed) => {
		let s = "G1 ";
		if (x) s += " X" + x;
		if (y) s += " Y" + y;
		if (z) s += " Z" + z;
		if (speed) s += " F" + speed;

		console.log(s);
		return this.send(s);
	}

	this.pause = (tm) => {
		let s = "G4 S" + tm;
		console.log(s);
		return this.send(s);
	};

	this.probe = () => {
		return new Promise( (resolve, reject) => {
			let s = "G30";
			console.log(s);
		  this.send(s).then( (h) => resolve( parseFloat(h)) );
		});
	};

	this.getEprom = () => {
		return new Promise( (resolve, reject) => {
			this.send("M205")
			 .then( (eprom) => {
			 		const d = this.eprom.parseEprom(eprom);

					// change angles to differences
					d.EPR_DELTA_ALPHA_A.value -= 210.0;
				  d.EPR_DELTA_ALPHA_B.value -= 330.0;
				  d.EPR_DELTA_ALPHA_C.value -= 90.0;

			 		resolve(d);
				})
			.catch( err => {
			 	reject(err);
			});
 		});
	};

	this.abort = () => {
		return this.send("M112");
	};

	this.getPrinterName = () => {
		return new Promise( (resolve, reject) => {
			let that = this;
			this.send("M115")
				.then( (name) => {
					console.log('Name: ' + name);
					resolve(name);
				});
		});
	};

	this.calibratePoint = (x, y, z) => {
		return new Promise( (resolve, reject) => {
			this.moveTo(x, y, z + this.MOVE_OFFSET_Z)
				.then( () => this.pause(1) )
				.then( () => this.moveTo(null, null, z) )
				.then( () => this.pause(1) )
				.then( () => resolve(this.probe()) )
		});
	};

	this.calibrate = (points, z) => {
		return new Promise( (resolve, reject) => {
			return points.reduce( (sequence, pt) => {
				return sequence.then( () => {
					console.log('calibrating: ' + pt.i);
					return this.calibratePoint(pt.x, pt.y, z)
									.then( (z) => pt.z = z );

				})
			}, this.home() ).then( (pt) => resolve(points));
		});
	};

	this.saveValueToEprom = (data) => {
		return new Promise( (resolve, reject) => {
			// M206 T[type] P[pos] [Sint(long] [Xfloat] Set eeprom value
			const varType = this.eprom.getTypeValue(data.type);
			const typeOperator = data.type.toString() === 'float' ? 'X' : 'S';
			const pos = this.eprom.getItemOffset(data.name);

			const op = `M206 T${varType} P${pos} ${typeOperator}${data.value}`;
			console.log(op);
			return this.send(op).then( () => resolve());
		});
	};

	this.saveCalibration = (data) => {
		return new Promise( (resolve, reject) => {
			return data.reduce( (chain, d) => {
		 		return chain.then( () => this.saveValueToEprom(d).then( () => console.log('.')  ) )
		 	}, Promise.resolve() ).then( () => resolve() );
		});
	};
};
