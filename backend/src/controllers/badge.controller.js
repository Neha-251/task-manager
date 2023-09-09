const express = require("express");
const router = express.Router();

const Badge = require("../models/badge.model");
require("dotenv").config();

router.get("/get/all", async (req, res) => {
  try {
    const workspaceId = req.query.workspaceId;
    const badges = await Badge.find({ workspaceId: { $eq: workspaceId } })
      .lean()
      .exec();
    return res.status(200).send(badges);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.get("/get/single/:id", async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id).lean().exec();
    return res.status(200).send(badge);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const badge = await Badge.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).send(badge);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const badge = await Badge.create(req.body);
    return res.status(200).send(badge);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Badge.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ message: "Badge deleted successfully" });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

module.exports = router;
