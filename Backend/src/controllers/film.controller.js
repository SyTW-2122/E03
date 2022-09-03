const config = require("../config/auth.config");
const db = require("../models");
const Film = db.film;

exports.allFilms = (req, res) => {
  Film.find(
    {},
    (err, films) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send(films);
    })
};

exports.searchFilm = (req, res) => {
  Film.findOne({
    name: req.body.name
  },
  (err, film) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!film) {
      return res.status(404).send({ message: "Film Not found." });
    }
    res.status(200).send(film);
  })
};
exports.newFilm = (req, res) => {
  const film = new Film({
    name: req.body.name,
    desc: req.body.desc,
    gender: req.body.gender,
    image: req.body.image,
  });
  film.save(err => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Film stored."});
  });
}

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