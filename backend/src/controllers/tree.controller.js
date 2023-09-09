const express = require("express");
const router = express.Router();

const Tree = require("../models/tree.model");
require("dotenv").config();

router.get("/get/all", async (req, res) => {
  try {
    const workspaceId = req.query.workspaceId;
    const trees = await Tree.find({ workspaceId: { $eq: workspaceId } })
      .sort({ order: 1 })
      .lean()
      .exec();
    return res.status(200).send(trees);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.get("/get/single/:id", async (req, res) => {
  try {
    const badge = await Tree.findById(req.params.id).lean().exec();
    return res.status(200).send(badge);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const tree = await Tree.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).send(tree);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const tree = await Tree.create(req.body);
    return res.status(200).send(tree);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Tree.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ message: "Tree deleted successfully" });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

module.exports = router;
