import 'dotenv/config';
import * as express from 'express';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';

const router = express.Router();
const db = require('../../db/config');

// 로그인
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ status: 400, message: info.message });

    req.logIn(user, { session: false }, (err) => {
      if (err) return next(err);

      const refreshExpiredDays = 14;
      const refreshExpired = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * refreshExpiredDays).valueOf();
      const accessToken = jwt.sign({ user_id: user.user_id }, process.env.SESSION_SECRET, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ user_id: user.user_id }, process.env.SESSION_SECRET, {
        expiresIn: `${refreshExpiredDays}d`,
      });

      return res
        .status(200)
        .json({ status: 200, message: '로그인 성공', accessToken, refreshToken, expired: refreshExpired });
    });
  })(req, res, next);
});

// 로그아웃
router.get('/logout', (req, res) => {
  return res.status(200).json({ status: 200, message: '로그아웃 성공' });
});

// 회원 가입
router.post('/signUp', (req, res) => {
  const { user_id, user_password, user_password_confirm } = req.body;

  db.query(
    'insert into user_table(user_id,user_password,user_password_confirm) values($1,$2,$3)',
    [user_id, user_password, user_password_confirm],
    (err, result) => {
      if (err) {
        return res.status(400).json({ status: 400, message: '이미 존재하는 아이디 입니다.' });
      } else {
        return res.status(200).json({ status: 200, message: '회원 가입 성공.' });
      }
    },
  );
});

// 회원 가입 아이디 중복체크
router.get('/duplicateCheck', (req, res) => {
  const { user_id } = req.query;

  db.query('SELECT COUNT(user_id) FROM user_table WHERE user_id = $1', [user_id], (err, result) => {
    try {
      if (err) {
        return res.status(400).json({ status: 400, message: err.message });
      }

      const count = parseInt(result.rows[0].count, 10);
      if (count > 0) {
        return res.status(400).json({ status: 400, success: false, message: '이미 존재하는 아이디 입니다.' });
      }

      return res.status(200).json({ status: 200, success: true, data: { message: '사용 가능한 아이디 입니다.' } });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error });
    }
  });
});

module.exports = router;
