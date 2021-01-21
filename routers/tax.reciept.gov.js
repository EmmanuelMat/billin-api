const express = require('express');
const router = express.Router();
const service = require('../services/tax.reciept.gov.service');

router.get('/', async (data, res) => {
    const model = await service.get();
    res.json(model);
});

router.post('/', async (data, res) => {
    const result = await service.post(data);
    res.json(result);
});

module.exports = router;