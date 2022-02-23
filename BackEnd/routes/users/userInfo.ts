import 'dotenv/config';
import * as express from 'express';

const router = express.Router();
const db = require('../../db/config');

router.get('/', (req, res) => {
  const { user_id } = req.query;

  db.query('SELECT * FROM user_table WHERE user_id = $1', [user_id], (err, row) => {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json(row);
    }
  });
});

module.exports = router;
