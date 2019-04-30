const router = require("express").Router();
const Reply = require("../../models/reply");
const Thread = require("../../models/thread");
const auth = require("../../middleware/auth");

/*-------------------------------------------------------------------
                            POST REQUEST                            
---------------------------------------------------------------------*/
router.post("/reply", auth, async (req, res) => {
  const reply = new Reply({
    ...req.body,
    ownerName: `${req.user.firstName} ${req.user.lastName}`,
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

router.get("/replies/thread/:id", async (req, res) => {
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
    const thread = await Thread.findById({ _id: req.params.id });

    await thread
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

    res.send(thread.replies);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/replies/all", async (req, res) => {
  try {
    const replies = await Reply.find().countDocuments();
    res.send({ replies });
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
