const config = require("../config/auth.config");
const db = require("../models");
const Film = db.film;

exports.allFilms = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.searchFilm = (req, res) => {

};
exports.newFilm = (req, res) => {
  Film.findOne({
    name: req.body.name
  },
  (err, film) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    film.push(film._id)
    film.save(err => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "Film was created successfully!" });
    });
  })
};

exports.deleteFilm = (req, res) => {
  Film.findOne({
    name: req.body.name
  },
  (err, film) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    film.splice(film.findIndex(e => e === film._id), 1);
    film.save(err => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "Film was deleted from "+req.body.film+" successfully!" });
    });
  })
};