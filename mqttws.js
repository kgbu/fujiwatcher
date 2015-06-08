var fs = require('fs');
var conf = JSON.parse(fs.readFileSync('./.auth.conf', 'utf8'));

var ops = {};
var mows   = require('mows');
var client = mows.createClient(conf.port,conf.url,ops);

var options = {
    year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
};

// globals
var linenum = 0;
lasttext = "";
lasttime = Date.now();

console.log(conf.port, conf.url);

client.subscribe (conf.subscribetopic);
client.publish(conf.topic, 'Hello MQTT from Electron to check connection.');

client.on('message', function (topic, message) {
  var currenttext = "topic: " + topic + " message:" +  message + "<br>"
  var curtime = new Date();

  console.log(topic + message);
  console.log("last-begin:" + lasttext + ":last-end");
  console.log("lasttime: " + lasttime);
  console.log("and now: " + Date.now());

  if ((lasttime + 120000) > Date.now()) {
    lasttext = lasttext + currenttext;
  } else {
    lasttext = currenttext;
    lasttime = Date.now();
  }
  
  document.getElementById('currentstate').innerHTML =curtime.toLocaleDateString("en-us", options) + "<br>" + lasttext;
});
