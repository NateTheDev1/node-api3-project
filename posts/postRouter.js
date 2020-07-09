const express = require("express");
const db = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", validatePostId, (req, res) => {
  db.getById(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  db.remove(req.params.id)
    .then((post) => {
      res.status(200).json({ deleted: post });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Unable to delete post with the id of " + req.params.id,
        err: err,
      });
    });
});

router.put("/:id", validatePostId, (req, res) => {
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

// custom middleware

function validatePostId(req, res, next) {
  db.getById(req.params.id).then((post) => {
    if (!post) {
      res.status(400).json({ message: "invalid post id" });
    } else {
      req.post = req.params.id;
      next();
    }
  });
}

module.exports = router;
