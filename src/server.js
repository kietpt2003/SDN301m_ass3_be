const dotenv = require('dotenv');
const configENV = require('./config/configENV');
const express = require("express");
const configLog = require('./config/configLogServer');
const configViewEngine = require('./config/viewEngine');
const configBodyParse = require('./config/configBodyParser');
const configCORS = require('./config/configCORS');
const methodOverride = require('method-override')

// const mongoose = require('mongoose');
// const Comments = require('./models/Comments');
// const Categories = require('./models/Categories');
// const Users = require('./models/Users');
// const Orchids = require('./models/Orchids');
const passport = require('passport')
const session = require('express-session');
const flash = require('connect-flash');
const usersRouter = require("./routes/usersRouter");
const { iniOrchidRoute, orchidApiRoute } = require("./routes/orchidRouter");
const initCategoryRouter = require('./routes/categoryRouter');
const configPassport = require('./config/passport');

const app = express();

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

//Config CORS
configCORS(app);

//Config Body-Parser
configBodyParse(app);

//Config .env
configENV(dotenv);

configPassport.passportLocal();

configPassport.passportIsAdmin();

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Config check log server
configLog(app);

//config template engine and config static files
configViewEngine(app);


app.get('/', function (req, res) {
    res.redirect('/users/login');
});
//Init category routes
initCategoryRouter(app);

//Init orchid routes
iniOrchidRoute(app);

//orchid api routes
orchidApiRoute(app);

app.use("/users", usersRouter);

//Categories Sample Data Generator
// const categoriesData = [
//     { categoryName: "Flowers" },
//     { categoryName: "Fruits" },
//     { categoryName: "Electronics" },
//     { categoryName: "Clothing" },
//     { categoryName: "Home Decor" },
//     { categoryName: "Books" },
//     { categoryName: "Sports Equipment" },
//     { categoryName: "Tech Gadgets" },
//     { categoryName: "Outdoor Gear" },
//     { categoryName: "Beauty Products" }
// ];
// const url = 'mongodb://localhost:27017/shoppingFlowerAss3';
// const connect = mongoose.connect(url, { family: 4 });

// connect.then(() => {

//     console.log('Connected correctly to server');

//     Categories.insertMany(categoriesData)
//         .then((cate) => {
//             console.log(cate);
//         })
//         .catch((err) => {
//             console.log(err);
//         });

// });

//Users Sample Data Generator
// const usersData = [
//     { username: "john_doe", password: "securepassword1", isAdmin: false },
//     { username: "alice_smith", password: "strongpassword123", isAdmin: true },
//     { username: "bob_jones", password: "myp@ssw0rd", isAdmin: false }
// ];
// const url = 'mongodb://localhost:27017/shoppingFlowerAss3';
// const connect = mongoose.connect(url, { family: 4 });

// connect.then(() => {

//     console.log('Connected correctly to server');

//     Users.insertMany(usersData)
//         .then((cate) => {
//             console.log(cate);
//         })
//         .catch((err) => {
//             console.log(err);
//         });

// });

// Comments Sample Data Generator
// const commentsData = [
//     { rating: 4, comment: "Beautiful flowers!", author: "65dd2821a87dc6b35c9f6c5b" },
//     { rating: 5, comment: "Great tech gadgets!", author: "65dd2821a87dc6b35c9f6c5c" },
//     { rating: 3, comment: "Nice clothing collection.", author: "65dd2821a87dc6b35c9f6c5b" },
//     { rating: 4, comment: "Tasty fruits!", author: "65dd2821a87dc6b35c9f6c5b" },
//     { rating: 5, comment: "Amazing home decor items.", author: "65dd2821a87dc6b35c9f6c5c" },
//     { rating: 2, comment: "Not a fan of this book.", author: "65dd2821a87dc6b35c9f6c5d" },
//     { rating: 4, comment: "Perfect sports equipment.", author: "65dd2821a87dc6b35c9f6c5c" },
//     { rating: 5, comment: "Innovative tech gadgets.", author: "65dd2821a87dc6b35c9f6c5d" },
//     { rating: 3, comment: "Durable outdoor gear.", author: "65dd2821a87dc6b35c9f6c5d" },
//     { rating: 4, comment: "Quality beauty products.", author: "65dd2821a87dc6b35c9f6c5b" }
// ];
// const url = 'mongodb://localhost:27017/shoppingFlowerAss3';
// const connect = mongoose.connect(url, { family: 4 });

// connect.then(() => {

//     console.log('Connected correctly to server');

