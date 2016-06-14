so make auto updating node thing

add the catridge

```javascript
var cassandraDriver = require('cassandra-driver');

const contactPoint1 = process.env.OPENSHIFT_CASSANDRA_DB_HOST + ":" + process.env.OPENSHIFT_CASSANDRA_DB_PORT
const contactPoint2 = process.env.OPENSHIFT_CASSANDRA_DB_HOST + ":" + process.env.OPENSHIFT_CASSANDRA_NATIVE_TRANSPORT_PORT

var connectionOptions = {
   contactPoints:[contactPoint1,contactPoint2],
   keyspace: 'examples'
 };

var client = new cassandraDriver.Client(connectionOptions);

client.connect(function(e) {
  console.log(e)
  var query;
  query = "CREATE KEYSPACE IF NOT EXISTS examples WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3' }";
  return client.execute(query, function(err, res) {
  	console.log("completed the check for the keyspace")
    return console.log(e, res);
  });
});
```

if you dont want to start ssh thing.
 connect to `system` keyspace then create any keyspace with 

 `query = "CREATE KEYSPACE IF NOT EXISTS ${keyspaceName} WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3' }";`

this will work because all cassandra installations come with a system keyspace that is default. 

so yea...crazy thing. all free no paying for anything. 512mb for the db... its a good start.. you can then scale app if you really need that scale($ === needed for that) . you can also get a couple of other openshift accounts, make other applications and do like replica's for the data. just tell assandra where the other nodes are and it`ll add them to the ring and you get the awosomes that you need.

for making the app, if you have issues with making the queries via string, there are ORM's that you an use to do that stuff for you. 

GO and build Salable bad-ass apps.... stop feeling like you cant do what netflix and spotify do :-) and yu ddnt spend a dime to get that infrustructure running 

