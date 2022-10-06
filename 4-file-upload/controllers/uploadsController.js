const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const uploadProductImageLocal = async (req, res) => {

  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }

  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }


  if (productImage.size > 1024) {
    throw new CustomError.BadRequestError('Please upload image smaller 1MB');
  }

  const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`);
  await productImage.mv(imagePath);

  return res.status(StatusCodes.OK).json({ path: `/uploads/${productImage.name}` });

};

const uploadProductImage = async (req, res) => {
  const reslt = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,//this is the path
    {
      folder: 'file_upload',//this is folder when storage it in cloudinary
      use_filename: true,//this for used the same temp name not gen an other name
    }
  )
  fs.unlinkSync(req.files.image.tempFilePath)
  return res.status(StatusCodes.OK).json({ path: reslt.secure_url })
}

module.exports = { uploadProductImage };
