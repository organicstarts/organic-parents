const router = require("express").Router();
const Image = require("../../models/image");
const multer = require("multer");
const sharp = require("sharp");
/*-------------------------------------------------------------------
                            IMAGES                           
---------------------------------------------------------------------*/
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  }
});

router.post(
  "/image",
  upload.single("imgFile"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .png()
      .toBuffer();
    let image = new Image({ imgFile: buffer });
    await image.save();
    res.send(image);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/imgFile/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image || !image.imgFile) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(image.imgFile);
  } catch (e) {
    res.status(404).send();
  }
});

router.delete("/image/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    await image.remove();
    res.send(image);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
