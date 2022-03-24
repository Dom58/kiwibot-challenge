import express from "express";
import bots from "./bots.js";
import deliveries from './deliveries.js';
import 'dotenv/config';

const router = express.Router();

router.get('/', (req, res) => {
    return res.json({
        message: 'Welcome to Kiwibot technical challenge APIs!',
    })
})

router.use("/bots", bots);
router.use("/deliveries", deliveries);

export default router;
