import express from "express";
import Places from "src/controllers/places";

import { HTTP_STATUS, RESPONSES } from "src/config/constants";

const places = new Places();
const router = express.Router();

router.get("/", (req, res) => {
    const body = {
        lat: req.body.lat ? req.body.lat : null,
        lon: req.body.lon ? req.body.lon : null,
        distance: req.body.distance ? req.body.distance : 10,
        page: req.body.page ? req.body.page : 1
    }

    if(body.lat && body.lon){
        places.searchGeo(body).then(response => {
            res.json(response)
        }).catch(error => {
            res.status(HTTP_STATUS.BAD_REQUEST).send({ error })
        })
    } else {
        res.status(HTTP_STATUS.BAD_REQUEST).send({
            error: RESPONSES.PLACES_MISSING_GEO
        })
    }
});

export default router;