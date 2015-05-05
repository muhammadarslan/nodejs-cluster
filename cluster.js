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