//     Comments.insertMany(commentsData)
//         .then((cate) => {
//             console.log(cate);
//         })
//         .catch((err) => {
//             console.log(err);
//         });

// });

//Orchids Sample Data Generator
// const orchidsData = [
//     {
//         name: "Phalaenopsis amabilis",
//         image: "https://www.forbesindia.com/media/images/2022/Sep/img_193773_banana.jpg",
//         isNatural: true,
//         origin: "Southeast Asia",
//         comments: [{
//             "_id": "65dd287f40bdacd80b8ce207"
//             ,
//             "rating": 4,
//             "comment": "Beautiful flowers!",
//             "author": "65dd2821a87dc6b35c9f6c5b"
//             ,
//             "__v": 0,
//             "createdAt": "2024-02-27T00:10:39.207Z"
//             ,
//             "updatedAt": "2024-02-27T00:10:39.207Z"

//         }, {
//             "_id": "65dd287f40bdacd80b8ce208"
//             ,
//             "rating": 5,
//             "comment": "Great tech gadgets!",
//             "author": "65dd2821a87dc6b35c9f6c5c"
//             ,
//             "__v": 0,
//             "createdAt": "2024-02-27T00:10:39.207Z"
//             ,
//             "updatedAt": "2024-02-27T00:10:39.207Z"

//         },],
//         category: "65dd281bf886d1da5d546d40"
//     },
//     {
//         name: "Cattleya labiata",
//         image: "https://cdn-prod.medicalnewstoday.com/content/images/articles/271/271157/bananas-chopped-up-in-a-bowl.jpg",
//         isNatural: true,
//         origin: "Brazil",
//         comments: [{
//             "_id": "65dd287f40bdacd80b8ce209"
//             ,
//             "rating": 3,
//             "comment": "Nice clothing collection.",
//             "author": "65dd2821a87dc6b35c9f6c5b"
//             ,
//             "__v": 0,
//             "createdAt": "2024-02-27T00:10:39.207Z"
//             ,
//             "updatedAt": "2024-02-27T00:10:39.207Z"

//         },
//         {
//             "_id": "65dd287f40bdacd80b8ce20a"
//             ,
//             "rating": 4,
//             "comment": "Tasty fruits!",
//             "author": "65dd2821a87dc6b35c9f6c5b"
//             ,
//             "__v": 0,
//             "createdAt": "2024-02-27T00:10:39.207Z"
//             ,
//             "updatedAt": "2024-02-27T00:10:39.207Z"

//         },],
//         category: "65dd281bf886d1da5d546d40"
//     },
//     {
//         name: "Dendrobium nobile",
//         image: "https://www.epicgardening.com/wp-content/uploads/2023/09/Dyed-Blue-Orchid-Flowers.jpg",
//         isNatural: true,
//         origin: "Himalayas",
//         comments: [{
//             "_id": "65dd287f40bdacd80b8ce20b"
//             ,
//             "rating": 5,
//             "comment": "Amazing home decor items.",
//             "author": "65dd2821a87dc6b35c9f6c5c"
//             ,
//             "__v": 0,
//             "createdAt": "2024-02-27T00:10:39.207Z"
//             ,
//             "updatedAt": "2024-02-27T00:10:39.207Z"

//         },
//         {
//             "_id": "65dd287f40bdacd80b8ce20c"
//             ,
//             "rating": 2,
//             "comment": "Not a fan of this book.",
//             "author": "65dd2821a87dc6b35c9f6c5d"
//             ,
//             "__v": 0,
//             "createdAt": "2024-02-27T00:10:39.207Z"
//             ,
//             "updatedAt": "2024-02-27T00:10:39.207Z"

//         },],
//         category: "65dd281bf886d1da5d546d40"
//     },
//     {
//         name: "Vanda coerulea",
//         image: "https://img.freepik.com/premium-photo/elegant-white-orchid-table-floral-stock-photo_954894-66959.jpg",
//         isNatural: true,
//         origin: "India",
//         comments: [{
//             "_id": "65dd287f40bdacd80b8ce20d"
//             ,
//             "rating": 4,
//             "comment": "Perfect sports equipment.",
//             "author": "65dd2821a87dc6b35c9f6c5c"
//             ,
//             "__v": 0,
//             "createdAt": "2024-02-27T00:10:39.207Z"
//             ,
//             "updatedAt": "2024-02-27T00:10:39.207Z"

