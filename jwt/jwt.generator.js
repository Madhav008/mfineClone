const jwt = require("jsonwebtoken");

require("dotenv").config();

const jwtGenerator = (userid) => {
  const payload = {
    userProfile: {
      id: userid,
    },
  };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
};

module.exports = jwtGenerator;
