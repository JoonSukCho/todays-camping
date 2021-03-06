// modules
import * as express from 'express';
import * as cors from 'cors';
import * as passport from 'passport';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';

declare global {
  namespace Express {
    interface User {
      user_id?: string;
    }
  }
}

// express settings
const app = express();
const setPassportConfig = require('./passport/index');

app.set('port', process.env.PORT || 4001);
app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(cors({ origin: true, credentials: true }));

app.use(passport.initialize());
setPassportConfig();

// router import
const basedList = require('./routes/goCamping/basedList');
const imageList = require('./routes/goCamping/imageList');
const locationBasedList = require('./routes/goCamping/locationBasedList');
const searchList = require('./routes/goCamping/searchList');
const auth = require('./routes/users/auth');
const userInfo = require('./routes/users/userInfo');
const likeList = require('./routes/users/likeList');

// goCamping
app.use('/goCamping/basedList', basedList);
app.use('/goCamping/imageList', imageList);
app.use('/goCamping/locationBasedList', locationBasedList);
app.use('/goCamping/searchList', searchList);

// user
app.use('/users/auth', auth);
app.use('/users/userInfo', userInfo);
app.use('/users/likeList', likeList);

// listen port
app.listen(process.env.PORT || 4001, () => {
  console.log(`Listening on port ${process.env.PORT || 4001} !!!`);
});

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'FrontEnd/build')));
//   app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname + '../FrontEnd/build/index.html'));
//   });
// }

// ====================================
