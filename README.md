# node-graylog

Graylog2 client library for Node.js

## Synopsis

```javascript
	var graylog = require("graylog");
  var log = graylog.log;
```
	
Short message:

```javascript
	log("What we've got here is...failure to communicate");
```

Long message:

```javascript
	log("What we've got here is...failure to communicate", "Some men you just 
		can't reach. So you get what we had here last week, which is the way he wants 
		it... well, he gets it. I don't like it any more than you men.");
```

Short with options:

```javascript
	log("What we've got here is...failure to communicate", { level: LOG_DEBUG });
```

Long with options: 

```javascript
	log("What we've got here is...failure to communicate", "Some men you just 
		can't reach. So you get what we had here last week, which is the way he wants 
		it... well, he gets it. I don't like it any more than you men.", 
		{
			facility: "Steve Martin"
		}
	);
```

You can add custom fields to the options: 
	
```javascript
	log("What we've got here", { 
		level: LOG_DEBUG,
		_failure: "to communicate"
	});
```

## Node.js 0.5.x warning

Node.js 0.5 is transitioning to another event I/O library. Right now at version 0.5.7 UDP datagrams are broken and won't work. 

## Options

* <code>facility</code> - by default it's set to <code>GLOBAL.graylogFacility</code>.
* <code>level</code> - syslog levels, one of: <code>graylog.LOG_EMERG</code>, <code>graylog.LOG_ALERT</code>, <code>graylog.LOG_CRIT</code>, <code>graylog.LOG_ERR</code>, <code>graylog.LOG_WARNING</code>, <code>graylog.LOG_NOTICE</code>, <code>graylog.LOG_INFO</code> (default), <code>graylog.LOG_DEBUG</code>.
* <code>timestamp</code> - unixtime of log event, by default it's now
* <code>host</code> - by default, it's auto detected

## Additional settings

You can set <code>graylog.host</code> and <code>graylog.port</code> to the host and port of the Graylog2 server. By defaults it's <code>localhost</code> and <code>12201</code>.

You can set <code>graylog.toConsole</code> to <code>true</code> to log JSON entries to console as well (useful for development in case you don't want to have graylog2 running on your workstation).

You should set <code>graylog.facility</code> to the name of your application. By default it's set to "Node.js". 

You can set <code>graylog.sequence</code> to a integer non-zero value (set it to 1) to have an auto-incremented <code>_graylogSequence</code> field sent to graylog with each log entry. Due to the fact that UDP packets are not guaranteed to be received in the same order as sent, you might need a sequence number to recover the course of events. 

## Example

See <code>sayHello.js</code>.

## What is graylog2 after all? 

It's a miracle. Get it at http://www.graylog2.org/

## Installation

	npm install .

## TODO

* Limit messages size to MTU size?..


## License

See LICENSE file. Basically, it's a kind of "do-whatever-you-want-for-free" license.

## Author

Egor Egorov <me@egorfine.com>

