const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = new S3Client({ region: process.env.AWS_REGION });
const fs = require('fs');

const uploadFile = async (userId, file) => {
    const fileStream = fs.createReadStream(file.tempFilePath);

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${userId}/${Date.now()}-${file.name}`,
        Body: fileStream,
        ContentType: file.mimetype
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const fileUrl = {
        url: `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`,
        key: params.Key,
        owner: userId,
        mimetype: file.mimetype,
    }
    return fileUrl;
};

const uploadFiles = async (userId, files) => {
    const uploadPromises = files.map(file => uploadFile(userId, file));

    try {
        const uploadResults = await Promise.all(uploadPromises);
        // console.log('All files uploaded successfully:', uploadResults);
        await Promise.all(files.map(file => fs.promises.unlink(file.tempFilePath)));

        return uploadResults;
    } catch (err) {
        console.error('Error uploading files:', err.message);
        throw err;
    }
};

const deleteFile = async (fileKey) => {
    let bucketName = process.env.S3_BUCKET_NAME
    const params = {
        Bucket: bucketName,
        Key: fileKey
    };

    try {
        const command = new DeleteObjectCommand(params);
        await s3Client.send(command);
        // console.log(`File ${fileKey} deleted successfully from bucket ${bucketName}`);
    } catch (error) {
        console.error('Error deleting file:', error);
    }
};

module.exports = { uploadFile, uploadFiles, deleteFile };