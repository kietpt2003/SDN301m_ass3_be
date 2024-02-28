const Users = require("../models/Users");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
var passport = require('passport');

class UserController {
  index(req, res) {
    res.render("register", { welcome: "Register Page" });
  }
  async register(req, res, next) {
    const { username, password } = req.body;
    let errors = [];
    if (!username || !password) {
      errors.push({ msg: 'Please enter all fields' });
    }
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
    if (errors.length > 0) {
      res.render('register', {
        errors,
        username,
        password
      });
    }
    else {
      try {
        const url = process.env.URL_DB;
        await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });

        const user = await Users.findOne({ username: username });
        if (user) {
          errors.push({ msg: 'Username already exists' });
          res.render('register', {
            errors,
            username,
            password
          });
        }
        else {
          const newUser = new Users({
            username,
            password
          });
          //Hash password
          const hashedPassword = await bcrypt.hash(newUser.password, 10);
          newUser.password = hashedPassword;
          let data = await newUser.save();
          console.log('check data: ', data);
          res.redirect('/users/login');
        }
      } catch (error) {
        console.error(error);
        return {
          status: 500,
          messageError: error,
        }
      } finally {
        // Close the database connection
        mongoose.connection.close();
      }
    }
  }

  login(req, res, next) {
    res.render('signin')
  }

  async update(req, res, next) {
    console.log('check: ', req.body.currentUserName);
    const { id, currentUserName, username, newPassword, confirmPassword } = req.body;
    const errors = {};
    let isError = false;
    let isExist = false;
    if (id === '' || id === undefined) {
      errors.idRequired = "Required Id";
      isError = true
    } else {
      isExist = await checkUserId(id);
    }
    if (isExist) {
      // Validate username
      if (!username || username.trim() === '') {
        errors.usNameErr = 'Username is required.';
        isError = true
      }

      // Validate password
      if (newPassword && newPassword.trim() !== '') {
        // Password is provided, check if it meets criteria
        if (newPassword.length < 6) {
          errors.passLengthErr = 'Password must be at least 6 characters.';
          isError = true
        }

        // Check if password matches confirm password
        if (newPassword !== confirmPassword) {
          errors.passErr = 'Passwords do not match.';
          isError = true
        }
      }
      if (!newPassword && !confirmPassword) {
        //Bấm update mà ko làm gì
        return res.render('dashboard', { data: { _id: id, username: currentUserName } })
      }
    } else {
      errors.idExist = "Id doesn't exist."
      isError = true
    }
    if (isError) {
      return res.render('dashboard', { data: { _id: id, username: currentUserName }, errors: errors })
    } else {
      try {
        const url = process.env.URL_DB;
        await mongoose.connect(url, { family: 4, dbName: 'interiorConstruction' });
        //Hash password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        Users.updateOne({ _id: id }, { $set: { name: username, password: hashedPassword } });
        const user = await Users.findById(id)
        res.render('dashboard', { data: user })
      } catch (error) {
        console.log('check err: ', error);
      } finally {
        // Close the database connection
        mongoose.connection.close();
      }
    }
  }

  signin(req, res, next) {
    passport.authenticate('local', {
      successRedirect: '/users/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  }

  async dashboard(req, res, next) {
    const userId = req.user;
    const url = process.env.URL_DB;
    await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });
    try {
      //Match user
      const user = await Users.findById(userId)
      res.render('dashboard', { data: user })
    } catch (error) {
      console.log(error);
    } finally {
      // Close the database connection
      mongoose.connection.close();
    }
  }
  signout(req, res, next) {
    req.logout(function (err) {
      if (err) { return next(err); }
      req.flash('success_msg', 'You are logged out');
      res.redirect('/users/login');
    });
  }

}

let checkUserId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id !== '' && id !== undefined) {
        const url = process.env.URL_DB;
        const connect = mongoose.connect(url, { family: 4 });
        connect.then(() => {
          Users.findById(id)
            .then((user) => {
              mongoose.disconnect().then(() => {
                if (user) {
                  resolve(true);
                }
                resolve(false);
              });
            })
            .catch((err) => {
              console.log(err);
              resolve(false);
            });
        })
      } else {
        resolve(false);
      }
    } catch (error) {
      resolve(error)
    }
  })
}

module.exports = new UserController();
