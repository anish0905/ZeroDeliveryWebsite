const express = require('express');
const router = express.Router();

const banner = require('../controller/bannerController');

router.get('/banners', banner.getBanners).post('/banners/uploads', banner.createBanner);
router.get('/banners/:id', banner.getBannerById).put('/banners/:id', banner.updateBanner).delete('/banners/:id', banner.deleteBanner);

module.exports = router;
