const express = require("express");
const router = express.Router();

const Workspace = require("../models/workspace.model");
require("dotenv").config();

router.get("/get/single", async (req, res) => {
  try {
    const userId = req.query.userId;
    const workspaces = await Workspace.find({ userId: { $eq: userId } })
      .lean()
      .exec();
    return res.status(200).send(workspaces);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id).lean().exec();
    return res.status(200).send(workspace);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const workspace = await Workspace.create({
      title: req.body.title,
      members: req.body.members,
      userId: req.body.userId,
    });
    return res.status(200).send(workspace);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const workspace = await Workspace.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).send(workspace);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

module.exports = router;
