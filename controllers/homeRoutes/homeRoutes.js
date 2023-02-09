const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const bcrypt = require("bcrypt")

router.get("/", async (req, res) => {
  if (req.session.loggedIn) {
    const user = await User.findOne({
      where: { id: req.session.user_id },
      include: [{ model: Post }],
    });
    const userData = user.get({ plain: true });
    userData.loggedIn = req.session.loggedIn;
    //console.log(userData);
    res.render("homepage", userData);
  } else {
    res.redirect("/login");
  }
});

router.get("/profile", async (req, res) => {
  if (req.session.loggedIn) {
    const user = await User.findOne({
      where: { id: req.session.user_id },
      include: [{ model: Post }],
    });
    const userData = user.get({ plain: true });
    userData.loggedIn = req.session.loggedIn;
    //console.log(userData);
    res.render("profile", userData);
  } else {
    res.status(500).json({ msg: "must log in first" });
  }
});

router.get("/login", async (req, res) => {
  if (req.session.loggedIn) {
    const user = await User.findOne({
      where: { id: req.session.user_id },
      include: [{ model: Post }],
    });
    const userData = user.get({ plain: true });
    res.redirect("/");
  } else {
    res.render("login");
  }
});

router.get("/logout", async (req, res) => {
  if (req.session.loggedIn) {
    req.session.loggedIn = false;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/post/:id", async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
    attributes: {
      exclude: ["password"],
    },
    include: [{ model: User }],
  });
  if (!post) {
    res.status(404).json({ msg: "fail" });
  } else {
    const postData = post.get({ plain: true });
    res.render("post", postData);
  }
});

module.exports = router;
