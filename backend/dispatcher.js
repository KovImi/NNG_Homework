//Central dispatcher for handling JSON driven API requests

const path = require('path');

async function dispatch(calls) {
  if(!Array.isArray(calls)) {
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
        throw new Error(`Method ${method} not found in service ${service}`);
      }
      const result = await apiModule[method](params);
      return { success: true, result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }));
  return results;
}

module.exports = { dispatch };