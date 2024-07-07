const express = require('express')
const { productOrder, cancelledOrder } = require('../controllers/productOrderController')

const router = express.Router()

router.post("/orderProduct",productOrder)
router.put("/cancleOrder",cancelledOrder)

module.exports = router;