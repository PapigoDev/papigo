const express=require("express")
const router=express.Router()
const Details=require("../models/details");


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