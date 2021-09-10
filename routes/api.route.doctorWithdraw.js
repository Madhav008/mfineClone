const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/doctorWithdrawRequest", async (req, res, next) => {
  try {
    const products = await prisma.dotorWithdrawRequest.findMany({});
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.post("/doctorWithdrawRequest", async (req, res, next) => {
  try {
    const data = req.body;
    const doctorWithdrawRequest = await prisma.dotorWithdrawRequest.create({
      data: data,
    });

    res.json(doctorWithdrawRequest);
  } catch (error) {
    next(error);
  }
});
router.get("/doctorWithdrawRequest/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const doctorWithdrawRequest = await prisma.dotorWithdrawRequest.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        doctor: true,
      },
    });
    res.json(doctorWithdrawRequest);
  } catch (err) {
    next(err);
  }
});

router.patch("/doctorWithdrawRequest/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const doctorWithdrawRequest = await prisma.dotorWithdrawRequest.update({
      where: {
        id: Number(id),
      },
      data: data,
    });
    res.json(doctorWithdrawRequest);
  } catch (err) {
    next(err);
  }
});

router.delete("/doctorWithdrawRequest/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const doctorWithdrawRequest = await prisma.dotorWithdrawRequest.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(doctorWithdrawRequest);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
