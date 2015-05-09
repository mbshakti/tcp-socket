var net = require('net');

var HOST = 'localhost'; //change this to IP address of the computer I'm trying to connect to
var PORT = 18000; 

var SerialPort = require("serialport").SerialPort;

var serialPort = new SerialPort("/dev/cu.usbmodem1411", {
   baudrate: 57600
 });

var client = new net.Socket(); 
client.setEncoding('utf8');

client.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    client.write('Incoming data...');
    serialPort.on('open', showPortOpen);
    serialPort.on('data', saveLatestData);
});


client.on('error', function(data){
  console.log('connection error');
});


function showPortOpen() {
   console.log('port open. Data rate: ' + serialPort.options.baudRate);
}
 

function saveLatestData(data) {
  var rawData = data.toString();
    if(rawData.indexOf("B") == 0){
    var bpm = rawData.split("B")[1];
    var splitter = bpm.indexOf("\r") == -1 ? 2 : bpm.indexOf("\r");
    heartRate = bpm.substring(0, splitter);
    message = '';
    if (heartRate > 100) message = "Woah, a little excited";
    if (heartRate < 50)  message = "Heart rate is super low";
    latestData = heartRate;
     var toSend = {
      "bpm": heartRate,
      "msg": message
    }
    console.log("sending: "+JSON.stringify(toSend,null,'\t'));
    client.write(latestData);
  }
}


