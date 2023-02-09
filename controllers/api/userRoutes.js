const express = require("express");
const router = require("express").Router();
const { User, Post } = require("../../models");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  User.findAll()
    .then((locData) => {
      res.json(locData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "error",
        err,
      });
    });
});

router.get("/:id", (req, res) => {
  User.findByPk(req.params.id, {
    include: [Post],
  })
    .then((locData) => {
      res.json(locData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "error",
        err,
      });
    });
});

router.post("/signup", (req, res) => {
    User.findOne({
        where: {
          username: req.body.username,
        },
      })
        .then((userData) => {
          if (!userData) {
            User.create({
                name: "default", // req.body.name,
                username: req.body.username,
                password: req.body.password,
              })
                .then((userData) => {
                  req.session.save(() => {
                    req.session.user_id = userData.id;
                    req.session.username = userData.username;
                    req.session.loggedIn = true;
                    res.json(userData);
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({
                    msg: "error",
                    err,
                  });
                });
          } else {
              return res
                .status(400)
                .json({ msg: "username already exists" });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ msg: "error", err });
        });

  
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((userData) => {
      if (!userData) {
        return res.status(401).json({ msg: "incorrect username or password" });
      } else {
        if (bcrypt.compareSync(req.body.password, userData.password)) {
          req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json(userData);
          });
        } else {
          return res
            .status(401)
            .json({ msg: "incorrect username or password" });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error!", err });
    });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(404).end();
    });
  } else {
    res.status(500).end();
  }
});

module.exports = router;
