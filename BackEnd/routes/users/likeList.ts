import 'dotenv/config';
import * as express from 'express';
import passport = require('passport');

const router = express.Router();
const db = require('../../db/config');

// 좋아요 목록 가져오기
router.get('/list', (req, res, next) => {
  if (req.user && req.isAuthenticated()) {
    const user_id = req.user;

    db.query(
      `SELECT 
        user_id,contentId,facltNm,addr1,addr2,mapX,mapY
        ,tel,homepage,firstImageUrl,siteBottomCl1,siteBottomCl2,siteBottomCl3
        ,siteBottomCl4,siteBottomCl5,sbrsCl,animalCmgCl,openPdCl
         FROM like_list_table WHERE user_id = $1`,
      [user_id],
      (err, result) => {
        if (err) {
          return res.status(400).json({ status: 400, message: err.message });
        }

        return res.status(200).json({ status: 200, data: result.rows, message: '좋아요 목록 가져오기 성공.' });
      },
    );
  } else {
    return res.status(400).json({ status: 401, message: '로그인 먼저 해주세요.' });
  }
});

// 좋아요 목록에 추가
router.post('/push', (req, res) => {
  if (req.user && req.isAuthenticated()) {
    const {
      contentId,
      facltNm,
      addr1,
      addr2,
      mapX,
      mapY,
      tel,
      homepage,
      firstImageUrl,
      siteBottomCl1,
      siteBottomCl2,
      siteBottomCl3,
      siteBottomCl4,
      siteBottomCl5,
      sbrsCl,
      animalCmgCl,
      openPdCl,
    } = req.body;
    const user_id = req.user;

    db.query(
      `insert into 
      like_list_table(user_id,contentId,facltNm,addr1,addr2,mapX,mapY
        ,tel,homepage,firstImageUrl,siteBottomCl1,siteBottomCl2,siteBottomCl3
        ,siteBottomCl4,siteBottomCl5,sbrsCl,animalCmgCl,openPdCl)
      values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
      `,
      [
        user_id,
        contentId,
        facltNm,
        addr1,
        addr2,
        mapX,
        mapY,
        tel,
        homepage,
        firstImageUrl,
        siteBottomCl1,
        siteBottomCl2,
        siteBottomCl3,
        siteBottomCl4,
        siteBottomCl5,
        sbrsCl,
        animalCmgCl,
        openPdCl,
      ],
      (err, result) => {
        if (err) {
          return res.status(400).json({ status: 400, message: err.message });
        } else {
          return res.status(200).json({ status: 200, message: '좋아요 성공' });
        }
      },
    );
  } else {
    return res.status(401).json({ status: 401, message: '로그인 먼저 해주세요' });
  }
});

// 좋아요 목록에서 제거
router.post('/pop', (req, res) => {
  if (req.user && req.isAuthenticated()) {
    const { contentId } = req.body;
    const user_id = req.user;

    db.query(
      'delete from like_list_table where user_id = $1 and contentId = $2',
      [user_id, contentId],
      (err, result) => {
        if (err) {
          return res.status(400).json({ status: 400, message: err.message });
        } else {
          return res.status(200).json({ status: 200, message: '좋아요 해제 성공' });
        }
      },
    );
  } else {
    return res.status(401).json({ status: 401, message: '로그인 먼저 해주세요' });
  }
});

module.exports = router;
