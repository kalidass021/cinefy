import { useEffect } from 'react';

const useKeepAwake = (API_URL, intervalMinutes = 14) => {
  useEffect(() => {
    let timeoutId;

    const pingBackend = async () => {
      try {
        await fetch(API_URL);
        console.log(API_URL);
        console.info('Pinged backend to keep it awake');
      } catch (err) {
        console.error(`Ping failed: ${err.message}`);
      }

      // schedule the next ping after the previous request completes
      timeoutId = setInterval(pingBackend, intervalMinutes * 60 * 1000); // 14 mins
    };

    pingBackend(); // initial ping

    return () => clearInterval(timeoutId); // cleanup when component unmounts
  }, [API_URL, intervalMinutes]);
};

export default useKeepAwake;
