const assert = require('assert');
const { dispatch } = require('../dispatcher');

(async function() {
  try {
    // Fibonacci test
    let calls = [{ service: 'mathService', method: 'getFibonacci', params: { n: 7 } }];
    let results = await dispatch(calls);
    assert.strictEqual(results[0].success, true);
    assert.strictEqual(results[0].result, 13);
    console.log('Fibonacci test passed');

    // Matrix multiplication test
    calls = [{ service: 'mathService', method: 'multiplyMatrices', params: { a: [[1,2],[3,4]], b: [[5,6],[7,8]] } }];
    results = await dispatch(calls);
    assert.strictEqual(results[0].success, true);
    assert.deepStrictEqual(results[0].result, [[19,22],[43,50]]);
    console.log('Matrix multiplication test passed');

    // Image search test
    calls = [{ service: 'imageService', method: 'getImageByName', params: { name: 'cat' } }];
    results = await dispatch(calls);
    assert.strictEqual(results[0].success, true);
    assert.ok(results[0].result.result.includes('cat'));
    console.log('Image search test passed');

    // Invalid service/method test
    calls = [{ service: '', method: '', params: {} }];
    results = await dispatch(calls);
    assert.strictEqual(results[0].success, false);
    assert.ok(results[0].error.includes('service and method'));
    console.log('Invalid service/method test passed');

    // Invalid input (not array)
    let errorCaught = false;
    try {
      await dispatch('not an array');
    } catch (e) {
      errorCaught = true;
      assert.ok(e.message.includes('array of API calls'));
    }
    assert.ok(errorCaught);
    console.log('Invalid input (not array) test passed');

    console.log('All tests passed!');
  } catch (e) {
    console.error('Test failed:', e);
    process.exit(1);
  }
})();
