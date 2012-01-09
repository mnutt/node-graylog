var graylog = require('./graylog'),
    log = graylog.log;

graylog.toConsole=true;
graylog.facility='hellokitty';

log(
	"What we've got here is...failure to communicate.",
	"Some men you just can't reach. So you get what we had here last week, which is the way he wants it... well, he gets it. I don't like it any more than you men.", 
	{
		facility: "Steve Martin",
		_Source: "Cool Hand Luke",
		_Year: 1968
	}
);

