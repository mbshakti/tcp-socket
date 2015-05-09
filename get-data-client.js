var net = require('net');

var client = net.connect({port: 18000, host:'localhost'}, function(){
  console.log('connected to server');

  client.on('end', function(){
  	console.log('Disconnected from server');
  });

});

client.on('data', function(data){
  	console.log(data);
});


client.setEncoding('utf8');