//         },
//         {
//             "_id": "65dd287f40bdacd80b8ce20e"
//             ,
//             "rating": 5,
//             "comment": "Innovative tech gadgets.",
//             "author": "65dd2821a87dc6b35c9f6c5d"
//             ,
//             "__v": 0,
//             "createdAt": "2024-02-27T00:10:39.208Z"
//             ,
//             "updatedAt": "2024-02-27T00:10:39.208Z"

//         },],
//         category: "65dd281bf886d1da5d546d40"
//     },
//     {
//         name: "Cymbidium insigne",
//         image: "https://m.media-amazon.com/images/I/81LxOCjQLkL._AC_UF894,1000_QL80_.jpg",
//         isNatural: true,
//         origin: "Himalayas",
//         comments: [{
//             "_id": "65dd287f40bdacd80b8ce20f"
//             ,
//             "rating": 3,
//             "comment": "Durable outdoor gear.",
//             "author": "65dd2821a87dc6b35c9f6c5d"
//             ,
//             "__v": 0,
//             "createdAt": "2024-02-27T00:10:39.208Z"
//             ,
//             "updatedAt": "2024-02-27T00:10:39.208Z"

//         },
//         {
//             "_id": "65dd287f40bdacd80b8ce210"
//             ,
//             "rating": 4,
//             "comment": "Quality beauty products.",
//             "author": "65dd2821a87dc6b35c9f6c5b"
//             ,
//             "__v": 0,
//             "createdAt": "2024-02-27T00:10:39.208Z"
//             ,
//             "updatedAt": "2024-02-27T00:10:39.208Z"

