const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/day", async (req, res, next) => {
  try {
    const day = await prisma.day.findMany({});
    res.json(day);
  } catch (error) {
    next(error);
  }
});

router.post("/day", async (req, res, next) => {
  try {
    const data = req.body;
    const day = await prisma.day.create({
      data: data,
    });

    res.json(day);
  } catch (error) {
    next(error);
  }
});
router.get("/day/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const day = await prisma.day.findMany({
      where: {
        day: id,
      },
      include: {
        DoctorInfo: true,
      },
    });
    res.json(day);
  } catch (err) {
    next(err);
  }
});

router.patch("/day/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const day = await prisma.day.update({
      where: {
        id: Number(id),
      },
      data: data,
    });
    res.json(day);
  } catch (err) {
    next(err);
  }
});

router.delete("/day/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const day = await prisma.day.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(day);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
