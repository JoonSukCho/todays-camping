import 'dotenv/config';
import * as express from 'express';

const router = express.Router();
const db = require('../../db/config');

router.post('/', (req, res) => {
  const { user_id, user_password, user_password_confirm, like_list } = req.body;

  db.query(
    'insert into user_table(user_id,user_password,user_password_confirm,like_list) values($1,$2,$3,$4)',
    [user_id, user_password, user_password_confirm, like_list],
    (err, row) => {
      if (err) {
        console.log(err);
      } else {
        return res.status(200).json({ result: 'ok' });
      }
    },
  );
});

module.exports = router;
