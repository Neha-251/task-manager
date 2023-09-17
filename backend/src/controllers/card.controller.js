const express = require("express");
const router = express.Router();

const Card = require("../models/card.model");
require("dotenv").config();

router.get("/get/all", async (req, res) => {
  try {
    const workspaceId = req.query.workspaceId;
    const treeId = req.query.treeId;
    const cards = await Card.find({
      workspaceId: { $eq: workspaceId },
      treeId: { $eq: treeId },
    })
      .lean()
      .exec();
    return res.status(200).send(cards);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.get("/get/totalCards", async (req, res) => {
  try {
    const workspaceId = req.query.workspaceId;
    const totalCards = await Card.find({
      workspaceId: { $eq: workspaceId },
    }).count();

    return res.status(200).send({ totalCards });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.get("/get/lastCardId", async (req, res) => {
  try {
    const workspaceId = req.query.workspaceId;
    const cards = await Card.find({ workspaceId: { $eq: workspaceId } })
      .sort({ _id: -1 })
      .limit(1);

    const lastCardId = cards.length > 0 ? cards[0]?.cardId : 0;

    return res.status(200).send({ lastCardId: lastCardId });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.get("/get/single/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id).lean().exec();
    return res.status(200).send(card);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

// router.patch("/update/:id", async (req, res) => {
//   try {
//     const card = await Card.findById(req.params.id).lean().exec();

//     if (!card) return res.status(404).send({ message: "Card not found" });
//     else {
//       const updatedCard = await Card.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {
//           new: true,
//         }
//       );
//       console.log(
//         "🚀 ~ file: card.controller.js:79 ~ router.patch ~ updatedCard:",
//         updatedCard
//       );
//       return res.status(200).send(updatedCard);
//     }
//   } catch (err) {
//     return res.status(400).send({ error: err.message });
//   }
// });

router.patch("/update/:id", async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    console.log(req.body);
    return res.send(updatedCard);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const card = await Card.create(req.body);
    return res.status(200).send(card);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ message: "Card deleted successfully" });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

module.exports = router;
