const express = require('express'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  // redis = require('redis'),
  fs = require('fs'),
  path = require('path'),
  cors = require('cors'),
  errors = require('./middleware/errorHandling'),
  blacklist = require('./middleware/blocker'),
  studentRoute = require('./routes/student'),
  schoolRoute = require('./routes/school'),
  adminRoute = require('./routes/admin'),
  doeRoute = require('./routes/doe'),
  teacherRoute = require('./routes/teacher'),
  auth = require('./middleware/isAuth'),
  // attendanceRoute = require('./routes/attendance'),
  email = require('./middleware/email'),
  loginTry = require('./controllers/authTry');

require('dotenv/config');

// init app
const app = express();

// connecting to mongoDB
const URL = process.env.URL;
mongoose.connect(URL, { useNewUrlParser: true, useCreateIndex: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// logger
app.use(morgan('combined', { stream: accessLogStream }));

// cors setup
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'showcase is coming......'
  });
});

// login
// app.post('/login', cors(), login.authentication);
app.post('/login', cors(), loginTry.authentication);

app.get('/confirmation/:token', email.confirmation);

// initialize routes
app
  .use('/student', cors(), auth.isAuthentication, studentRoute)
  .use('/school', cors(), auth.isAuthentication, schoolRoute)
  .use('/teacher', cors(), auth.isAuthentication, teacherRoute)
  .use('/admin', cors(),auth.isAuthentication, adminRoute)
  .use('/doe', cors(), auth.isAuthentication, doeRoute);

// error handling middleware
app.use(errors.error);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is starting and running at port ${PORT}`);
});

module.exports = app;
