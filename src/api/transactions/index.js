import express from "express";
import Transactions from "src/controllers/transactions";

const transactions = new Transactions();
const router = express.Router();

router.get('/', (req, res) => {
    const body = {
        page: req.body.page ? req.body.page : 1,
        limit: req.body.limit ? req.body.limit : 100,
    }

    transactions.history(body).then(response => {
        res.json(response)
    }).catch(error => {
        res.status(HTTP_STATUS.BAD_REQUEST).send({ error })
    })
})

export default router;