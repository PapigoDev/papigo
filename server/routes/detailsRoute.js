const express=require("express")
const router=express.Router()
const Details=require("../models/detailsModels");
const authMiddleWare = require("../authMiddleWare/authMiddleWare.jsx");
const cloudinary = require("../config/cloudinaryConfig")
const multer = require('multer');
router.use(express.json());

router.post("/post-detail",authMiddleWare, async (req, res) => {
    try {
        const newDetail = new Details(req.body);
        const response=await newDetail.save();
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
    try {
        const details = await Details.find().populate("walker")
        res.send({
            success: true,
            data: details,
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
        const detail = await Details.findOne({ service: id }).populate("walker");
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
        const detail = await Details.findOne({ walker: walkerId });

        if (!detail) {
            return res.status(404).json({
                success: false,
                message: "Detail not found",
            });
        }

        const filteredDescription = detail.description[lang];

        const filteredPaket = detail.paket.map(item => {
            return {
                ...item.toObject(),
                weekWalker: item.weekWalker[lang]
            };
        }); 

        const filteredData = {
            ...detail.toObject(),
            description: filteredDescription,
            paket: filteredPaket,
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
router.put("/update-detail/:id",authMiddleWare, async (req, res) => {
    console.log("first")
    const detailId = req.params.id;
    console.log(detailId)
  
    try {
        const updatedDetail = await Details.findOneAndUpdate({ walker: detailId },req.body,{ new: true });
  
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
        console.log(result.secure_url)
        res.send({
            success: true,
            message: "Image uploaded successfully",
            data: result.secure_url
        })
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: error.message,
        })
    }
})

router.delete("/delete-detail/:id", async (req, res) => {
    try {
        await Details.findOneAndDelete({ walker: req.params.id })
        res.send({
            success: true,
            message: "Walker delete successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

module.exports=router