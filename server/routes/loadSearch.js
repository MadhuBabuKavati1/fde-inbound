import { Router } from "express";
import { readJSON } from "../utils/fileDB.js";

const router = Router();

router.get("/", (req, res) => {
    const { origin, destination } = req.query;
    const loads = readJSON("server/loadData.json");

    const results = loads.filter(l =>
        (!origin || l.origin.toLowerCase().includes(origin.toLowerCase())) &&
        (!destination || l.destination.toLowerCase().includes(destination.toLowerCase()))
    );

    res.json(results);
});

export default router;
