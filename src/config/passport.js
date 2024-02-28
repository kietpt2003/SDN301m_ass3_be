const passport = require('passport');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const CustomStrategy = require('passport-custom').Strategy;
const Users = require('../models/Users');

const passportLocal = () => {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
            const url = process.env.URL_DB;
            await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });
            try {
                //Match user
                const user = await Users.findOne({ username: username })
                if (!user) {
                    return done(null, false, { message: 'This username is not registed' });
                }
                //Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, { message: 'Password is incorrect' });
                    }
                })
            } catch (error) {
                console.log(error);
            } finally {
                // Close the database connection
                mongoose.connection.close();
            }
        })
    )
    //Từ serialize sang deserialize
    passport.serializeUser(function (user, done) {
        process.nextTick(function () {
            return done(null, user._id);
        });
    });

    passport.deserializeUser(function (user, done) {
        process.nextTick(function () {
            return done(null, user);
        });
    });
}

const passportIsAdmin = () => {
    passport.use(
        'isAdmin-strategy', new CustomStrategy(
            async function (req, callback) {
                const url = process.env.URL_DB;
                await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });
                try {
                    let { i } = req.query; //i for userId
                    if (!i) {
                        i = req.body.i;
                    }
                    if (!i) {
                        i = req.params.i;
                    }
                    console.log('check user id: ', i);

                    // Find user by id and where isAdmin is true
                    const user = await Users.find({ _id: i, isAdmin: true });


                    if (user.length === 0) {
                        console.log('User not found or is not an admin.');
                        return callback(null, false, { message: 'User not found or is not an admin.' });
                    }
                    console.log('Found admin user:', user);
                    callback(null, user[0]);
                } catch (error) {
                    console.log(error);
                    callback(null, false, { message: `Server err: ${error}` });
                } finally {
                    // Close the database connection
                    mongoose.connection.close();
                }
            }
        )
    )
}

module.exports = {
    passportLocal,
    passportIsAdmin
}

// module.exports = function (passport) {
//     passport.use(
//         new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
//             const url = process.env.URL_DB;
//             await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });
//             try {
//                 //Match user
//                 const user = await Users.findOne({ username: username })
//                 if (!user) {
//                     return done(null, false, { message: 'This username is not registed' });
//                 }
//                 //Match password
//                 bcrypt.compare(password, user.password, (err, isMatch) => {
//                     if (err) throw err;
//                     if (isMatch) {
//                         return done(null, user);
//                     }
//                     else {
//                         return done(null, false, { message: 'Password is incorrect' });
//                     }
//                 })
//             } catch (error) {
//                 console.log(error);
//             } finally {
//                 // Close the database connection
//                 mongoose.connection.close();
//             }

//         })
//     )
//     //Từ serialize sang deserialize
//     passport.serializeUser(function (user, done) {
//         process.nextTick(function () {
//             return done(null, user._id);
//         });
//     });

//     passport.deserializeUser(function (user, done) {
//         process.nextTick(function () {
//             return done(null, user);
//         });
//     });
// }
