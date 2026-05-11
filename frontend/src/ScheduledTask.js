// src/ScheduledTask.js
import React, { useEffect } from 'react';

const ScheduledTask = () => {
  const targetHour = 3; // 3:00 AM

  // Function to be called at 3:00 AM
  const runScheduledFunction = () => {
    console.log("Scheduled function is running at 3:00 AM IST");
    // Add the code you want to run here, e.g., API call or data processing
  };

  useEffect(() => {
    // Calculate the time until 3:00 AM IST (Indian Standard Time)
    const calculateTimeUntilNextRun = () => {
      const now = new Date();
      const nextRun = new Date();
      
      nextRun.setHours(targetHour, 0, 0, 0); // Set time to 3:00 AM
      
      // If 3:00 AM has already passed today, set the next run for tomorrow
      if (now >= nextRun) {
        nextRun.setDate(nextRun.getDate() + 1);
      }

      // Calculate the difference in milliseconds
      return nextRun - now;
    };

    // Function to set the initial timeout and subsequent 24-hour intervals
    const startScheduler = () => {
      const timeUntilNextRun = calculateTimeUntilNextRun();

      // Schedule the initial timeout until 3:00 AM
      const initialTimeout = setTimeout(() => {
        runScheduledFunction();

        // After the initial run, set an interval to run the function every 24 hours
        setInterval(runScheduledFunction, 24 * 60 * 60 * 1000); // 24 hours
      }, timeUntilNextRun);

      // Cleanup the timeout on component unmount
      return () => clearTimeout(initialTimeout);
    };

    const cleanup = startScheduler();

    return () => cleanup(); // Clear any remaining timeout/interval on component unmount
  }, []);

  return <div>Scheduled Task Component</div>;
};

export default ScheduledTask;
