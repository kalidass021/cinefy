import serverConfig from '../server.js';

const start = () => {
  try {
    // attempt to start the server
    serverConfig();
  } catch (err) {
    console.error(`Startup Error: ${err}`);
    process.exit(1); // exit with failure
  }
};

start();
