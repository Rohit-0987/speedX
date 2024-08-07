const express = require('express');
const cors = require('cors');
const performanceRoutes = require('./routes/performanceRoutes');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api', performanceRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
