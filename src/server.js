import dotenv from 'dotenv';
import { configENV } from './config/configENV';
import express from 'express';
import { configLog } from './config/configLogServer';
import { configViewEngine } from './config/viewEngine';
import { initCategoryRouter } from './routes/categoryRouter';
import { iniOrchidRoute } from './routes/orchidRouter';
import { configBodyParse } from './config/configBodyParser';

// import mongoose from 'mongoose';
// import Categories from './models/Categories';
// import Orchids from './models/Orchids';
const app = express();

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
// const exampleData = [
//     {
//         name: 'Cattleya',
//         description: 'The Queen of orchids',
//     },
//     {
//         name: 'Dendrobium',
//         description: 'Known for diversity and durability',
//     },
//     {
//         name: 'Phalaenopsis',
//         description: 'Often called the Moth Orchid',
//     },
//     {
//         name: 'Oncidium',
//         description: 'Recognized by its dancing lady-shaped flowers',
//     },
//     {
//         name: 'Vanda',
//         description: 'Known for large, vibrant flowers',
//     },
//     {
//         name: 'Cymbidium',
//         description: 'Popular for its use in corsages',
//     },
//     {
//         name: 'Miltonia',
//         description: 'Nicknamed the Pansy Orchid',
//     },
//     {
//         name: 'Masdevallia',
//         description: 'Distinctive for its showy and colorful blooms',
//     },
//     {
//         name: 'Epidendrum',
//         description: 'Characterized by its reed-like stems',
//     },
//     {
//         name: 'Laelia',
//         description: 'Often fragrant and elegant in appearance',
//     },
// ];
// const url = 'mongodb://localhost:27017/shoppingFlower';
// const connect = mongoose.connect(url, { family: 4 });

// connect.then(() => {

//     console.log('Connected correctly to server');

//     Categories.insertMany(exampleData)
//         .then((cate) => {
//             console.log(cate);
//         })
//         .catch((err) => {
//             console.log(err);
//         });

// });

//Orchids Sample Data Generator
// const exampleData = [
//     {
//         "name": "Banana",
//         "image": "https://www.forbesindia.com/media/images/2022/Sep/img_193773_banana.jpg",
//         "price": 99,
//         "original": "Thailand",
//         "isNatural": true,
//         "color": "yellow"
//     },
//     {
//         "name": "Mini Banana",
//         "image": "https://cdn-prod.medicalnewstoday.com/content/images/articles/271/271157/bananas-chopped-up-in-a-bowl.jpg",
//         "price": 80,
//         "original": "Thailand",
//         "isNatural": false,
//         "color": "yellow"
//     },
//     {
//         "name": "Blue Orchid",
//         "image": "https://www.epicgardening.com/wp-content/uploads/2023/09/Dyed-Blue-Orchid-Flowers.jpg",
//         "price": 120,
//         "original": "Brazil",
//         "isNatural": true,
//         "color": "blue"
//     },
//     {
//         "name": "Sunflower Orchid",
//         "image": "https://i.pinimg.com/originals/c6/08/8c/c6088c0b8c0efe7dcc0e4ce2bbe30548.jpg",
//         "price": 80,
//         "original": "Vietnam",
//         "isNatural": false,
//         "color": "orange"
//     },
//     {
//         "name": "Elegant White Orchid",
//         "image": "https://img.freepik.com/premium-photo/elegant-white-orchid-table-floral-stock-photo_954894-66959.jpg",
//         "price": 150,
//         "original": "France",
//         "isNatural": true,
//         "color": "white"
//     },
//     {
//         "name": "Purple Passion Orchid",
//         "image": "https://m.media-amazon.com/images/I/81LxOCjQLkL._AC_UF894,1000_QL80_.jpg",
//         "price": 110,
//         "original": "Indonesia",
//         "isNatural": false,
//         "color": "purple"
//     },
//     {
//         "name": "Golden Crown Orchid",
//         "image": "https://cdn11.bigcommerce.com/s-ookf1bkiza/images/stencil/1280x1280/products/21801/24747/tigerb__91036.1536179119.jpg?c=2",
//         "price": 200,
//         "original": "Australia",
//         "isNatural": true,
//         "color": "gold"
//     },
//     {
//         "name": "Fire Red Orchid",
//         "image": "https://3.bp.blogspot.com/-Z4yGuycPjKk/W7g3tzIi5-I/AAAAAAAACwI/jT6C0HvCrVk7putz5By9h21PpIi2SL7yQCLcBGAs/s1600/PB198669.JPG",
//         "price": 130,
//         "original": "Mexico",
//         "isNatural": false,
//         "color": "red"
//     },
//     {
//         "name": "Green Envy Orchid",
//         "image": "https://www.orchidroots.com/static/utils/images/hybrid/hyb_100955340_000006340.jpg",
//         "price": 180,
//         "original": "Japan",
//         "isNatural": true,
//         "color": "green"
//     },
//     {
//         "name": "Silver Splendor Orchid",
//         "image": "https://beautifulgardener.files.wordpress.com/2013/01/4-23-2007-035.jpg?w=640",
//         "price": 160,
//         "original": "Italy",
//         "isNatural": false,
//         "color": "silver"
//     }
// ]
// const url = 'mongodb://localhost:27017/shoppingFlower';
// const connect = mongoose.connect(url, { family: 4 });

// connect.then(() => {

//     console.log('Connected correctly to server');

//     Orchids.insertMany(exampleData)
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
