import * as express from 'express';

const router = express.Router();

router.get('/', function (req, res, next) {
  console.log('Index Router !!!');

  res.send('index');
});

module.exports = router;
