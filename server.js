var net = require('net');
var HOST = '127.0.0.1'; //local host
var PORT = 18000; //created a server on localhost:180000

// Keep track of the chat clients
var clients = [];

var server = net.createServer(function(connection) {

    //keep adding incoming connections to clients
    clients.push(connection);
    
    // We have a connection - a connection object is assigned to the connection automatically
    console.log('CONNECTED: ' + connection.remoteAddress +': '+ connection.remotePort);

    // Add a 'data' event handler to this instance of connection
    connection.on('data', function(data) {
        console.log('DATA ' + connection.remoteAddress + ': ' + data);
        broadcast(data, connection);
        // Write the data back to the connection, the client will receive it as data from the server
    });
    
    // Add a 'close' event handler to this instance of connection
    connection.on('close', function(data) {
        console.log('CLOSED: ' + connection.remoteAddress +' '+ connection.remotePort);
    });

    function broadcast(message, sender) {
    clients.forEach(function (client) {
      // Don't want to send it to sender
      if (client === sender) return;
      client.write(message);
    });
  }

});


server.listen(PORT, function(){
    console.log('Server listening on ' + HOST +':'+ PORT);    
});




