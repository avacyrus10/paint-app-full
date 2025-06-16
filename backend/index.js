const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);

app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001');
});

