const express = require("express");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PostModel } = require("../Models/post.model");
const postRouter = express.Router();
const { model } = require("mongoose");
require("dotenv").config();

postRouter.get("/", async (req, res) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "masai");
    try {
        if (decoded) {
            const post = await PostModel.find({ userID: decoded.userID });
            res.status(200).send(post);

        }

    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
});




postRouter.post("/add", async (req, res) => {
    const payload = req.body;
    try {
        const post = new PostModel(payload);
        await post.save();
          res.status(200).send({"msg": "New Post added successfully"});
    } catch (error) {
         res.status(400).send({ msg: error.message });
    }
})


postRouter.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    let payload = req.body;
    try {
        await PostModel.findByIdAndUpdate({ _id: id }, payload);
        res.status(200).send({ msg: " Post updated successfully" });
    } catch (error) {
          res.status(400).send({ msg: error.message });
    }
})


postRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
 
  try {
    await PostModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: " Post deleted successfully" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});


module.exports = {
  postRouter
};
