import 'dotenv/config';
import * as express from 'express';
import passport = require('passport');
import * as jwt from 'jsonwebtoken';

const router = express.Router();
const db = require('../../db/config');

// 좋아요 목록 가져오기
router.get('/list', (req, res, next) => {
  try {
    const accessToken = (<any>req).headers['access-token'].split('Bearer ')[1];
    const refreshToken = (<any>req).headers['refresh-token'].split('Bearer ')[1];

    if (!accessToken) {
      if (!refreshToken) {
        return res.status(401).json({ success: false, message: '유효하지 않은 토큰입니다.' });
      } else {
        (<any>req).decoded = jwt.verify(refreshToken, process.env.SESSION_SECRET);
        const user_id = (<any>req).decoded.user_id;

        const newAccessToken = jwt.sign({ user_id }, process.env.SESSION_SECRET, {
          expiresIn: '1h',
        });

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

            return res.status(200).json({
              status: 200,
              data: result.rows,
              accessToken: newAccessToken,
            });
          },
        );
      }
    } else {
      (<any>req).decoded = jwt.verify(accessToken, process.env.SESSION_SECRET);
      const user_id = (<any>req).decoded.user_id;

      const newRefreshToken = jwt.sign({ user_id }, process.env.SESSION_SECRET, {
        expiresIn: '14d',
      });

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

          return res.status(200).json({ status: 200, data: result.rows, accessToken, refreshToken: newRefreshToken });
        },
      );
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

// 좋아요 목록에 추가
router.post('/push', (req, res) => {
  try {
    const accessToken = (<any>req).headers['access-token'].split('Bearer ')[1];
    const refreshToken = (<any>req).headers['refresh-token'].split('Bearer ')[1];

    if (!accessToken) {
      if (!refreshToken) {
        return res.status(401).json({ success: false, message: '유효하지 않은 토큰입니다.' });
      } else {
        (<any>req).decoded = jwt.verify(refreshToken, process.env.SESSION_SECRET);
        const user_id = (<any>req).decoded.user_id;

        const newAccessToken = jwt.sign({ user_id }, process.env.SESSION_SECRET, {
          expiresIn: '1h',
        });

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
              return res.status(200).json({ status: 200, accessToken: newAccessToken });
            }
          },
        );
      }
    } else {
      (<any>req).decoded = jwt.verify(accessToken, process.env.SESSION_SECRET);
      const user_id = (<any>req).decoded.user_id;

      const newRefreshToken = jwt.sign({ user_id }, process.env.SESSION_SECRET, {
        expiresIn: '14d',
      });

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
            return res.status(200).json({ status: 200, accessToken, refreshToken: newRefreshToken });
          }
        },
      );
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

// 좋아요 목록에서 제거
router.post('/pop', (req, res) => {
  try {
    const accessToken = (<any>req).headers['access-token'].split('Bearer ')[1];
    const refreshToken = (<any>req).headers['refresh-token'].split('Bearer ')[1];

    if (!accessToken) {
      if (!refreshToken) {
        return res.status(401).json({ success: false, message: '유효하지 않은 토큰입니다.' });
      } else {
        (<any>req).decoded = jwt.verify(refreshToken, process.env.SESSION_SECRET);
        const user_id = (<any>req).decoded.user_id;

        const newAccessToken = jwt.sign({ user_id }, process.env.SESSION_SECRET, {
          expiresIn: '1h',
        });

        const { contentId } = req.body;

        db.query(
          `delete from like_list_table where user_id = $1 and contentId = $2`,
          [user_id, contentId],
          (err, result) => {
            if (err) {
              return res.status(400).json({ status: 400, message: err.message });
            } else {
              return res.status(200).json({ status: 200, accessToken: newAccessToken });
            }
          },
        );
      }
    } else {
      (<any>req).decoded = jwt.verify(accessToken, process.env.SESSION_SECRET);
      const user_id = (<any>req).decoded.user_id;

      const newRefreshToken = jwt.sign({ user_id }, process.env.SESSION_SECRET, {
        expiresIn: '14d',
      });

      const { contentId } = req.body;

      db.query(
        `delete from like_list_table where user_id = $1 and contentId = $2`,
        [user_id, contentId],
        (err, result) => {
          if (err) {
            return res.status(400).json({ status: 400, message: err.message });
          } else {
            return res.status(200).json({ status: 200, accessToken, refreshToken: newRefreshToken });
          }
        },
      );
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
