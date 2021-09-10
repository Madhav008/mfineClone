const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/country", async (req, res, next) => {
  try {
    const products = await prisma.country.findMany({});
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.post("/country", async (req, res, next) => {
  try {
    const data = req.body;
    const country = await prisma.country.create({
      data: data,
    });

    res.json(country);
  } catch (error) {
    next(error);
  }
});
router.get("/country/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const country = await prisma.country.findMany({
      where: {
        code: id,
      },
    });
    res.json(country);
  } catch (err) {
    next(err);
  }
});

router.patch("/country/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const country = await prisma.country.update({
      where: {
        id: Number(id),
      },
      data: data,
    });
    res.json(country);
  } catch (err) {
    next(err);
  }
});

router.delete("/country/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const country = await prisma.country.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(country);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
