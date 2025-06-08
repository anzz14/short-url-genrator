const express= require('express');

const path= require('path')
const cookieParser = require('cookie-parser')
const {checkForAuthentication, restrictTo}= require('./middleware/auth')
const {connectToMongoDB}= require('./connect');

const app= express();

const staticRoute= require('./routes/staticRouter')
const urlRoute= require('./routes/url');
const userRoute= require('./routes/user');

const URL=require('./models/url');
const PORT= 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=>console.log("mongoDB connected"));

app.set('view engine', "ejs")
app.set('views', path.resolve("./views") )

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser() );
app.use(checkForAuthentication)



app.use("/url", restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/",  staticRoute);

app.get('/url/:shortId', async (req, res)=>{
    const shortId = req.params.shortId;
    const entry= await URL.findOneAndUpdate({
        shortId
    }, {$push: {
        visitHistory: {timestamp: Date.now()},
    },
}
);
res.redirect(entry.redirectURL);
})

app.listen(PORT, ()=>console.log(`server has started at PORT: ${PORT}`));