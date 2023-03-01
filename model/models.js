const mongoose = require('mongoose');
require('dotenv').config();
const SECRET = process.env.MONGODB_URL;

mongoose.connect(SECRET, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

const dataSchema = new mongoose.Schema({
  note: {type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Instance = mongoose.model('Instance', dataSchema);

module.exports = Instance;