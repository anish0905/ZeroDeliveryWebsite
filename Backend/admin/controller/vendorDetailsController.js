const venderDetails = require("../../vendor/models/User");


const mongoose = require("mongoose");

exports.getVendorsDetails = async (req, res) => {
    try
    {
    const vendors = await venderDetails.find({});
    res.status(200).json({
        success: true,
        data: vendors
    })
}
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }






}