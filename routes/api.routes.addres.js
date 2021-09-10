const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/address", async (req, res, next) => {
  try {
    const products = await prisma.address.findMany({});
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.post("/address", async (req, res, next) => {
  try {
    const data = req.body;
    const address = await prisma.address.create({
      data: data,
    });

    res.json(address);
  } catch (error) {
    next(error);
  }
});
router.get("/address/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const address = await prisma.address.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(address);
  } catch (err) {
    next(err);
  }
});

router.patch("/address/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const address = await prisma.address.update({
      where: {
        id: Number(id),
      },
      data: data,
    });
    res.json(address);
  } catch (err) {
    next(err);
  }
});

router.delete("/address/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const address = await prisma.address.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(address);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
