import cluster from 'cluster';
import { setupWorkerProcesses } from './utils/worker';
import App from './app';

// Check if the current process is the primary process
if (cluster.isPrimary) {
  // If it is the primary process, call the setupWorkerProcesses function
  setupWorkerProcesses();
} else {
  // If it is not the primary process, start the App
  App.start();
}
