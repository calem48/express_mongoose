const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');


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

module.exports = { uploadProductImageLocal };
