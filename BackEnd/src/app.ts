import * as express from 'express';
import * as cors from 'cors';

const app = express();
const port = 3001;
const openAPI = require('./Router/openAPI');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use("/api", openAPI);

app.listen(3001, () => {
    console.log('Example app listening on port 3001');
});

