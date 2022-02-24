import * as passport from 'passport';
import * as session from 'express-session';
import * as passportJWT from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

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

        if (result.rows.length === 0 || result.rows[0].user_password !== user_password) {
          return done(null, false, { message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
        }

        return done(null, user_id);
      },
    );
  };

  const jwtVerify = async (payload, done) => {
    await db.query('SELECT * FROM user_table WHERE user_id = $1', [payload.user_id], (err, result) => {
      if (err) {
        return done(err);
      }

      if (result.rows.length === 0) {
        return done(null, false, { message: '인증 정보가 올바르지 않습니다.' });
      }

      const user = result.rows[0];
      return done(null, user);
    });
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
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'jwt-secret-key',
      },
      jwtVerify,
    ),
  );
};
