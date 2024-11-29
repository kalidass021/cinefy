import serverSetup from '../server.js';

const start = () => {
  try {
    const appServer = serverSetup;
    appServer();
  } catch (err) {
    console.error(`Startup Error: ${err}`);
    process.exit(1); // exit with failure
  }
};

start();
