const express = require("express");
const router = express.Router();

const Workspace = require("../models/workspace.model");
require("dotenv").config();

router.get("/get/single", async (req, res) => {
  try {
    const userId = req.query.userId;
    const workspaces = await Workspace.find({ members: { $in: userId } })
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
    const workspace = await Workspace.create(req.body);
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

router.delete("/delete/:id", async (req, res) => {
  try {
    await Workspace.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ message: "Workspace Deleted successfully" });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

module.exports = router;
