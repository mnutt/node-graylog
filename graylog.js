var compress = require('compress-buffer').compress;
var dgram = require('dgram');
var util = require('util');

exports.LOG_EMERG=0;    // system is unusable
exports.LOG_ALERT=1;    // action must be taken immediately
exports.LOG_CRIT=2;     // critical conditions
exports.LOG_ERR=3;      // error conditions
exports.LOG_ERROR=3;    // because people WILL typo
exports.LOG_WARNING=4;  // warning conditions
exports.LOG_NOTICE=5;   // normal, but significant, condition
exports.LOG_INFO=6;     // informational message
exports.LOG_DEBUG=7;    // debug-level message

exports.graylogHost = 'localhost';
exports.graylogPort = 12201;
exports.graylogHostname = require('os').hostname();
exports.graylogToConsole = false;
exports.graylogFacility = 'Node.js';
exports.graylogSequence = 0;


function _logToConsole(shortMessage, opts) {
	var consoleString = shortMessage;

	if (opts.full_message) {
		consoleString+=" ("+opts.full_message+")\n";
	}

	var additionalFields = [];
	Object.keys(opts).forEach(function(key) {
		if (key[0]=='_' && key!="_logSequence") {
			additionalFields.push(
				"  " +
				key.substr(1,1024) +
				": " +
				'\033[' + 34 + 'm' +
				opts[key] +
				'\033[' + 39 + 'm'
			);
		}
	});

	if (additionalFields.length>0) {
		consoleString+="\n"+additionalFields.join("\n");
	}

	console.log(consoleString);
}

function log(shortMessage, a, b) {
	var opts = {};
	if (typeof a == 'string'){
		opts = b || {};
		opts.full_message=a;
	} else if (typeof a == 'object') {
		opts = a || {};
	}

	opts.version="1.0";
	opts.timestamp = opts.timestamp || new Date().getTime()/1000 >> 0;
	opts.host = opts.host || exports.graylogHostname;
	opts.level = opts.level || LOG_INFO;
	opts.facility = opts.facility || exports.graylogFacility;

	if (exports.graylogSequence) {
		opts['_logSequence'] = exports.graylogSequence++;
	}

	opts.short_message = shortMessage;

	if (exports.graylogToConsole) {
		_logToConsole(shortMessage, opts);
	}

	var message = compress(new Buffer(JSON.stringify(opts)));
	if (message.length>8192) { // FIXME: support chunked
		util.debug("Graylog oops: log message size > 8192, I print to stderr and give up: \n"+logString);
		return;
	}

	try {
		var graylog2Client = dgram.createSocket("udp4");
		graylog2Client.send(message, 0, message.length, exports.graylogPort, exports.graylogHost, function() {
		  graylog2Client.close();
    });
	} catch(e) {
	}
}

exports.log = log;
