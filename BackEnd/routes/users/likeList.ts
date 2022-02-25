import 'dotenv/config';
import * as express from 'express';
import passport = require('passport');

const router = express.Router();
const db = require('../../db/config');

// push likeList
router.post('/push', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ status: 400, message: '로그인 먼저 해주세요' });

    const { content_id, user_id } = req.body;

    db.query(
      'update user_table set like_list = array_append(like_list, $1) where user_id = $2',
      [content_id, user_id],
      (err, result) => {
        if (err) {
          return res.status(400).json({ status: 400, message: err.message });
        } else {
          return res.status(200).json({ status: 200, message: '좋아요 성공' });
        }
      },
    );
  });
});

// pop likeList
router.post('/pop', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ status: 400, message: '로그인 먼저 해주세요' });

    const { content_id, user_id } = req.body;

    db.query(
      'update user_table set like_list = array_remove(like_list, $1) where user_id = $2',
      [content_id, user_id],
      (err, result) => {
        if (err) {
          return res.status(400).json({ status: 400, message: err.message });
        } else {
          return res.status(400).json({ status: 400, message: 'ok' });
        }
      },
    );
  });
});

module.exports = router;
