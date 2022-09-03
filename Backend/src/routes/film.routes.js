const { authJwt } = require("../middlewares");
const controllerFilm = require("../controllers/film.controller");


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/film/all", controllerFilm.allFilms);
  app.get("/api/film/searchFilm", controllerFilm.searchFilm);
  app.post("/api/film/new", 
    [authJwt.verifyToken, authJwt.isAdmin],
    controllerFilm.newFilm
  );
  app.delete("/api/film/delete",
    [authJwt.verifyToken, authJwt.isAdmin],
    controllerFilm.deleteFilm
  );
}