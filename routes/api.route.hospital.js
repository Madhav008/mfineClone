const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/hospital", async (req, res, next) => {
  try {
    const products = await prisma.hospitals.findMany({});
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.post("/hospital", async (req, res, next) => {
  try {
    const data = req.body;
    const hospital = await prisma.hospitals.create({
      data: data,
    });

    res.json(hospital);
  } catch (error) {
    next(error);
  }
});
router.get("/hospital/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const hospital = await prisma.hospitals.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        address: true,
        DoctorInfo :true
      },
    });
    res.json(hospital);
  } catch (err) {
    next(err);
  }
});

router.patch("/hospital/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const hospital = await prisma.hospitals.update({
      where: {
        id: Number(id),
      },
      data: data,
    });
    res.json(hospital);
  } catch (err) {
    next(err);
  }
});

router.delete("/hospital/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const hospital = await prisma.hospitals.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(hospital);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
