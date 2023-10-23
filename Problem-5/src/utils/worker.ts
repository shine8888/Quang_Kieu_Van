import cluster from 'cluster';
import os from 'os';

/**
 * Sets up worker processes.
 */
export const setupWorkerProcesses = () => {
  const workers: any[] = [];
  // Get the number of cores on the system
  const totalCores = Math.floor(os.cpus().length / 2);

  // Iterate over the number of cores to be utilized by the application
  // In this example, all cores will be utilized
  for (let i = 0; i < totalCores; i++) {
    // Create workers and push references into an array
    // These references can be used to receive messages from workers
    workers.push(cluster.fork());

    // Receive messages from worker processes
    workers[i].on('message', function (message) {
      console.log(message);
    });
  }

  // The process is clustered on a core and a process ID is assigned
  cluster.on('online', function (worker) {
    console.log('Worker ' + worker.process.pid + ' is listening');
  });

  // If any of the worker processes die, start a new one by forking another one
  cluster.on('exit', function (worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');
    workers.push(cluster.fork());
    // Receive messages from worker processes
    workers[workers.length - 1].on('message', function (message) {
      console.log(message);
    });
  });
};
