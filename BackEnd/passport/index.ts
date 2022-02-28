import * as passport from 'passport';
import * as session from 'express-session';
import { Strategy as LocalStrategy } from 'passport-local';

const db = require('../db/config');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log('serializeUser', user);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.log('deserializeUser', user);
    done(null, user);
  });

  const localVerify = async (req, user_id, user_password, done) => {
    await db.query(
      'SELECT * FROM user_table WHERE user_id = $1 AND user_password = $2',
      [user_id, user_password],
      (err, result) => {
        if (err) {
          return done(err);
        }

        // https://webaura.tistory.com/entry/NodeJS-%EB%A1%9C%EA%B7%B8%EC%9D%B8%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-%EB%A1%9C%EA%B7%B8%EC%9D%B8%ED%8E%B8?category=500429
        if (result.rows.length === 0 || result.rows[0].user_password !== user_password) {
          return done(null, false, { message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
        }

        return done(null, user_id);
      },
    );
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'user_id',
        passwordField: 'user_password',
        session: true,
        passReqToCallback: true,
      },
      localVerify,
    ),
  );
};
