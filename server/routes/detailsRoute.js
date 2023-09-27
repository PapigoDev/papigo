const express=require("express")
const router=express.Router()
const Details=require("../models/details");
router.use(express.json());

const cloudinary = require("../config/cloudinaryConfig")
const multer = require('multer');

// proektde istifade etmesem bele postman ile data post etmek ucun
router.post("/post-detail", async (req, res) => {
    console.log(req.body)
    try {
        const newDetail = new Details(req.body);
        const response=await newDetail.save();
        // console.log(response)
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
        const details = await Details.find().populate("service")
        res.send({
            success: true,
            data: details,
            salma:1
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
        const detail = await Details.findOne({ service: id }).populate("service");
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
router.get("/get-current-detail-lang-filter", async (req, res) => {
    const lang = req.query.lang || "en";
    const walkerId = req.query.walkerId;

    try {
        const detail = await Details.findOne({ service: walkerId });

        if (!detail) {
            return res.status(404).json({
                success: false,
                message: "Detail not found",
            });
        }

        const filteredData = {
            ...detail.toObject(),
            description: detail.description[lang],
        };

        res.status(200).json({
            success: true,
            message: "Detail Fetched successfully",
            data: filteredData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
router.put("/update-detail/:id", async (req, res) => {
    const detailId = req.params.id;
  
    try {
        const updatedDetail = await Details.findOneAndUpdate({ service: detailId },req.body,{ new: true });
  
      if (!updatedDetail) {
        return res.status(404).json({
          success: false,
          message: "Detail not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Detail updated successfully",
        data: updatedDetail,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });



//get image from pc
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname)
    }
});
router.post("/upload-image-to-walker-detail", multer({ storage: storage }).single("file"), async (req, res) => {
    console.log("first")
    try {
        //upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "papigo" })
        const detailId = req.body.detailId
        await Details.findOneAndUpdate({ service: detailId }, {
            $push: { images: result.secure_url }
        })
        res.send({
            success: true,
            message: "Image uploaded successfully",
            data: result.secure_url
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
})

module.exports=router