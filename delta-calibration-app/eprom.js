var epr_test = [
	"11:26:57.296 : Transformation matrix: 1.000000 0.000000 0.000000 0.000000 1.000000 0.000000 0.000000 0.000000 1.000000",
	"11:26:44.983 : EPR:0 1028 0 Language",
	"11:26:44.999 : EPR:2 75 250000 Baudrate",
	"11:26:44.999 : EPR:3 129 451.447 Filament printed [m]",
	"11:26:44.999 : EPR:2 125 780342 Printer active [s]",
	"11:26:45.015 : EPR:2 79 0 Max. inactive time [ms,0=off]",
	"11:26:45.015 : EPR:2 83 360000 Stop stepper after inactivity [ms,0=off]",
	"11:26:45.030 : EPR:3 11 100.0000 Steps per mm",
	"11:26:45.030 : EPR:3 23 200.000 Max. feedrate [mm/s]",
	"11:26:45.030 : EPR:3 35 40.000 Homing feedrate [mm/s]",
	"11:26:45.046 : EPR:3 39 10.000 Max. jerk [mm/s]",
	"11:26:45.046 : EPR:3 133 -85.000 X min pos [mm]",
	"11:26:45.046 : EPR:3 137 -85.000 Y min pos [mm]",
	"11:26:45.062 : EPR:3 141 0.000 Z min pos [mm]",
	"11:26:45.062 : EPR:3 145 85.000 X max length [mm]",
	"11:26:45.062 : EPR:3 149 85.000 Y max length [mm]",
	"11:26:45.077 : EPR:3 153 275.380 Z max length [mm]",
	"11:26:45.077 : EPR:1 891 70 Segments/s for travel",
	"11:26:45.077 : EPR:1 889 180 Segments/s for printing",
	"11:26:45.093 : EPR:3 59 1000.000 Acceleration [mm/s^2]",
	"11:26:45.093 : EPR:3 71 1000.000 Travel acceleration [mm/s^2]",
	"11:26:45.093 : EPR:3 881 203.450 Diagonal rod length [mm]",
	"11:26:45.108 : EPR:3 885 96.520 Horizontal rod radius at 0,0 [mm]",
	"11:26:45.108 : EPR:3 925 85.000 Max printable radius [mm]",
	"11:26:45.124 : EPR:1 893 0 Tower X endstop offset [steps]",
	"11:26:45.124 : EPR:1 895 53 Tower Y endstop offset [steps]",
	"11:26:45.140 : EPR:1 897 171 Tower Z endstop offset [steps]",
	"11:26:45.140 : EPR:3 901 207.040 Alpha A(210):",
	"11:26:45.140 : EPR:3 905 326.630 Alpha B(330):",
	"11:26:45.155 : EPR:3 909 90.000 Alpha C(90):",
	"11:26:45.155 : EPR:3 913 0.000 Delta Radius A(0):",
	"11:26:45.155 : EPR:3 917 0.000 Delta Radius B(0):",
	"11:26:45.171 : EPR:3 921 0.000 Delta Radius C(0):",
	"11:26:45.171 : EPR:3 933 0.000 Corr. diagonal A [mm]",
	"11:26:45.171 : EPR:3 937 0.000 Corr. diagonal B [mm]",
	"11:26:45.187 : EPR:3 941 0.000 Corr. diagonal C [mm]",
	"11:26:45.187 : EPR:3 1024 0.000 Coating thickness [mm]",
	"11:26:45.187 : EPR:3 808 35.000 Z-probe height [mm]",
	"11:26:45.202 : EPR:3 929 3.000 Max. z-probe - bed dist. [mm]",
	"11:26:45.202 : EPR:3 812 2.000 Z-probe speed [mm/s]",
	"11:26:45.202 : EPR:3 840 150.000 Z-probe x-y-speed [mm/s]",
	"11:26:45.202 : EPR:3 800 0.000 Z-probe offset x [mm]",
	"11:26:45.218 : EPR:3 804 0.000 Z-probe offset y [mm]",
	"11:26:45.218 : EPR:3 816 -40.000 Z-probe X1 [mm]",
	"11:26:45.233 : EPR:3 820 40.000 Z-probe Y1 [mm]",
	"11:26:45.233 : EPR:3 824 -40.000 Z-probe X2 [mm]",
	"11:26:45.233 : EPR:3 828 -40.000 Z-probe Y2 [mm]",
	"11:26:45.249 : EPR:3 832 40.000 Z-probe X3 [mm]",
	"11:26:45.249 : EPR:3 836 -40.000 Z-probe Y3 [mm]",
	"11:26:45.249 : EPR:3 1036 0.000 Z-probe bending correction A [mm]",
	"11:26:45.265 : EPR:3 1040 0.000 Z-probe bending correction B [mm]",
	"11:26:45.265 : EPR:3 1044 0.000 Z-probe bending correction C [mm]",
	"11:26:45.265 : EPR:0 880 1 Autolevel active (1/0)",
	"11:26:45.280 : EPR:3 976 0.000000 tanXY Axis Compensation",
	"11:26:45.280 : EPR:3 980 0.000000 tanYZ Axis Compensation",
	"11:26:45.280 : EPR:3 984 0.000000 tanXZ Axis Compensation",
	"11:26:45.296 : EPR:1 1048 55 Bed Preheat temp. [?C]",
	"11:26:45.296 : EPR:0 106 0 Bed Heat Manager [0-3]",
	"11:26:45.312 : EPR:0 107 150 Bed PID drive max",
	"11:26:45.312 : EPR:0 124 60 Bed PID drive min",
	"11:26:45.327 : EPR:3 108 24.000 Bed PID P-gain",
	"11:26:45.327 : EPR:3 112 0.880 Bed PID I-gain",
	"11:26:45.327 : EPR:3 116 80.000 Bed PID D-gain",
	"11:26:45.343 : EPR:0 120 255 Bed PID max value [0-255]",
	"11:26:45.343 : EPR:0 1020 0 Enable retraction conversion [0/1]",
	"11:26:45.358 : EPR:3 992 3.000 Retraction length [mm]",
	"11:26:45.358 : EPR:3 1000 150.000 Retraction speed [mm/s]",
	"11:26:45.358 : EPR:3 1004 0.000 Retraction z-lift [mm]",
	"11:26:45.374 : EPR:3 1008 0.000 Extra extrusion on undo retract [mm]",
	"11:26:45.374 : EPR:3 1016 20.000 Retraction undo speed",
	"11:26:45.374 : EPR:3 200 158.476 Extr.1 steps per mm",
	"11:26:45.390 : EPR:3 204 30.000 Extr.1 max. feedrate [mm/s]",
	"11:26:45.390 : EPR:3 208 10.000 Extr.1 start feedrate [mm/s]",
	"11:26:45.390 : EPR:3 212 2000.000 Extr.1 acceleration [mm/s^2]",
	"11:26:45.405 : EPR:1 294 190 Extr.1 Preheat temp. [?C]",
	"11:26:45.405 : EPR:0 216 1 Extr.1 heat manager [0-3]",
	"11:26:45.405 : EPR:0 217 255 Extr.1 PID drive max",
	"11:26:45.421 : EPR:0 245 30 Extr.1 PID drive min",
	"11:26:45.421 : EPR:3 218 17.7035 Extr.1 PID P-gain/dead-time",
	"11:26:45.437 : EPR:3 222 1.4069 Extr.1 PID I-gain",
	"11:26:45.437 : EPR:3 226 60.0000 Extr.1 PID D-gain",
	"11:26:45.437 : EPR:0 230 255 Extr.1 PID max value [0-255]",
	"11:26:45.452 : EPR:2 231 0 Extr.1 X-offset [steps]",
	"11:26:45.452 : EPR:2 235 0 Extr.1 Y-offset [steps]",
	"11:26:45.452 : EPR:2 290 0 Extr.1 Z-offset [steps]",
	"11:26:45.468 : EPR:1 239 2 Extr.1 temp. stabilize time [s]",
	"11:26:45.468 : EPR:1 250 160 Extr.1 temp. for retraction when heating [C]",
	"11:26:45.483 : EPR:1 252 0 Extr.1 distance to retract when heating [mm]",
	"11:26:45.483 : EPR:0 254 255 Extr.1 extruder cooler speed [0-255]",
	"11:26:57.296 : Detected EEPROM version:18",
	"11:26:57.296 : SelectExtruder:0"
];

