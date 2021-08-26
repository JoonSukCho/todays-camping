import * as express from 'express';

const router = express.Router();
const request = require('request');


const url = 'http://api.visitkorea.or.kr/openapi/service/rest/GoCamping/basedList?';
const serviceKey = '8h6BbqRjS0gC4ZAL1Bw6yOwha9E6ODarC3CoZ3n9dOvfX0zdQEBEQXW3E23SiibPIzuPYckNU3ffeguQf9awtQ%3D%3D';

let queryParams = encodeURIComponent('ServiceKey') + '=' + serviceKey   //서비스키
queryParams += '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC');  
queryParams += '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('AppTest');  
queryParams += '&' + '_type=json';  

router.get('/', (req, res) => {
    request(
        {
            url: url + queryParams,
            method: 'GET',
        },
    
        (err, response, body) => {
            res.send(body);
        }
    )
})

module.exports = router;

