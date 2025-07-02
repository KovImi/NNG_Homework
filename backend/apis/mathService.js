//mathService API module

// getFibonacci function with memoization
function getFibonacci(index, cache) {
  cache = cache || [];
  if (cache[index]) {
    return cache[index];
  } else {
    if (index < 3) return 1;
    else {
      cache[index] = getFibonacci(index - 1, cache) + getFibonacci(index - 2, cache);
    }
  }
  return cache[index];
}

// multiplyMatrices function
async function multiplyMatrices(params) {
    const { a, b } = params || {};
    if (!Array.isArray(a) || !Array.isArray(b)) throw new Error('Both a and b must be 2D arrays');
    const aRows = a.length, aCols = a[0].length, bRows = b.length, bCols = b[0].length;
    if (aCols !== bRows) throw new Error('Matrix dimensions do not match for multiplication');
    const result = Array.from({ length: aRows }, () => Array(bCols).fill(0));
    for (let i = 0; i < aRows; i++) {
        for (let j = 0; j < bCols; j++) {
            for (let k = 0; k < aCols; k++) {
                result[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    return result;
}

module.exports = {getFibonacci, multiplyMatrices};