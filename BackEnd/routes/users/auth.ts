import 'dotenv/config';
import * as express from 'express';

const router = express.Router();
const db = require('../../db/config');

// 회원 가입
router.post('/signUp', (req, res) => {
  const { user_id, user_password, user_password_confirm } = req.body;

  db.query(
    'insert into user_table(user_id,user_password,user_password_confirm) values($1,$2,$3)',
    [user_id, user_password, user_password_confirm],
    (err, result) => {
      if (err) {
        return res.status(400).json({ status: 400, message: err.message });
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
    if (err) {
      return res.status(400).json({ status: 400, message: err.message });
    }

    if (result.rows.length > 0) {
      return res.status(400).json({ status: 400, message: '이미 존재하는 아이디 입니다.' });
    }

    return res.status(200).json({ status: 200, message: '사용 가능한 아이디 입니다.' });
  });
});

// 로그인
router.post('/login', (req, res) => {
  const { user_id, user_password } = req.body;

  db.query(
    'SELECT * FROM user_table WHERE user_id = $1 AND user_password = $2',
    [user_id, user_password],
    (err, result) => {
      if (err) {
        return res.status(400).json({ status: 400, message: err.message });
      }

      if (result.rows.length === 0 || result.rows[0].user_password !== user_password) {
        return res.status(400).json({ status: 400, message: '아이디 또는 비밀번호가 일치하지 않습니다..' });
      }

      return res.status(200).json({ status: 200, message: 'ok' });
    },
  );
});

module.exports = router;
