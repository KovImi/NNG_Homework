//mathService API module

// getFibonacci function with memoization
function nthFibonacciUtil(n, memo) {
    if (n <= 1) {
        return n;
    }
    if (memo[n] !== -1) {
        return memo[n];
    }
    memo[n] = nthFibonacciUtil(n - 1, memo) + nthFibonacciUtil(n - 2, memo);
    return memo[n];
}

function getFibonacci(params) {
    const n = params?.n ?? params?.index ?? 0;
    let memo = new Array(n + 1).fill(-1);
    return nthFibonacciUtil(n, memo);
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