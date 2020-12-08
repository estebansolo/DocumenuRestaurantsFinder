import express from "express";
import places from "src/api/places";
import transactions from "src/api/transactions";

const router = express.Router();

router.use("/places", places);
router.use("/transactions", transactions);

export default router;
