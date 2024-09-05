import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const s3 = new AWS.S3();

export const uploadFileToS3 = async (file, bucketName) => {
  const params = {
    Bucket: bucketName,
    Key: `${Date.now()}_${file.name}`,
    Body: file,
    ContentType: file.type,
  };

  try {
    const uploadResponse = await s3.upload(params).promise();
    return uploadResponse.Location;
  } catch (err) {
    throw new Error('Erro ao fazer upload da foto');
  }
};

export const deleteFileFromS3 = async (file, bucketName) => {
  const params = {
    Bucket: bucketName,
    Key: file,
  };

  try {
    await s3.deleteObject(params).promise();
  } catch (err) {
    throw new Error('Erro ao deletar a foto');
  }
};
