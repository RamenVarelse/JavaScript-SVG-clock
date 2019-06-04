/*
mecha.js
Main JavaScript action sheet for RamenVarelse's JavaScript SVG clock

*/

// 1. Get current time

var _time = new Array(3); // _time[0] - hours, _time[1] - minutes, _time[2] - seconds

function timeUpdate(){				// Capturing curent time and putting it's values into array
	var _date = new Date();			// Gives effect of updating time everytime used
	_time[0] = _date.getHours();
	_time[1] = _date.getMinutes();
	_time[2] = _date.getSeconds();
}



// 2. Convert/correspond current time to proper angle/coordinates of the clock's hands

var _hand_H_pos = new Array(4); //Coordinates of x1, y1, x2, y2 - 0, 1, 2, 3
var _hand_M_pos = new Array(4);
var _hand_S_pos = new Array(4);

function degtorad(_degs){	//Converting degrees to radians
	var pi = Math.PI;
  	return _degs * (pi/180);
}

function calcCoordinates(_r, _degs){	// r1=8, r2=75(hours), r3=125
	var _coord = new Array(2);
	_coord[0] = _r * Math.sin(degtorad(_degs)) + 200;	// x
	_coord[1] = Math.abs(_r * Math.cos(degtorad(_degs)) - 200);// y
	return _coord;
}

function timeToHandPos(_hms){ 	//_hms - h, m or s
	
	if(_time[0] >= 12){ //converts 24h to 12h AM/PM
		_time[0] -= 12;
	}

	var _degs_h = _time[0] * 30 + Math.floor(_time[1] / 12) * 6;	// converting time to degs
	var _degs_m = _time[1] * 6;
	var _degs_s = _time[2] * 6;

	if(_hms == "h"){
		var _hour_xyA = calcCoordinates(8, _degs_h);
		var _hour_xyB = calcCoordinates(75, _degs_h);
		_hand_H_pos = [_hour_xyA[0], _hour_xyA[1], _hour_xyB[0], _hour_xyB[1]];	// Changing every 12 minutes
	}
	else if(_hms == "m"){
		var _min_xyA = calcCoordinates(8, _degs_m);
		var _min_xyB = calcCoordinates(125, _degs_m);
		_hand_M_pos = [_min_xyA[0], _min_xyA[1], _min_xyB[0], _min_xyB[1]];	// Changing every 1 minute
	}
	else if(_hms =="s"){
		var _sec_xyA = calcCoordinates(8, _degs_s);
		var _sec_xyB = calcCoordinates(125, _degs_s);
		_hand_S_pos = [_sec_xyA[0], _sec_xyA[1], _sec_xyB[0], _sec_xyB[1]];	// Changing every 1 second
	}
}

// 3. Infinite loop - Change position of the clock's hands every second, by changing 
// svg circle element atributes value using ex. document.getElementsById("hand_secs").setAttribute("x1", "coord_value");

var _hourHand = document.getElementById("hand_hour");
var _hourMins = document.getElementById("hand_min");
var _hourSecs = document.getElementById("hand_sec");
var _firstInit = true;


function Mechanism(){
	timeUpdate();

	timeToHandPos("h");
	timeToHandPos("m");
	timeToHandPos("s");

	_hourHand.setAttribute("x1", _hand_H_pos[0]);
	_hourHand.setAttribute("y1", _hand_H_pos[1]);
	_hourHand.setAttribute("x2", _hand_H_pos[2]);
	_hourHand.setAttribute("y2", _hand_H_pos[3]);

	_hourMins.setAttribute("x1", _hand_M_pos[0]);
	_hourMins.setAttribute("y1", _hand_M_pos[1]);
	_hourMins.setAttribute("x2", _hand_M_pos[2]);
	_hourMins.setAttribute("y2", _hand_M_pos[3]);

	_hourSecs.setAttribute("x1", _hand_S_pos[0]);
	_hourSecs.setAttribute("y1", _hand_S_pos[1]);
	_hourSecs.setAttribute("x2", _hand_S_pos[2]);
	_hourSecs.setAttribute("y2", _hand_S_pos[3]);
}

setInterval(Mechanism,1000);

