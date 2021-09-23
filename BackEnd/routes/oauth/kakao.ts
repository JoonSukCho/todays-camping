/**
 * OAuth Kakao Login Process
 * ---------------------------
 * 
 * 프론트엔드에서 백엔드의 /oauth/kakao url로 인가코드 요청을 보낸다.
 * 카카오에서 로그인 화면으로 리다이렉팅 시켜주고 인가코드를 보내준다.
 * 로그인, 정보제공동의 후 callbackURL(프론트엔드)로 리다이렉팅 시켜준다.
 * 리다이렉팅 된 페이지에서, 카카오에서 받은 인증코드를 파라미터에 포함시켜
 * 백엔드로 인증 요청을 보낸다.
 * 
 * callback에서 user 정보들을 return 해준다..!
 * 
 * 연결된 서비스 해제
 * https://accounts.kakao.com/weblogin/account/partner
 * 
 * 참고문서
 * https://devhaks.github.io/2019/05/31/oauth2/
 */

 import * as express from 'express';
 import 'dotenv/config';
 
 const router = express.Router();
 const passport = require('passport');
 const KakaoStrategy = require('passport-kakao').Strategy;
 
 passport.use(new KakaoStrategy({
     clientID : process.env.REST_API_KEY,
     clientSecret: "", // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
     callbackURL : process.env.REDIRECT_URI
 },
 (accessToken, refreshToken, profile, done) => {
     // authorization 에 성공했을때의 액션
     console.log(`accessToken : ${accessToken}`)
     console.log(`사용자 profile: ${JSON.stringify(profile._json)}`)
     let user = {
         profile: profile._json,
         accessToken: accessToken
     }
 
     return done(null, user)
 }
 ))
 
 // 세션에 사용자 정보 저장
 passport.serializeUser(function (user, done) {
     console.log(`passport.serializeUser : ${user.profile.id}`)
     done(null, user)
 })
 
 passport.deserializeUser(function (obj, done) {
     console.log(`passport.deserializeUser : ${obj}`)
     done(null, obj)
 })
 
 router.get('/callback', passport.authenticate('kakao'), (req: any, res) => {
     const { accessToken } = req.user;
     const { id, properties } = req.user.profile;
     const { nickname, profile_image, thumbnail_image } = properties;
 
     console.log('properties ~~~~~~~~~~', properties);
 
     res.send({ id, nickname, profile_image, thumbnail_image, accessToken })
 })
 
 module.exports = router;