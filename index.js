const express = require("express");

require("dotenv").config();
const app = express();
const cors = require("cors");
const { connection } = require("./Configs/db");
const { useRouter } = require("./Routes/user.route");
const { postRouter } = require("./Routes/post.route");
const { authenticate } = require("./Middlewares/auth.middleware");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Home Page" });
});
app.use("/users", useRouter);
app.use(authenticate);
app.use("/posts", postRouter);

app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log({ msg: error });
  }
  console.log(`listening on server ${process.env.port}`);
});
