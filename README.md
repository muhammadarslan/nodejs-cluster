##Nodejs Clustering
Nodejs application runs in a single thread. It takes advantage of utilizing only one Core. So if you are not running your application with in a cluster then you are waisting some resources. The nodejs cool cluster feature can allow you to run application in multiple threads.

##Clustering

Clustering in nodejs allows you to create multiple threads on same port and run each thread with a core. If you are running application on http with single thread, the application can only benefit from one core.

If one thread goes down, the server can still handle requests on other threads. And this also helps you to scale your application and use optimized hardware resources.
Here's the code how you can cluster your node application.

```
//Cluster Module
var cluster = require('cluster');
//OS Module
var os = require('os');
//No of CPU cores.
var noOfCPUs = os.cpus().length;

console.log('I am master cluster : ' + cluster.isMaster);

if (cluster.isMaster) {
  //Fork workers, for each CPU core.
  for (var i = 0; i < noOfCPUs; i++) {
    cluster.fork();
  }

  Object.keys(cluster.workers).forEach(function(id) {
    console.log("I am running with Process Id : " + cluster.workers[id].process.pid);
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('Cluster worker ' + worker.process.pid + ' died');
  });

} else {
    //application starting point.
    //require("./app.js");
}
```
##Sample Application

I have wrote starter express application, with support of clustering. 
Following is the code.

package.json

```
{
  "name": "nodejs-cluster",
  "version": "0.0.1",
  "dependencies": {
    "express": "^4.10.6",
    "process": "*"
  }
}
```

Application starting point.

app.js.

```
var express = require("express");
var app = express();
var process = require('process'); 

app.get('/',function(req,res){
    res.send("¨Hello from Process : " + process.pid);
});

var port = 9000;

app.listen(port,function() {
	console.log("Running at PORT : " + port);
});

```

Here's main file, runs application in cluster.

cluster.js.

```
//Cluster Module
var cluster = require('cluster');
//OS Module
var os = require('os');
//No of CPU cores.
var noOfCPUs = os.cpus().length;

console.log('I am master cluster : ' + cluster.isMaster);

if (cluster.isMaster) {
  //Fork workers, for each CPU core.
  for (var i = 0; i < noOfCPUs; i++) {
    cluster.fork();
  }

  Object.keys(cluster.workers).forEach(function(id) {
    console.log("I am running with Process Id : " + cluster.workers[id].process.pid);
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('Cluster worker ' + worker.process.pid + ' died');
  });

} else {
    //application starting point.
    require("./app.js");
}
```

You need to download dependencies, by executing following command.
```
npm install
```

And you run application by executing following command.
```
node cluster.js
```

##Conclusion
In your local machine you may not be able to notice performance. But in production you can improve performance and use can also properly utilizes the resources.

Blog post: http://www.jhear.com/2015/05/cluster-nodejs-application
