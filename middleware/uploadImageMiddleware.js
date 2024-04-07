// upload image middleware
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const s3Client = require("../s3Client");
require("dotenv").config();

const uploadImage = async (file) => {
  try {
    const generateProfileImageName = () => Buffer.from(uuidv4() + Date.now().toString()).toString('hex');
    const profileImageBuffer = await sharp(file.buffer).resize({ height: 200, width: 200, fit: "cover" }).toBuffer();

    const profileImageName = generateProfileImageName();
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: profileImageName,
      Body: profileImageBuffer,
      ContentType: file.mimetype
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    return profileImageName;
  } catch (error) {
    throw new Error("Error uploading image: " + error.message);
  }
};

module.exports = uploadImage;