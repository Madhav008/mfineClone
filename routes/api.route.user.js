const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../jwt/jwt.generator");
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
    const salt = await bcrypt.genSalt(11);

    const bcryptPassword = await bcrypt.hash(data.password, salt);

    const user = await prisma.userProfile.create({
      data: {
        email: data.email,
        gender: data.gender,
        name: data.name,
        phone: data.phone,
        password: bcryptPassword,
      },
    });

    const token = jwtGenerator(user.id);

    res.json({
      token: token,
      data: user,
    });
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

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: fasle,
        error: "Check Email and Pass",
      });
    }

    //   const user = await UserDetail.findOne({ email }).select("+password");
    const user = await prisma.userProfile.findUnique({
      where: {
        email: email,
      },

      select: {
        password: true,
        id: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: fasle,
        error: "Invalid Email and Pass",
      });
    }
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({
        success: fasle,
        error: "Invalid Password",
      });
    }

    const token = jwtGenerator(user.id);

    res.json({
      id: user.id,
      token: token,
      email: email,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
