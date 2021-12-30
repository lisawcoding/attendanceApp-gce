const express = require("express");
const { verifyAccessToken } = require("../../JWT");
const { getRecords, postRecords, deleteRecords, putRecords } = require("../controllers/records");
const recordRouter = express.Router({ mergeParams: true });

recordRouter.get("/", getRecords);
recordRouter.post("/", verifyAccessToken, postRecords);
recordRouter.delete("/:recordId", verifyAccessToken, deleteRecords)
recordRouter.put("/:recordId", verifyAccessToken, putRecords)


//test only
recordRouter.get("/:date", (req, res) => {
     console.log("/:date", req.params);
     Record.find({ date: req.params.date })
          .then((data) => res.json(data))
          .catch((err) => res.json({ error: err }));
});
module.exports = recordRouter;