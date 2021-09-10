const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/city", async (req, res, next) => {
  try {
    const city = await prisma.city.findMany({});
    res.json(city);
  } catch (error) {
    next(error);
  }
});

router.post("/city", async (req, res, next) => {
  try {
    const data = req.body;
    const city = await prisma.city.create({
      data: data,
    });

    res.json(city);
  } catch (error) {
    next(error);
  }
});
router.get("/city/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const city = await prisma.city.findMany({
      where: {
        name: id,
      },
    });
    res.json(city);
  } catch (err) {
    next(err);
  }
});

router.patch("/city/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const city = await prisma.city.update({
      where: {
        id: Number(id),
      },
      data: data,
    });
    res.json(city);
  } catch (err) {
    next(err);
  }
});

router.delete("/city/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const city = await prisma.city.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(city);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
