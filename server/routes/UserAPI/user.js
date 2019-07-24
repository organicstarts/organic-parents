const router = require("express").Router();
const User = require("../../models/user");
const multer = require("multer");
const sharp = require("sharp");
const auth = require("../../middleware/auth");
const passport = require("passport");

/*-------------------------------------------------------------------
                            POST REQUEST                            
---------------------------------------------------------------------*/
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    if (user.ban) res.status(200).send({ msg: "Banned" });
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.get(
  "/users/login/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/users/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    session: false
  }),
  function(req, res) {
    let token = req.user.token;
    res.redirect(`http://localhost:3000?token=${token}&user=${req.user}`);
  }
);

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

/*-------------------------------------------------------------------
                            GET REQUEST                            
---------------------------------------------------------------------*/
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.get("/users/all", auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send();
  }
});
router.get("/users/all/banned", auth, async (req, res) => {
  try {
    const users = await User.find({ ban: true });
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    await user.populate("replies").execPopulate();

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/user/all", async (req, res) => {
  try {
    const user = await User.find().countDocuments();

    res.send({ user });
  } catch (e) {
    res.status(500).send();
  }
});

/*-------------------------------------------------------------------
                            PATCH/PUT REQUEST                            
---------------------------------------------------------------------*/
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "firstName",
    "lastName",
    "email",
    "password",
    "age",
    "about"
  ];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send({ user: req.user });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/users/ban", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(404).send();

  try {
    const user = await User.findById({ _id: req.body.id });
    user.ban = !user.ban;
    user.tokens = [];
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.patch("/users/role", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(404).send();

  try {
    const user = await User.findById({ _id: req.body.id });
    if (user.role === "user") {
      user.role = "moderator";
    } else {
      user.role = "user";
    }
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
/*-------------------------------------------------------------------
                            DELETE REQUEST                            
---------------------------------------------------------------------*/
router.delete("/users/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id);

    // if (!user) {
    //   return res.status(404).send();
    // }
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

/*-------------------------------------------------------------------
                            USER AVATAR                            
---------------------------------------------------------------------*/
const upload = multer({
  limits: {
    fileSize: 2000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  }
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

module.exports = router;
