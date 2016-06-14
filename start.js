var express = require('express');
var app = express();
var assert = require("assert")

app.get('/', function(req, res) {
	res.send({
		cassandra_host: process.env.OPENSHIFT_CASSANDRA_DB_HOST,
        cassandra_port: process.env.OPENSHIFT_CASSANDRA_DB_PORT,
        cassandra_log_dir: process.env.OPENSHIFT_CASSANDRA_DB_LOG_DIR,
        cassandra_native_transport_port: process.env.OPENSHIFT_CASSANDRA_NATIVE_TRANSPORT_PORT
	})
});

const port = process.env.OPENSHIFT_NODEJS_PORT || 4000
const ip = process.env.OPENSHIFT_NODEJS_IP || "localhost"

app.listen(port, ip, 511, function(err) {
	console.log('listening on *:' + port);
});
