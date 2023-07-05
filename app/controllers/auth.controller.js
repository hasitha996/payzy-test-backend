const db = require("../models");
const config = require("../config/auth.config");
const dbconfig = require("../config/db.config");
const User = db.user;
const mysql = require('mysql');
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const connection = mysql.createConnection({
  host: dbconfig.HOST,
  user: dbconfig.USER,
  password:dbconfig.PASSWORD,
  database: dbconfig.DB
});

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    frist_name: req.body.frist_name,
    last_name: req.body.last_name,
    mobile: req.body.mobile,
    date_of_birth: req.body.date_of_birth,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
  res.status(200).send({ message: "User registered successfully!" });

};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours exp
        });
      res.status(200).send({ user: user, token: token });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.userPasswordChange = (req, res) => {

  const updateQuery = `UPDATE users SET password = ? WHERE email = ?`;
  const updatedValues = [ bcrypt.hashSync(req.body.password, 8),req.body.email];
  
  connection.query(updateQuery, updatedValues, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(404).send({ message: "User update faild." });
  
    }
  
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: "User update faild no." });
    }
  
    return res.status(200).send({ message: "User updated successfully."});
   
  });
};
exports.getAllUser = (req, res) => {
  User.findAll()
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      res.status(200).send({ user: user });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.userBoard = (req, res) => {
  res.status(200).send("User avalable.");
};
