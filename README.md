Started from https://github.com/shekhargulati/cassandra-openshift-quickstart

Everything seems to work awesome so far, so to test cassandra actually works

`ssh 575e226489f5cf60a5000006@priam-sirbranson.rhcloud.com`

You definately cant do that without my keys. but that should be the normal procedure.

`cd app-root/data/cassandra/bin/` - To get to the folder with CQLSH executables to fre up the cassandra cli bash thing to throw in commands

`./cqlsh $OPENSHIFT_DIY_IP 19160 ` - To start the cli thing on port	`19160` in the cassandra ip in `process.env`

If you will be doing this often, maybe its nice that you use `cd app-root/data/cassandra/bin/ && ./cqlsh $OPENSHIFT_DIY_IP 19160` or make an executable or whatever inux solution you have