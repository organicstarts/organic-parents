const router = require("express").Router();
const Thread = require("../../models/thread");
const auth = require("../../middleware/auth");

/*-------------------------------------------------------------------
                            POST REQUEST                            
---------------------------------------------------------------------*/
router.post("/thread", auth, async (req, res) => {
  let mapKey = `thumbVote.${req.user._id}`;
  const thread = new Thread({
    ...req.body,
    ownerName: `${req.user.firstName} ${req.user.lastName}`,
    owner: req.user._id,
    [mapKey]: 0
  });

  try {
    await thread.save();
    res.status(201).send(thread);
  } catch (e) {
    res.status(400).send(e);
  }
});

/*-------------------------------------------------------------------
                            GET REQUEST                            
---------------------------------------------------------------------*/
router.get("/threads", auth, async (req, res) => {
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
    const threads = await Thread.find({});
    const threadObj = {
      threads: threads,
      count: threads.length
    };
    res.send(threadObj);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/thread/:id", auth, async (req, res) => {
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
                            UPDATE REQUEST                            
---------------------------------------------------------------------*/
router.patch("/thread/lock", auth, async (req, res) => {
  if (!req.user.role === "admin" || !req.user.role === "moderator") {
    res.status(400).send({ msg: "Not Authorized to lock/unlock thread" });
  }

  try {
    const thread = await Thread.findOne({ _id: req.body._id });
    if (!thread) {
      return res.status(404).send();
    }
    thread.lock = !thread.lock;
    await thread.save();
    res.status(200).send(thread);
  } catch (e) {
    res.status(500).send();
  }
});
router.patch("/thread/vote", auth, async (req, res) => {
  let number = req.body.vote;
  let mapKey = req.user._id.toString();
  try {
    const thread = await Thread.findOne({ _id: req.body._id });
    if (!thread) {
      return res.status(404).send();
    }
    if (thread.thumbVote.get(mapKey)) {
      if (number === thread.thumbVote.get(mapKey)) {
        thread.thumbVote.set(mapKey, 0);
        if (number === 1) thread.points -= 1;
        if (number === 2) thread.points += 1;
      } else if (number === 1) {
        thread.thumbVote.set(mapKey, number);
        thread.points += 1;
      } else if (number === 2) {
        thread.thumbVote.set(mapKey, number);
        thread.points -= 1;
      }
    } else {
      thread.thumbVote.set(mapKey, number);
      if (number === 1) thread.points += 1;
      if (number === 2) thread.points -= 1;
    }
    await thread.save();
    res.status(200).send(thread);
  } catch (e) {
    res.status(500).send();
  }
});

/*-------------------------------------------------------------------
                            DELETE REQUEST                            
---------------------------------------------------------------------*/
router.delete("/thread/:id", auth, async (req, res) => {
  if (!req.user.role === "admin" || !req.user.role === "moderator") {
    res.status(400).send({ msg: "Not Authorized to Delete" });
  }

  try {
    const thread = await Thread.findOneAndDelete({
      _id: req.params.id
    });

    if (!thread) {
      res.status(404).send();
    }

    res.send(thread);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
