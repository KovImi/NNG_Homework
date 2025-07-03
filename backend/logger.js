
const fs = require('fs');
const path = require('path');

const LOG_TO_FILE = true; // Set to false to disable file logging
const LOG_FILE_PATH = path.join(__dirname, 'logs.txt');

function getTimeStamp() {
  return new Date().toISOString();
}

function log(message) {
  const entry = `[${getTimeStamp()}] ${message}`;
  console.log(entry);
  if(LOG_TO_FILE) {
    fs.appendFile(LOG_FILE_PATH, entry + '\n', (error) => {
      console.log(`[LOGGER] ${entry}`);
      if (error) {
        console.error(`[LOGGER] Failed to write to log file: ${error.message}`);
      }
    });
  }
}

module.exports = { log };