const express = require('express');

const router = express.Router();

const {
    getRecommendations
} = require('../services/recommendationService');

router.post('/', async (req, res) => {

    try {

        const { cartItems } = req.body;

        const recommendations =
            await getRecommendations(
                cartItems
            );

        res.status(200).json(
            recommendations
        );

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                'Recommendation Error'
        });
    }
});

module.exports = router;