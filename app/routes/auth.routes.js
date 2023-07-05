const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/signup",
    [
      verifySignUp.checkDuplicateUser
    ],
    controller.signup
  );

  app.post("/user_signin", controller.signin);

  app.post("/change_password", [authJwt.verifyToken], controller.userPasswordChange);

  app.get("/users", controller.getAllUser);
  
  app.get(
    "/test_user",
    [authJwt.verifyToken],
    controller.userBoard
  );
};
