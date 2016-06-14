var express = require('express');
var app = express();

app.get('/', function(req, res) {
	// 	OPENSHIFT_CASSANDRA_HOST      The Cassandra IP address
	// OPENSHIFT_CASSANDRA_PORT      The Cassandra port
	// OPENSHIFT_CASSANDRA_LOG_DIR     The path to the Cassandra log directory
	// OPENSHIFT_CASSANDRA_NATIVE_TRANSPORT_PORT Port for connecting with java client, on NATIVE TRANSPORT
	res.send({
		cassandra_host:process.env.OPENSHIFT_CASSANDRA_HOST
	})
});

const port = process.env.OPENSHIFT_NODEJS_PORT || 4000
const ip = process.env.OPENSHIFT_NODEJS_IP || "localhost"

app.listen(port, ip, 511, function(err) {
	console.log('listening on *:' + port);
});