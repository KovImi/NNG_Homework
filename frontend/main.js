document.addEventListener('DOMContentLoaded', () => {
  const apiSelect = document.getElementById('api-select');
  const methodBar = document.getElementById('method-bar');
  const methodSelect = document.getElementById('method-select');
  const toggleThemeBtn = document.getElementById('toggle-theme');
  const toggleAlignBtn = document.getElementById('toggle-align');
  const jsonInput = document.getElementById('json-input');
  const runBtn = document.getElementById('run-btn');
  const resultBlock = document.getElementById('result-block');
  const topbar = document.querySelector('.topbar');

  // Theme toggle
  toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
  });

  // Align toggle (csak a topbar gombjaira)
  toggleAlignBtn.addEventListener('click', () => {
    topbar.classList.toggle('right-align');
    topbar.classList.toggle('left-align');
  });

  // API selector: show/hide method select
  apiSelect.addEventListener('change', () => {
    if (apiSelect.value === 'mathService') {
      methodBar.classList.remove('d-none');
      updateJsonInput();
    } else {
      methodBar.classList.add('d-none');
    }
  });

  // Method selector: update JSON input
  methodSelect && methodSelect.addEventListener('change', updateJsonInput);

  function updateJsonInput() {
    if (apiSelect.value === 'mathService') {
      if (methodSelect.value === 'getFibonacci') {
        jsonInput.value = '{\n  "calls": [{\n    "service": "mathService",\n    "method": "getFibonacci",\n    "params": { "n": 7 }\n  }]\n}';
      } else if (methodSelect.value === 'multiplyMatrices') {
        jsonInput.value = '{\n  "calls": [{\n    "service": "mathService",\n    "method": "multiplyMatrices",\n    "params": { "a": [[1,2],[3,4]], "b": [[5,6],[7,8]] }\n  }]\n}';
      }
    }
  }

  // Run button: send request
  runBtn.addEventListener('click', async () => {
    let json;
    try {
      json = JSON.parse(jsonInput.value);
    } catch (e) {
      resultBlock.textContent = 'Invalid JSON: ' + e.message;
      resultBlock.style.color = '#c00';
      return;
    }
    resultBlock.textContent = 'Loading...';
    resultBlock.style.color = '';
    try {
      const res = await fetch('/api/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json)
      });
      const data = await res.json();
      resultBlock.textContent = JSON.stringify(data, null, 2);
      resultBlock.style.color = '';
    } catch (e) {
      resultBlock.textContent = 'Request failed: ' + e.message;
      resultBlock.style.color = '#c00';
    }
  });

  // Init
  if (apiSelect.value === 'mathService') {
    methodBar.classList.remove('d-none');
    updateJsonInput();
  }
});