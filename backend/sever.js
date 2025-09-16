const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.listen(5000, () => {
  console.log('✅ Backend running on http://localhost:5000');
});
