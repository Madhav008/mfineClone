const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/category", async (req, res, next) => {
  try {
    const products = await prisma.category.findMany({});
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.post("/category", async (req, res, next) => {
  try {
    const data = req.body;
    const category = await prisma.category.create({
      data: data,
    });

    res.json(category);
  } catch (error) {
    next(error);
  }
});
router.get("/category/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(category);
  } catch (err) {
    next(err);
  }
});

router.patch("/category/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: data,
    });
    res.json(category);
  } catch (err) {
    next(err);
  }
});

router.delete("/category/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(category);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
