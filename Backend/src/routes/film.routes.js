const { authJwt } = require("../middlewares");
const controller = require("../controllers/film.controller");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
  app.get("/api/film/all", controller.allFilms);
  app.get("/api/film/searchFilm", controller.searchFilm);
  app.post("/api/film/new", 
    [authJwT.verifyToken, authJwt.isAdmin],
    controller.newFilm
  );
  app.delete("/api/film/delete",
    [authJwT.verifyToken, authJwt.isAdmin],
    controller.deleteFilm
  );
}