import 'dotenv/config';
import * as express from 'express';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';

const router = express.Router();
const db = require('../../db/config');

router.get('/', (req, res, next) => {
  try {
    const accessToken = (<any>req).headers['access-token'].split('Bearer ')[1];
    const refreshToken = (<any>req).headers['refresh-token'].split('Bearer ')[1];

    if (!accessToken) {
      // accessToken과 refreshToken이 없을 때
      if (!refreshToken) {
        return res.status(401).json({ success: false, message: '유효하지 않은 토큰입니다.' });
        // accessToken만 없을 때
      } else {
        (<any>req).decoded = jwt.verify(refreshToken, process.env.SESSION_SECRET);
        const user_id = (<any>req).decoded.user_id;

        const newAccessToken = jwt.sign({ user_id }, process.env.SESSION_SECRET, {
          expiresIn: '1h',
        });

        db.query('SELECT user_id,like_list FROM user_table WHERE user_id = $1', [user_id], (err, row) => {
          if (err) {
            return res.status(400).json({ status: 400, message: err.message });
          } else {
            return res.status(200).json({ status: 200, data: row.rows[0], accessToken: newAccessToken });
          }
        });
      }
    } else {
      // refreshToken만 없을 때
      (<any>req).decoded = jwt.verify(accessToken, process.env.SESSION_SECRET);
      const user_id = (<any>req).decoded.user_id;

      const newRefreshToken = jwt.sign({ user_id }, process.env.SESSION_SECRET, {
        expiresIn: '14d',
      });

      db.query('SELECT user_id,like_list FROM user_table WHERE user_id = $1', [user_id], (err, row) => {
        if (err) {
          return res.status(400).json({ status: 400, message: err.message });
        } else {
          return res.status(200).json({ status: 200, data: row.rows[0], accessToken, refreshToken: newRefreshToken });
        }
      });
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(419).json({
        success: false,
        message: '토큰이 만료되었습니다.',
      });
    }

    return res.status(401).json({ success: false, message: '유효하지 않은 토큰입니다.' });
  }
});

module.exports = router;
