const express = require('express')
const { productOrder, cancelledOrder, getProductOrdersByUserId } = require('../controllers/productOrderController')

const router = express.Router()

router.post("/orderProduct",productOrder)
router.put("/cancleOrder",cancelledOrder)
router.get("/getHistory/:userId", getProductOrdersByUserId )


module.exports = router;