const Tweet = require("../models/tweet.model");

module.exports.list = (req, res, next) => {
  Tweet.find({})
    .sort({ createdAt: -1 })
    .populate("user")
    .then((tweets) => {
      res.render("tweets/list", { tweets });
    })
    .catch(() => {});
};

module.exports.listId = (req, res, next) => {
  Tweet.find({})
    .sort({ createdAt: -1 })
    .populate("user")
    .then((tweets) => {
      res.render("tweets/list", { tweets });
    })
    .catch(() => {});
};

module.exports.create = (req, res, next) => {
    Tweet.find({})
    .populate("user")
    .then(() => {
      res.render("tweets/new");
    })
    .catch(() => {});
};

module.exports.doCreate = (req, res, next) => {
  // Note: never trust the HTTP client, always whitelist your expected properties
  Tweet.create({
    title: req.body.title,
    message: req.body.message,
    createdAt: req.body.createdAt,
    user: req.user.id,
    avatar: req.user.avatar
  })
    .then(() => {
      res.redirect(`/tweets/${req.user.username}`);
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Tweet.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect(`/profile/${req.user.id}`);
    })
    .catch(next);
};