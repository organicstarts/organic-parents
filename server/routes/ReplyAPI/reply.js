const router = require("express").Router();
const Reply = require("../../models/reply");
const auth = require("../../middleware/auth");

/*-------------------------------------------------------------------
                            POST REQUEST                            
---------------------------------------------------------------------*/
router.post("/reply", auth, async (req, res) => {
  const reply = new Reply({
    ...req.body,
    owner: req.user._id
  });

  try {
    await reply.save();
    res.status(201).send(reply);
  } catch (e) {
    res.status(400).send(e);
  }
});

/*-------------------------------------------------------------------
                            GET REQUEST                            
---------------------------------------------------------------------*/
router.get("/replies", auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: "replies",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort
        }
      })
      .execPopulate();
    res.send(req.user.replies);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/posts/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const post = await post.findOne({ _id, owner: req.user._id });

    if (!post) {
      return res.status(404).send();
    }

    res.send(post);
  } catch (e) {
    res.status(500).send();
  }
});

/*-------------------------------------------------------------------
                            PATCH REQUEST                            
---------------------------------------------------------------------*/
router.patch("/posts/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["content", "completed"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const post = await Post.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!post) {
      return res.status(404).send();
    }

    updates.forEach(update => (post[update] = req.body[update]));
    await post.save();
    res.send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});

/*-------------------------------------------------------------------
                            DELETE REQUEST                            
---------------------------------------------------------------------*/
router.delete("/replies/:id", auth, async (req, res) => {
  try {
    const reply = await Reply.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!reply) {
      res.status(404).send();
    }

    res.send(reply);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
