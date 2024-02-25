import dotenv from 'dotenv';
import { configENV } from './config/configENV';
import express from 'express';
import { configLog } from './config/configLogServer';
import { configViewEngine } from './config/viewEngine';
import { initCategoryRouter } from './routes/categoryRouter';
import { iniOrchidRoute } from './routes/orchidRouter';
import { configBodyParse } from './config/configBodyParser';
import { configCORS } from './config/configCORS';

// import mongoose from 'mongoose';
// import Comments from './models/Comments';
// import Categories from './models/Categories';
// import Users from './models/Users';
// import Orchids from './models/Orchids';
const app = express();

//Config CORS
configCORS(app);

//Config Body-Parser
configBodyParse(app);

//Config .env
configENV(dotenv);

//Config check log server
configLog(app);

//config template engine and config static files
configViewEngine(app);


app.get('/', function (req, res) {
    res.redirect('/Orchids');
});
//Init category routes
initCategoryRouter(app);

//Init orchid routes
iniOrchidRoute(app);

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
//     { rating: 4, comment: "Beautiful flowers!", author: "65db861706131b72d6ad24d9" },
//     { rating: 5, comment: "Great tech gadgets!", author: "65db861706131b72d6ad24da" },
//     { rating: 3, comment: "Nice clothing collection.", author: "65db861706131b72d6ad24d9" },
//     { rating: 4, comment: "Tasty fruits!", author: "65db861706131b72d6ad24d9" },
//     { rating: 5, comment: "Amazing home decor items.", author: "65db861706131b72d6ad24da" },
//     { rating: 2, comment: "Not a fan of this book.", author: "65db861706131b72d6ad24db" },
//     { rating: 4, comment: "Perfect sports equipment.", author: "65db861706131b72d6ad24da" },
//     { rating: 5, comment: "Innovative tech gadgets.", author: "65db861706131b72d6ad24db" },
//     { rating: 3, comment: "Durable outdoor gear.", author: "65db861706131b72d6ad24db" },
//     { rating: 4, comment: "Quality beauty products.", author: "65db861706131b72d6ad24d9" }
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
//         comments: ["65db878791381084ddf3df15", "65db878791381084ddf3df16"],
//         category: "65db86052729918f28fe5882"
//     },
//     {
//         name: "Cattleya labiata",
//         image: "https://cdn-prod.medicalnewstoday.com/content/images/articles/271/271157/bananas-chopped-up-in-a-bowl.jpg",
//         isNatural: true,
//         origin: "Brazil",
//         comments: ["65db878791381084ddf3df17", "65db878791381084ddf3df18"],
//         category: "65db86052729918f28fe5882"
//     },
//     {
//         name: "Dendrobium nobile",
//         image: "https://www.epicgardening.com/wp-content/uploads/2023/09/Dyed-Blue-Orchid-Flowers.jpg",
//         isNatural: true,
//         origin: "Himalayas",
//         comments: ["65db878791381084ddf3df19", "65db878791381084ddf3df1a"],
//         category: "65db86052729918f28fe5882"
//     },
//     {
//         name: "Vanda coerulea",
//         image: "https://img.freepik.com/premium-photo/elegant-white-orchid-table-floral-stock-photo_954894-66959.jpg",
//         isNatural: true,
//         origin: "India",
//         comments: ["65db878791381084ddf3df1b", "65db878791381084ddf3df1c"],
//         category: "65db86052729918f28fe5882"
//     },
//     {
//         name: "Cymbidium insigne",
//         image: "https://m.media-amazon.com/images/I/81LxOCjQLkL._AC_UF894,1000_QL80_.jpg",
//         isNatural: true,
//         origin: "Himalayas",
//         comments: ["65db878791381084ddf3df1d", "65db878791381084ddf3df1e"],
//         category: "65db86052729918f28fe5882"
//     },
//     {
//         name: "Oncidium flexuosum",
//         image: "https://cdn11.bigcommerce.com/s-ookf1bkiza/images/stencil/1280x1280/products/21801/24747/tigerb__91036.1536179119.jpg?c=2",
//         isNatural: true,
//         origin: "Central America",
//         comments: [],
//         category: "65db86052729918f28fe5883"
//     },
//     {
//         name: "Miltoniopsis vexillaria",
//         image: "https://3.bp.blogspot.com/-Z4yGuycPjKk/W7g3tzIi5-I/AAAAAAAACwI/jT6C0HvCrVk7putz5By9h21PpIi2SL7yQCLcBGAs/s1600/PB198669.JPG",
//         isNatural: true,
//         origin: "South America",
//         comments: [],
//         category: "65db86052729918f28fe5883"
//     },
//     {
//         name: "Dendrobium kingianum",
//         image: "https://www.orchidroots.com/static/utils/images/hybrid/hyb_100955340_000006340.jpg",
//         isNatural: true,
//         origin: "Australia",
//         comments: [],
//         category: "65db86052729918f28fe5883"
//     },
//     {
//         name: "Brassavola nodosa",
//         image: "https://beautifulgardener.files.wordpress.com/2013/01/4-23-2007-035.jpg?w=640",
//         isNatural: true,
//         origin: "Central America",
//         comments: [],
//         category: "65db86052729918f28fe5883"
//     },
//     {
//         name: "Laelia purpurata",
//         image: "https://beautifulgardener.files.wordpress.com/2013/01/4-23-2007-035.jpg?w=640",
//         isNatural: true,
//         origin: "Brazil",
//         comments: [],
//         category: "65db86052729918f28fe5883"
//     },
//     {
//         name: "Phragmipedium besseae",
//         image: "https://www.epicgardening.com/wp-content/uploads/2023/09/Dyed-Blue-Orchid-Flowers.jpg",
//         isNatural: true,
//         origin: "Peru",
//         comments: [],
//         category: "65db86052729918f28fe5884"
//     },
//     {
//         name: "Catasetum pileatum",
//         image: "https://img.freepik.com/premium-photo/elegant-white-orchid-table-floral-stock-photo_954894-66959.jpg",
//         isNatural: true,
//         origin: "South America",
//         comments: [],
//         category: "65db86052729918f28fe5884"
//     },
//     {
//         name: "Masdevallia infracta",
//         image: "https://m.media-amazon.com/images/I/81LxOCjQLkL._AC_UF894,1000_QL80_.jpg",
//         isNatural: true,
//         origin: "Peru",
//         comments: [],
//         category: "65db86052729918f28fe5884"
//     },
//     {
//         name: "Zygopetalum mackayi",
//         image: "https://cdn11.bigcommerce.com/s-ookf1bkiza/images/stencil/1280x1280/products/21801/24747/tigerb__91036.1536179119.jpg?c=2",
//         isNatural: true,
//         origin: "Brazil",
//         comments: [],
//         category: "65db86052729918f28fe5884"
//     },
//     {
//         name: "Encyclia cochleata",
//         image: "https://3.bp.blogspot.com/-Z4yGuycPjKk/W7g3tzIi5-I/AAAAAAAACwI/jT6C0HvCrVk7putz5By9h21PpIi2SL7yQCLcBGAs/s1600/PB198669.JPG",
//         isNatural: true,
//         origin: "Caribbean",
//         comments: [],
//         category: "65db86052729918f28fe5884"
//     },
//     {
//         name: "Oncidium flexuosum",
//         image: "https://www.orchidroots.com/static/utils/images/hybrid/hyb_100955340_000006340.jpg",
//         isNatural: true,
//         origin: "Central America",
//         comments: [],
//         category: "65db86052729918f28fe5883"
//     },
//     {
//         name: "Miltonia spectabilis",
//         image: "https://beautifulgardener.files.wordpress.com/2013/01/4-23-2007-035.jpg?w=640",
//         isNatural: true,
//         origin: "Brazil",
//         comments: [],
//         category: "65db86052729918f28fe5883"
//     },
//     {
//         name: "Cypripedium acaule",
//         image: "https://beautifulgardener.files.wordpress.com/2013/01/4-23-2007-035.jpg?w=640",
//         isNatural: true,
//         origin: "North America",
//         comments: [],
//         category: "65db86052729918f28fe5883"
//     },
//     {
//         name: "Dendrophylax lindenii",
//         image: "https://www.epicgardening.com/wp-content/uploads/2023/09/Dyed-Blue-Orchid-Flowers.jpg",
//         isNatural: true,
//         origin: "Florida",
//         comments: [],
//         category: "65db86052729918f28fe5883"
//     },
//     {
//         name: "Masdevallia infracta",
//         image: "https://img.freepik.com/premium-photo/elegant-white-orchid-table-floral-stock-photo_954894-66959.jpg",
//         isNatural: true,
//         origin: "South America",
//         comments: [],
//         category: "65db86052729918f28fe5883"
//     },
//     {
//         name: "Laelia anceps",
//         image: "https://m.media-amazon.com/images/I/81LxOCjQLkL._AC_UF894,1000_QL80_.jpg",
//         isNatural: true,
//         origin: "Mexico",
//         comments: [],
//         category: "65db86052729918f28fe5883"
//     },
//     {
//         name: "Paphiopedilum hirsutissimum",
//         image: "https://cdn11.bigcommerce.com/s-ookf1bkiza/images/stencil/1280x1280/products/21801/24747/tigerb__91036.1536179119.jpg?c=2",
//         isNatural: true,
//         origin: "Southeast Asia",
//         comments: [],
//         category: "65db86052729918f28fe5883"
//     },
//     {
//         name: "Epidendrum radicans",
//         image: "https://3.bp.blogspot.com/-Z4yGuycPjKk/W7g3tzIi5-I/AAAAAAAACwI/jT6C0HvCrVk7putz5By9h21PpIi2SL7yQCLcBGAs/s1600/PB198669.JPG",
//         isNatural: true,
//         origin: "Central America",
//         comments: [],
//         category: "65db86052729918f28fe5883"
//     },
//     {
//         name: "Odontoglossum crispum",
//         image: "https://www.orchidroots.com/static/utils/images/hybrid/hyb_100955340_000006340.jpg",
//         isNatural: true,
//         origin: "South America",
//         comments: [],
//         category: "65db86052729918f28fe5883"
//     },
//     {
//         name: "Catasetum macrocarpum",
//         image: "https://beautifulgardener.files.wordpress.com/2013/01/4-23-2007-035.jpg?w=640",
//         isNatural: true,
//         origin: "Central and South America",
//         comments: [],
//         category: "65db86052729918f28fe5883"
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
