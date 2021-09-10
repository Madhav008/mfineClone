const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();



router.get("/user", async (req, res, next) => {
  try {
    const products = await prisma.userProfile.findMany({});
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.post("/user", async (req, res, next) => {
  try {
    const data = req.body;
    const user = await prisma.userProfile.create({
      data: data,
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
});
router.get("/user/:id", async (req, res, next) => {
  const { id } = req.params;

  const user = await prisma.userProfile.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(user);
});

router.patch("/user/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  const user = await prisma.userProfile.update({
    where: {
      id: Number(id),
    },
    data: data,
  });
  res.json(user);
});

router.delete("/user/:id", async (req, res, next) => {
  const { id } = req.params;

  const user = await prisma.userProfile.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(user);
});

module.exports = router;
