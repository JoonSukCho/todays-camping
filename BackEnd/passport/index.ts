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

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'user_id',
        passwordField: 'user_password',
        session: true,
        passReqToCallback: true,
      },
      function (req, user_id, user_password, done) {
        db.query(
          'SELECT * FROM user_table WHERE user_id = $1 AND user_password = $2',
          [user_id, user_password],
          (err, result) => {
            if (err) {
              return done(err);
            }

            if (result.rows.length === 0 || result.rows[0].user_password !== user_password) {
              return done(null, false, { message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
            }

            return done(null, true, { message: '로그인 성공' });
          },
        );
      },
    ),
  );
};
