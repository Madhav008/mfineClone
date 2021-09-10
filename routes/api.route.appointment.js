const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/appointment", async (req, res, next) => {
  try {
    const products = await prisma.appointment.findMany({});
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.post("/appointment", async (req, res, next) => {
  try {
    const data = req.body;
    const appointment = await prisma.appointment.create({
      data: data,
    });

    res.json(appointment);
  } catch (error) {
    next(error);
  }
});
router.get("/appointment/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(appointment);
  } catch (err) {
    next(err);
  }
});

router.patch("/appointment/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const appointment = await prisma.appointment.update({
      where: {
        id: Number(id),
      },
      data: data,
    });
    res.json(appointment);
  } catch (err) {
    next(err);
  }
});

router.delete("/appointment/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const appointment = await prisma.appointment.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(appointment);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
