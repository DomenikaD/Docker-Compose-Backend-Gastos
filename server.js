const express = require('express');
const cors = require('cors');
const gastosRoutes = require('./routes/gastos');
const createTables = require('./base-datos/initdb');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
createTables();
app.use('/api/gastos', gastosRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
