import * as express from 'express';
import 'dotenv/config';

const router = express.Router();
const request = require('request');

const baseURL = 'http://api.visitkorea.or.kr/openapi/service/rest/GoCamping/imageList?';

router.get('/', (req, res) => {
    const { contentId } = req.query;

    let queryParams = 
    encodeURIComponent('ServiceKey') + '=' + process.env.SERVICE_KEY + '&' +
    encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC') + '&' +
    encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest') + '&' +
    encodeURIComponent('contentId') + '=' + encodeURIComponent(String(contentId)) + '&' +
    '_type=json';  

    request(
        {
            url: baseURL + queryParams,
            method: 'GET',
        },
    
        (err, response, body) => {
            res.send(body);
        }
    )
})

module.exports = router;

