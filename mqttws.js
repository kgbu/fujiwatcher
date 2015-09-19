var fs = require('fs');
var qrCode = require('qrcode-npm');

var conf = JSON.parse(fs.readFileSync('./.auth.conf', 'utf8'));

var ops = {username: conf.username, password: conf.password};
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

  // make QRcode
  var qr = qrCode.qrcode(4, 'M');
  var qrstr = new String(message);
  if (qrstr.length < 62) {
  	qr.addData(qrstr);
  } else {
  	qr.addData("aaa");
  }
  qr.make();
  
  itag = qr.createImgTag(4);
  
  document.getElementById('currentstate').innerHTML =curtime.toLocaleDateString("en-us", options) + "<br>" + lasttext + "<br>";
  document.getElementById('currentimg').innerHTML = "<h2>QR code of last message </h2><p>Note: In case of less than 64bytes.<br>\n" + itag + "\n";
});
