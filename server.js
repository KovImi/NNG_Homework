
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { dispatch } = require('./backend/dispatcher');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.post('/api/dispatch', async (req, res) => {
  try {
    const calls = req.body.calls;
    const results = await dispatch(calls);
    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    res.status(400).json({ success: false, error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});