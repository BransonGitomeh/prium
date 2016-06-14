so i have always watched netflix database backend talks and they talk about cassandra and how awesome it is. Lots of other companies have sang the DSE song and i have wanted to try it. so installing cassadra on the client is a breeze and fun. The i tried to do the same on the server, so naturally i selected the best free Paas things we have out there. so i can get a server that doesnt go out after 30mins(pun heroku) and also one that allows me to store data not flush my space after every restart (trol heroku). So after a LONG time trying to get this to run LOL (a few tried over a month) i finally got this to work well. 

so we need cassandra to get running, then make something to talk to it via any of the official drivers DSE provides. for this case ill use the famous node js...

at the time of writing this the latest version are
```
node - 6.x
cassandra - 3.6
node-cassandra driver - 3.0
```

so make a node js application that auto updates its version on every build, using the node(latest) catridge

add the awesome `openshift-origin-cartridge-cassandra` via the url `https://raw.githubusercontent.com/rajatchopra/openshift-origin-cartridge-cassandra/master/metadata/manifest.yml`

and it'll do its magic and install casssandra and do all the majic that will probably take you some time to work arround. but it takes like 30secs to be done


then you can add this next js code to your `start.js` file in the default code that the node catridge will give you.


so some node script to create a keyspace to get you started (you can do this via ssh). The script is also a nice way to test if the installation works well against a real app.

```javascript
var cassandraDriver = require('cassandra-driver');

const contactPoint1 = process.env.OPENSHIFT_CASSANDRA_DB_HOST + ":" + process.env.OPENSHIFT_CASSANDRA_DB_PORT
const contactPoint2 = process.env.OPENSHIFT_CASSANDRA_DB_HOST + ":" + process.env.OPENSHIFT_CASSANDRA_NATIVE_TRANSPORT_PORT

var connectionOptions = {
   contactPoints:[contactPoint1,contactPoint2],
   keyspace: 'system'
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
This will check if cassandra is up and running well safe and create a keyspace for you to play in. This is better just like doing it in ssh via `cqlsh` but this is cool

so push your app and make sure you have a `rhc tail {appName}` somewhere so it monitors the logs. if everything goes well you will have something like

```javascript

null ResultSet {
  info: 
   { queriedHost: '127.7.242.130:19042',
     triedHosts: {},
     achievedConsistency: 10,
     traceId: null,
     warnings: null,
     customPayload: null },
  rows: undefined,
  rowLength: undefined,
  columns: null,
  pageState: [Getter],
  nextPage: undefined }

  completed the check for the keyspace

```
this just means that your keyspace was created well and the `undefined` things mean that no data was touched.Otherwise you will get an error that the `contactPoints` cannot be reached(check if you installed the catridge well) or that the keyspace `system` doesnt exist (you probably ddnt write the correct thing since `system` keyspace is default to all the cas* instances) 	

so yea...crazy thing. all free no paying for anything. 512mb for the db... its a good start.. you can then scale app if you really need that scale($ === needed for that) . you can also get a couple of other openshift accounts, make other applications and do like replica's for the data. just tell assandra where the other nodes are and it`ll add them to the ring and you get the awosomes that you need.

for making the app, if you have issues with making the queries via string, there are ORM's that you an use to do that stuff for you. 

GO and build Scalable bad-ass apps.... stop feeling like you cant do what netflix and spotify do (maybe you cant :smirk: but its nice to start ) :-) and yu ddnt spend a dime to get that infrustructure running 
