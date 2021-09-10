const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻" });
});

app.use("/api", require("./routes/api.route.user"));
app.use("/api", require("./routes/api.route.doctor"));
app.use("/api", require("./routes/api.route.category"));
app.use("/api", require("./routes/api.route.country"));
app.use("/api", require("./routes/api.route.state"));
app.use("/api", require("./routes/api.route.hospital"));
app.use("/api", require("./routes/api.route.day"));
app.use("/api", require("./routes/api.routes.addres"));
app.use("/api", require("./routes/api.route.appointment"));
app.use("/api", require("./routes/api.route.doctorWallet"));
app.use("/api", require("./routes/api.route.doctorWithdraw"));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
