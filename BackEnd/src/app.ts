import * as express from 'express';

const app = express();

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World');
});

app.listen(3001, () => {
    console.log('Example app listening on port 3001');
});