//         },],
//         category: "65dd281bf886d1da5d546d40"
//     },
//     {
//         name: "Oncidium flexuosum",
//         image: "https://cdn11.bigcommerce.com/s-ookf1bkiza/images/stencil/1280x1280/products/21801/24747/tigerb__91036.1536179119.jpg?c=2",
//         isNatural: true,
//         origin: "Central America",
//         comments: [],
//         category: "65dd281bf886d1da5d546d41"
//     },
//     {
//         name: "Miltoniopsis vexillaria",
//         image: "https://3.bp.blogspot.com/-Z4yGuycPjKk/W7g3tzIi5-I/AAAAAAAACwI/jT6C0HvCrVk7putz5By9h21PpIi2SL7yQCLcBGAs/s1600/PB198669.JPG",
//         isNatural: true,
//         origin: "South America",
//         comments: [],
//         category: "65dd281bf886d1da5d546d41"
//     },
//     {
//         name: "Dendrobium kingianum",
//         image: "https://www.orchidroots.com/static/utils/images/hybrid/hyb_100955340_000006340.jpg",
//         isNatural: true,
//         origin: "Australia",
//         comments: [],
//         category: "65dd281bf886d1da5d546d41"
//     },
//     {
//         name: "Brassavola nodosa",
//         image: "https://beautifulgardener.files.wordpress.com/2013/01/4-23-2007-035.jpg?w=640",
//         isNatural: true,
//         origin: "Central America",
//         comments: [],
//         category: "65dd281bf886d1da5d546d41"
//     },
//     {
//         name: "Laelia purpurata",
//         image: "https://beautifulgardener.files.wordpress.com/2013/01/4-23-2007-035.jpg?w=640",
//         isNatural: true,
//         origin: "Brazil",
//         comments: [],
//         category: "65dd281bf886d1da5d546d41"
//     },
//     {
//         name: "Phragmipedium besseae",
//         image: "https://www.epicgardening.com/wp-content/uploads/2023/09/Dyed-Blue-Orchid-Flowers.jpg",
//         isNatural: true,
//         origin: "Peru",
//         comments: [],
//         category: "65dd281bf886d1da5d546d42"
//     },
//     {
//         name: "Catasetum pileatum",
//         image: "https://img.freepik.com/premium-photo/elegant-white-orchid-table-floral-stock-photo_954894-66959.jpg",
//         isNatural: true,
//         origin: "South America",
//         comments: [],
//         category: "65dd281bf886d1da5d546d42"
//     },
//     {
//         name: "Masdevallia infracta",
//         image: "https://m.media-amazon.com/images/I/81LxOCjQLkL._AC_UF894,1000_QL80_.jpg",
//         isNatural: true,
//         origin: "Peru",
//         comments: [],
//         category: "65dd281bf886d1da5d546d42"
//     },
//     {
//         name: "Zygopetalum mackayi",
//         image: "https://cdn11.bigcommerce.com/s-ookf1bkiza/images/stencil/1280x1280/products/21801/24747/tigerb__91036.1536179119.jpg?c=2",
//         isNatural: true,
//         origin: "Brazil",
//         comments: [],
//         category: "65dd281bf886d1da5d546d42"
//     },
//     {
//         name: "Encyclia cochleata",
//         image: "https://3.bp.blogspot.com/-Z4yGuycPjKk/W7g3tzIi5-I/AAAAAAAACwI/jT6C0HvCrVk7putz5By9h21PpIi2SL7yQCLcBGAs/s1600/PB198669.JPG",
//         isNatural: true,
//         origin: "Caribbean",
//         comments: [],
//         category: "65dd281bf886d1da5d546d42"
//     },
//     {
//         name: "Oncidium flexuosum",
//         image: "https://www.orchidroots.com/static/utils/images/hybrid/hyb_100955340_000006340.jpg",
//         isNatural: true,
//         origin: "Central America",
//         comments: [],
//         category: "65dd281bf886d1da5d546d41"
//     },
//     {
//         name: "Miltonia spectabilis",
//         image: "https://beautifulgardener.files.wordpress.com/2013/01/4-23-2007-035.jpg?w=640",
//         isNatural: true,
//         origin: "Brazil",
//         comments: [],
//         category: "65dd281bf886d1da5d546d41"
//     },
//     {
//         name: "Cypripedium acaule",
//         image: "https://beautifulgardener.files.wordpress.com/2013/01/4-23-2007-035.jpg?w=640",
//         isNatural: true,
//         origin: "North America",
//         comments: [],
//         category: "65dd281bf886d1da5d546d41"
//     },
//     {
//         name: "Dendrophylax lindenii",
//         image: "https://www.epicgardening.com/wp-content/uploads/2023/09/Dyed-Blue-Orchid-Flowers.jpg",
//         isNatural: true,
//         origin: "Florida",
//         comments: [],
//         category: "65dd281bf886d1da5d546d41"
//     },
//     {
//         name: "Masdevallia infracta",
//         image: "https://img.freepik.com/premium-photo/elegant-white-orchid-table-floral-stock-photo_954894-66959.jpg",
//         isNatural: true,
//         origin: "South America",
//         comments: [],
//         category: "65dd281bf886d1da5d546d41"
//     },
//     {
//         name: "Laelia anceps",
//         image: "https://m.media-amazon.com/images/I/81LxOCjQLkL._AC_UF894,1000_QL80_.jpg",
//         isNatural: true,
//         origin: "Mexico",
//         comments: [],
//         category: "65dd281bf886d1da5d546d41"
//     },
//     {
//         name: "Paphiopedilum hirsutissimum",
//         image: "https://cdn11.bigcommerce.com/s-ookf1bkiza/images/stencil/1280x1280/products/21801/24747/tigerb__91036.1536179119.jpg?c=2",
//         isNatural: true,
//         origin: "Southeast Asia",
//         comments: [],
//         category: "65dd281bf886d1da5d546d41"
//     },
//     {
//         name: "Epidendrum radicans",
//         image: "https://3.bp.blogspot.com/-Z4yGuycPjKk/W7g3tzIi5-I/AAAAAAAACwI/jT6C0HvCrVk7putz5By9h21PpIi2SL7yQCLcBGAs/s1600/PB198669.JPG",
//         isNatural: true,
//         origin: "Central America",
//         comments: [],
//         category: "65dd281bf886d1da5d546d41"
//     },
//     {
//         name: "Odontoglossum crispum",
//         image: "https://www.orchidroots.com/static/utils/images/hybrid/hyb_100955340_000006340.jpg",
//         isNatural: true,
//         origin: "South America",
//         comments: [],
//         category: "65dd281bf886d1da5d546d41"
//     },
//     {
//         name: "Catasetum macrocarpum",
//         image: "https://beautifulgardener.files.wordpress.com/2013/01/4-23-2007-035.jpg?w=640",
//         isNatural: true,
//         origin: "Central and South America",
//         comments: [],
//         category: "65dd281bf886d1da5d546d41"
//     },
// ];
// const url = 'mongodb://localhost:27017/shoppingFlowerAss3';
// const connect = mongoose.connect(url, { family: 4 });

// connect.then(() => {

//     console.log('Connected correctly to server');

//     Orchids.insertMany(orchidsData)
//         .then((orc) => {
//             console.log(orc);
//         })
//         .catch((err) => {
//             console.log(err);
//         });

// });

const port = process.env.PORT || 8888;

app.listen(port, () => {
    console.log('Server is running on port: ', port);
})
