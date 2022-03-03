import * as passport from 'passport';
import * as session from 'express-session';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

const db = require('../db/config');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });

  passport.deserializeUser((user, done) => {
    // user = serializeUser의 done 함수의 2번째 인자
    done(null, user);
  });

  const localVerify = async (user_id, user_password, done) => {
    await db.query(
      'SELECT * FROM user_table WHERE user_id = $1 AND user_password = $2',
      [user_id, user_password],
      (err, user) => {
        if (err) {
          return done(err);
        }

        if (user.rows.length === 0 || user.rows[0].user_password !== user_password) {
          return done(null, false, { message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
        }

        return done(null, user.rows[0]);
      },
    );
  };

  const jwtVerify = async (payload, done) => {
    await db.query('SELECT * FROM user_table WHERE user_id = $1', [payload.user_id], (err, user) => {
      if (err) {
        return done(err);
      }

      if (user.rows.length === 0) {
        return done(null, false, { message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
      }

      return done(null, user.rows[0]);
    });
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'user_id',
        passwordField: 'user_password',
      },
      localVerify,
    ),
  );
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SESSION_SECRET,
      },
      jwtVerify,
    ),
  );
};
