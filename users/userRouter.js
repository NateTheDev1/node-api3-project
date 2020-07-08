const express = require("express");
const db = require("./userDb");
const postsDB = require("../posts/postDb");

const router = express.Router();

router.post("/", (req, res) => {
  db.insert(req.body)
    .then((newUser) => {
      res.status(201).json({ new: newUser });
    })
    .catch((err) => {
      res.status(500).json({ error: "Unable to add user" });
    });
});

router.post("/:id/posts", (req, res) => {
  const newPost = { user_id: req.params.id, ...req.body };
  postsDB
    .insert(newPost)
    .then((created) => {
      res.status(201).json(created);
    })
    .catch((err) => {
      res.status(500).json({ error: "Unable to make new post" });
    });
});

router.get("/", (req, res) => {
  db.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: "Unable to fetch users" });
    });
});

router.get("/:id", (req, res) => {
  db.getById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(500).json({
          error: "Unable to fetch user with the id of " + req.params.id,
        });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Unable to fetch user with the id of " + req.params.id,
        err: err,
      });
    });
});

router.get("/:id/posts", (req, res) => {
  db.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Unable to fetch user posts with the id of " + req.params.id,
        err: err,
      });
    });
});

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then((user) => {
      res.status(200).json({ deleted: user });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Unable to delete user with the id of " + req.params.id,
        err: err,
      });
    });
});

router.put("/:id", (req, res) => {
  db.update(req.params.id, req.body)
    .then((updated) => {
      res.status(200).json({ updated: updated });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Unable to update user with the id of " + req.params.id,
        err: err,
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
