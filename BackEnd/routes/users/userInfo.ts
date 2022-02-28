import 'dotenv/config';
import * as express from 'express';
import * as passport from 'passport';

const router = express.Router();
const db = require('../../db/config');

router.get('/', (req, res) => {
  if (req.user && req.isAuthenticated()) {
    const user_id = req.user;

    db.query('SELECT user_id,like_list FROM user_table WHERE user_id = $1', [user_id], (err, row) => {
      if (err) {
        return res.status(400).json({ status: 400, message: err.message });
      } else {
        return res.status(200).json({ status: 200, data: row.rows[0] });
      }
    });
  } else {
    return res.status(401).json({ status: 401, message: '로그인 먼저 해주세요' });
  }
});

module.exports = router;
