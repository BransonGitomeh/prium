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


var cassandraDriver = require('cassandra-driver');

const contactPoint1 = process.env.OPENSHIFT_CASSANDRA_DB_HOST + ":" + process.env.OPENSHIFT_CASSANDRA_DB_PORT
const contactPoint2 = process.env.OPENSHIFT_CASSANDRA_DB_HOST + ":" + process.env.OPENSHIFT_CASSANDRA_NATIVE_TRANSPORT_PORT

var connectionOptions = {
   contactPoints:[contactPoint1,contactPoint2],
   keyspace: 'awesome'
 };

var client = new cassandraDriver.Client(connectionOptions);

client.connect(function(e) {
  var query;
  query = "CREATE KEYSPACE IF NOT EXISTS examples WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3' }";
  return client.execute(query, function(err, res) {
    return console.log(e, res);
  });
});