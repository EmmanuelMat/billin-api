const express = require('express');
const router = express.Router();
const service = require('../services/tax.reciept.gov.service');

router.get('/', async (req, res) => {
    const model = await service.get();
    res.json(model);
});

router.post('/', async (req, res) => {
    const result = await service.post(req);
    res.json(result);
});

module.exports = router;