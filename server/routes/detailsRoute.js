const express=require("express")
const router=express.Router()
const Details=require("../models/details");

// proektde istifade etmesem bele postman ile data post etmek ucun
router.post("/post-detail", async (req, res) => {
    try {
        const newDetail = new Details(req.body);
        const savedDetail = await newDetail.save();
        res.send({
            success: true,
            message: "Detail created successfully"
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});
router.get("/get-details", async (req, res) => {
    const id = req.params.id;
    try {
        const details = await Details.find()
        res.send({
            success: true,
            data: details
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});
router.get("/get-current-detail/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const detail = await Details.findOne({ service: id });
        res.send({
            success: true,
            data: detail
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

module.exports=router