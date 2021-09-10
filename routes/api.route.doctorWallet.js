const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/doctorWallet", async (req, res, next) => {
  try {
    const products = await prisma.doctorWallet.findMany({});
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.post("/doctorWallet", async (req, res, next) => {
  try {
    const data = req.body;
    const doctorWallet = await prisma.doctorWallet.create({
      data: data,
    });

    res.json(doctorWallet);
  } catch (error) {
    next(error);
  }
});
router.get("/doctorWallet/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const doctorWallet = await prisma.doctorWallet.findMany({
      where: {
        doctorInfoId: Number(id),
      },
    });
    res.json(doctorWallet);
  } catch (err) {
    next(err);
  }
});

router.patch("/doctorWallet", async (req, res, next) => {
  const data = req.body;

  try {
    const doctor = await prisma.doctorWallet.findFirst({
      where: {
        doctorInfoId: data.doctorInfoId,
      },
    });


    const doctorWallet = await prisma.doctorWallet.update({
      where: {
        id: doctor.id,
      },
      data: data,
    });
    res.json(doctorWallet);
  } catch (err) {
    next(err);
  }
});

router.delete("/doctorWallet/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const doctorWallet = await prisma.doctorWallet.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(doctorWallet);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
