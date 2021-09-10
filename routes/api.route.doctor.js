const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/doctor", async (req, res, next) => {
  try {
    const products = await prisma.doctorInfo.findMany({});
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.post("/doctor", async (req, res, next) => {
  try {
    const data = req.body;
    const doctor = await prisma.doctorInfo.create({
      data: data,
    });

    res.json(doctor);
  } catch (error) {
    next(error);
  }
});
router.get("/doctor/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const doctor = await prisma.doctorInfo.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(doctor);
  } catch (err) {
    next(err);
  }
});

router.patch("/doctor/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const doctor = await prisma.doctorInfo.update({
      where: {
        id: Number(id),
      },
      data: data,
    });
    res.json(doctor);
  } catch (err) {
    next(err);
  }
});

router.delete("/doctor/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const doctor = await prisma.doctorInfo.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(doctor);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
