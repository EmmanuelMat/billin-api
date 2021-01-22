const express = require('express');
const router = express.Router();
const service = require('../services/tax.service');

router.get('/', async (data, res) => {
    const model = await service.get();
    res.json(model);
});

router.delete('/:id', async (data, res) => {
    const { id } =  req.params;
    const model = await service.remove(id);
    res.json(model);
});


router.post('/', async (data, res) => {
    const result = await service.post(req.body);
    res.json(result);
});

module.exports = router;