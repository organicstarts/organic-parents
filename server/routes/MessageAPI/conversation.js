const router = require("express").Router();
const Conversation = require("../../models/conversation");
const auth = require("../../middleware/auth");
/*-------------------------------------------------------------------
                            POST REQUEST                            
---------------------------------------------------------------------*/
router.post("/convo", auth, async (req, res) => {
  const conversation = new Conversation({
    participants: [req.user._id, req.body.id]
  });

  try {
    await conversation.save();
    res.status(201).send(conversation);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
