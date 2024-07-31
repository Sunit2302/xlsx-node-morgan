const dotenv = require('dotenv')
const express =  require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path')

const adminRoutes = require('./routes/adminRoutes.js');
const hodrouter = require('./routes/hodRoutes');
const teacherrouter = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes.js');
const  csvRoutes  = require('./routes/csvRoutes.js');
const morgan = require("morgan")

const Log = require('./models/logModel.js')

const app = express();

app.use(express.json());
dotenv.config();

app.use(morgan('short'))


// Custom token for capturing response time
morgan.token('response-time', function (req, res) {
  return res.getHeader('X-Response-Time');
});

// Custom Morgan format to include the response time token
const format = ':method :url :status :response-time ms';

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });

// Setup Morgan to log to file and to MongoDB
app.use(morgan('combined', { stream: accessLogStream }));

app.use(morgan('combined', {
  stream: {
    write: async (message) => {
      const logParts = message.trim().split(' ');
      console.log(logParts);
      const log = new Log({
        method: logParts[0],
        url: logParts[1],
        status: parseInt(logParts[8]),
        ipAddress:logParts[0].split(':').pop()
      });
      try {
        await log.save();
        console.log('Log saved to MongoDB');
      } catch (err) {
        console.error('Error saving log to MongoDB:', err);
      }
    }
  }
}));

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api', adminRoutes);
app.use('/api', hodrouter);
app.use('/api', teacherrouter);
app.use('/api', studentRoutes);
app.use('/api', csvRoutes);

const PORT = process.env.PORT || 3200;
//console.log(PORT)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


