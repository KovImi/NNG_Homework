//Central dispatcher for handling JSON driven API requests

const path = require('path');
const logger = require('./logger');

async function dispatch(calls) {
  if(!Array.isArray(calls)) {
    logger.log('Invalid input: expected an array of API calls');
    throw new Error('Input must be an array of API calls');
  }
  const results = await Promise.all(calls.map(async (call) => {
    const {service, method, params} = call;
    try {
      if (!service || !method) {
        throw new Error('Each call must specify a service and method');
      }
      const servicePath = path.join(__dirname, 'apis', `${service}.js`);
      const apiModule = require(servicePath);
      if (typeof apiModule[method] !== 'function') {
        logger.log(`Method ${method} not found in service ${service}`);
        throw new Error(`Method ${method} not found in service ${service}`);
      }
      logger.log(`Dispatching call to ${service}.${method} with params: ${JSON.stringify(params)}`);
      const result = await apiModule[method](params);
      logger.log(`Success: ${service}.${method} returned: ${JSON.stringify(result)}`);
      return { success: true, result };
    } catch (error) {
      logger.log(`Error in call to ${service}.${method}: ${error.message}`);
      return { success: false, error: error.message };
    }
  }));
  return results;
}

module.exports = { dispatch };