const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller");
const tweets = require("../controllers/tweets.controller");
const secure = require("../middlewares/secure.middleware");

router.get("/tweets/register", secure.check, tweets.create);
router.post("/tweets", secure.check, tweets.doCreate);
router.get("/tweets", tweets.list);
router.get("/tweets/:id", secure.check, tweets.listId);
router.post("/tweets/:id/delete", secure.check, tweets.delete);


// CRUD de usuarios
router.get("/users/register", users.create);
router.post("/users", users.doCreate);
router.get("/login", users.login);
router.post("/login", users.doLogin);
router.get("/profile/:id", secure.check, users.profile);
router.get("/profile/:id/edit", secure.check, users.edit);
router.post("/profile/:id", secure.check, users.doEdit);
router.post("/logout", secure.check, users.logout);
router.get("/", (req, res) => res.redirect("/tweets"));
module.exports = router;