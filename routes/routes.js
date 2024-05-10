const express = require('express');
const router = express.Router();
const { getLinkDocument } = require('../controllers/getLinkDocumentControllers');

router.get('/getLink/:idPedido', getLinkDocument);

module.exports = router;
