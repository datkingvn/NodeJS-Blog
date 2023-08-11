require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')

const connectDB = require('./server/config/db')
const session = require("express-session");
const {isActiveRoute} = require('./server/helpers/routeHelpers');

const app = express();
const PORT = 3000 || process.env.PORT;

// Connect to DB
connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'))

app.use(session({
    secret: 'dat handsome', // Một chuỗi bí mật được sử dụng để ký và mã hóa session cookie
    resave: false, // Chỉ lưu lại session nếu có sự thay đổi trong session
    saveUninitialized: true, // Để lưu trữ cả session chưa được khởi tạo
    store: MongoStore.create({ // Sử dụng MongoStore để lưu trữ session vào MongoDB
        mongoUrl: process.env.MONGODB_URL
    }),
}));


app.use(express.static('public')); // CSS / Images / JS

// Template Engine
app.use(expressLayout);
app.set('layout', './layouts/main'); // Common interface for all pages in the app
app.set('view engine', 'ejs');

app.locals.isActiveRoute = isActiveRoute;

app.use('/', require('./server/routes/main'))
app.use('/', require('./server/routes/admin'))

app.listen(PORT, () => {
    console.log(`App listen on PORT ${PORT}`)
})