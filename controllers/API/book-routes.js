const router = require("express").Router();
const { Book, User } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const booksData = await Book.findAll({
      include: [{ model: User }],
    });

    res.status(200).json(booksData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const booksData = await Book.findByPk(req.params.id, {
      include: [{ model: User }],
    });

    res.status(200).json(booksData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const booksData = await Book.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(booksData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const booksData = await Book.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!booksData) {
      res.status(404).json({ message: "No book found with this id!" });
      return;
    }

    res.status(200).json(booksData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const booksData = await Book.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!booksData) {
      res.status(404).json({ message: "No book found with this id!" });
      return;
    }

    res.status(200).json(booksData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;