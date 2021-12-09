import * as express from 'express';
import * as cors from 'cors';
import * as passport from 'passport';
import * as path from 'path';

// ====================================
// router import
// index
const request = require('request');
const indexRouter = require('./routes/index');

// goCamping
const basedList = require('./routes/goCamping/basedList');
const imageList = require('./routes/goCamping/imageList');
const locationBasedList = require('./routes/goCamping/locationBasedList');
const searchList = require('./routes/goCamping/searchList');

// oauth
const oAuthKakao = require('./routes/oauth/kakao');
// ====================================

// ====================================
// express settings
const app = express();

app.set('port', process.env.PORT || 3001);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.get('/test', (req, res) => {
  res.send({
    data: 'test',
  });
});

app.get('/goCamping/basedList', (req, res) => {
  const baseURL = 'http://api.visitkorea.or.kr/openapi/service/rest/GoCamping/imageList?';
  const { contentId } = req.query;

  let queryParams =
    encodeURIComponent('ServiceKey') +
    '=' +
    process.env.SERVICE_KEY +
    '&' +
    encodeURIComponent('MobileOS') +
    '=' +
    encodeURIComponent('ETC') +
    '&' +
    encodeURIComponent('MobileApp') +
    '=' +
    encodeURIComponent('AppTest') +
    '&' +
    encodeURIComponent('contentId') +
    '=' +
    encodeURIComponent(String(contentId)) +
    '&' +
    '_type=json';

  request(
    {
      url: baseURL + queryParams,
      method: 'GET',
    },

    (err, response, body) => {
      res.send(body);
    },
  );
});

// ====================================
// routes
// index
app.use('/', indexRouter);

// goCamping
// app.use('/goCamping/basedList', basedList);
app.use('/goCamping/imageList', imageList);
app.use('/goCamping/locationBasedList', locationBasedList);
app.use('/goCamping/searchList', searchList);

// oauth
app.use('/oauth/kakao', oAuthKakao);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'FrontEnd/build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '../FrontEnd/build/index.html'));
  });
}
// ====================================
