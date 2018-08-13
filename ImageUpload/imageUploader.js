
imageUpload = (req, res, next) => {
    console.log("Image Upload")
    console.log(req.file.path, "File");
    if (req.file) {
        res.status(200).json({
            message: "Image Successfully Uploaded",
            image: req.file.path
        })
    } else {
        res.status(400).json({
            message: "Invalid Image Type"
        })
    }
}
module.exports = imageUpload;