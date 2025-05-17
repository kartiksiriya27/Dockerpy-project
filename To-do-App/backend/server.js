const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config.json');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB URI
const mongoURI = `mongodb://${config.database.host}:${config.database.port}/${config.database.dbName}`;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Task Model
const Task = mongoose.model('Task', new mongoose.Schema({
  name: { type: String, required: true }
}));

// Routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const task = new Task({ name: req.body.name });
  await task.save();
  res.json(task);
});

// Start Server
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`🚀 ${config.appName} running at http://${config.server.host}:${PORT}`);
});

