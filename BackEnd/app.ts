import * as express from "express";
import * as cors from "cors";
import * as passport from 'passport';

// ====================================
// router import
// index 
const indexRouter = require('./routes/index');

// goCamping 
const basedList = require('./routes/goCamping/basedList');
const imageList = require('./routes/goCamping/imageList');
const locationBasedList = require('./routes/goCamping/locationBasedList');
const searchList = require('./routes/goCamping/searchList');

// oauth 
const oAuthKakao = require('./routes/oauth/kakao');
// ====================================

// ====================================
// express settings
const app = express();
app.set('port', process.env.PORT || 4001);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// ====================================

// ====================================
// routes
// index 
app.use("/", indexRouter);

// goCamping 
app.use("/goCamping/basedList", basedList);
app.use("/goCamping/imageList", imageList);
app.use("/goCamping/locationBasedList", locationBasedList);
app.use("/goCamping/searchList", searchList);

// oauth 
app.use('/oauth/kakao', oAuthKakao);
// ====================================

app.listen(4001, () => {
    console.log('Example app listening on port 4001');
});