const Eprom = function() {
	this.EPR = {
		11: "EPR_STEPS_PER_MM",         			//!
		90: "EPR_EXTRUDER_Z_OFFSET",
		//133: "EPR_X_HOME_OFFSET",
		//137: "EPR_Y_HOME_OFFSET",
		//141: "EPR_Z_HOME_OFFSET",
		//145: "EPR_X_LENGTH",
		//149: "EPR_Y_LENGTH",
		153: "EPR_Z_LENGTH",						//!
		//157: "EPR_BACKLASH_X",
		//161: "EPR_BACKLASH_Y",
		//165: "EPR_BACKLASH_Z",
		800: "EPR_Z_PROBE_X_OFFSET",
		804: "EPR_Z_PROBE_Y_OFFSET",
		808: "EPR_Z_PROBE_HEIGHT",					//!
		//812: "EPR_Z_PROBE_SPEED",
		816: "EPR_Z_PROBE_X1",
		820: "EPR_Z_PROBE_Y1",
		824: "EPR_Z_PROBE_X2",
		828: "EPR_Z_PROBE_Y2",
		832: "EPR_Z_PROBE_X3",
		836: "EPR_Z_PROBE_Y3",
		880: "EPR_AUTOLEVEL_ACTIVE",
		881: "EPR_DELTA_DIAGONAL_ROD_LENGTH",		//!
		885: "EPR_DELTA_HORIZONTAL_RADIUS",			//!
		//889: "EPR_DELTA_SEGMENTS_PER_SECOND_PRINT",
		//891: "EPR_DELTA_SEGMENTS_PER_SECOND_MOVE",
		893: "EPR_DELTA_TOWERX_OFFSET_STEPS",		//!
		895: "EPR_DELTA_TOWERY_OFFSET_STEPS",		//!
		897: "EPR_DELTA_TOWERZ_OFFSET_STEPS",		//!
		901: "EPR_DELTA_ALPHA_A",					//!
		905: "EPR_DELTA_ALPHA_B",					//!
		909: "EPR_DELTA_ALPHA_C",					//!
		//913: "EPR_DELTA_RADIUS_CORR_A",
		//917: "EPR_DELTA_RADIUS_CORR_B",
		//921: "EPR_DELTA_RADIUS_CORR_C",
		925: "EPR_DELTA_MAX_RADIUS",				//!
		929: "EPR_Z_PROBE_BED_DISTANCE",
		//933: "EPR_DELTA_DIAGONAL_CORRECTION_A",
		//937: "EPR_DELTA_DIAGONAL_CORRECTION_B",
		//941: "EPR_DELTA_DIAGONAL_CORRECTION_C",
		//976: "EPR_AXISCOMP_TANXY",
		//980: "EPR_AXISCOMP_TANYZ",
		//984: "EPR_AXISCOMP_TANXZ",
		988: "EPR_DISTORTION_CORRECTION_ENABLED",
		1024: "EPR_Z_PROBE_Z_OFFSET"
	};

	this.EPROM_TYPES = Object.freeze({
		0: 'byte',
		1: 'int16',
		2: 'int32',
		3: 'float'
	});

	this.EPROM_TYPES_TO_VAL = {};

	this.EPROM_OFFSETS = {};

	for ([val, name] of Object.entries(this.EPROM_TYPES)) {
		this.EPROM_TYPES_TO_VAL[name] = val;
	}

	for ([offset, name] of Object.entries(this.EPR)) {
		this.EPROM_OFFSETS[name] = offset;
	}

	this.re = /\d?\d:\d?\d:\d?\d\.\d+\s+:\s+EPR:(\d)\s+(\d+)\s+(\-?\d+(?:\.\d+)?)/;

	this.getTypeValue = (typeName) => {
		return this.EPROM_TYPES_TO_VAL[typeName];
	};

	this.getItemOffset = (name) => {
		return this.EPROM_OFFSETS[name];
	};

	this.parseLine = (line) => {
		const m = this.re.exec(line);

		if (m) {
			const typeId = parseInt(m[1])
			const nameId = parseInt(m[2]);
			const type = this.EPROM_TYPES[typeId];
			const value = typeId === 3 ? parseFloat(m[3]) : parseInt(m[3]);
			const name = this.EPR[nameId];

			if (type && value !== undefined && name) {
				return {type, value, name};
			}
		}
	}

  this.parseEprom = (lines) => {
		const result = {};

		lines.forEach((line) => {
			const o = this.parseLine(line);
			if (o) {
				result[o.name] = o;
			}
		});

		return result;
  }
};