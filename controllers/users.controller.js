const User = require("../models/user.model");
const Tweet = require("../models/tweet.model");
const bcrypt = require("bcrypt");

module.exports.create = (req, res, next) => {
  res.render("users/register");
};

module.exports.doCreate = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      name: req.body.name,
      username: req.body.username,
      password: hash,
      avatar: "https://i.pravatar.cc/150?u=iron-fake@pravatar.com",
    })
      .then(() => {
        res.redirect("/login");
      })
      .catch(next);
  });
};

module.exports.login = (req, res, next) => {
  res.render("users/login");
};

module.exports.doLogin = (req, res, next) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password).then((match) => {
        if (match) {
          req.session.userId = user.id;
          res.redirect(`/tweets/${user.username}`);
        } else {
          res.redirect("/login");
        }
      });
    } else {
      res.redirect("/login");
    }
  });
};

module.exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

module.exports.edit = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      res.render("users/edit", { user });
    })
    .catch(next);
};

module.exports.doEdit = (req, res, next) => {
  // Note: never trust the HTTP client, always whitelist your expected properties
  User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  })
    .then((user) => {
      res.redirect(`/profile/${user.id}`);
    })
    .catch(next);
};

module.exports.profile = (req, res, next) => {
  User.findById(req.params.id);
  Tweet.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .populate("user")
    .then((data) => {
      const cantDelete = data && data.map((i) => i.user.id === req.user.id)
      res.render("users/profile", { user: data[0].user, tweets: data, cantDelete: cantDelete[0] });
    })

    .catch(next);
};