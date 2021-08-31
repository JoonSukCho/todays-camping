import * as express from "express";
import * as cors from "cors";

const app = express();
const indexRouter = require('./routes/index');
const basedList = require('./routes/goCamping/basedList');
const imageList = require('./routes/goCamping/imageList');
const locationBasedList = require('./routes/goCamping/locationBasedList');
const searchList = require('./routes/goCamping/searchList');

app.set('port', process.env.PORT || 3001);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use("/", indexRouter);
app.use("/goCamping/basedList", basedList);
app.use("/goCamping/imageList", imageList);
app.use("/goCamping/locationBasedList", locationBasedList);
app.use("/goCamping/searchList", searchList);

app.listen(3001, () => {
    console.log('Example app listening on port 3001');
});


