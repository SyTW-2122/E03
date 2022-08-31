const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.promoteUserAdmin = (req, res) => {
  User.findOne({
    username: req.body.username
  },
  (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.findOne({
      name: req.body.role
    },
    (err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      user.roles.push(role._id)
      user.save(err => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: "User was promoted successfully!" });
      });
    })
  })
};

exports.demoteUser = (req, res) => {
  User.findOne({
    username: req.body.username
  },
  (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.role == "user") {
      res.status(500).send({ message: "User role can not be removed." });
      return;
    }
    Role.findOne({
      name: req.body.role
    },
    (err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      user.roles.splice(user.roles.findIndex(e => e === role._id), 1);
      user.save(err => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: "User was demoted from "+req.body.role+" successfully!" });
      });
    
    })
  })
};


