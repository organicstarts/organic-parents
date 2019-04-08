const router = require("express").Router();
const Thread = require("../../models/thread");
const auth = require("../../middleware/auth");

/*-------------------------------------------------------------------
                            POST REQUEST                            
---------------------------------------------------------------------*/
router.post("/thread", auth, async (req, res) => {
    const thread = new Thread({
      ...req.body,
      owner: req.user._id
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
      const threads = await Thread.find({})
      res.send(threads);
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







  module.exports = router;
