import "dotenv/config";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import s3 from "./config/s3.js";

try {
  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS_S3_BUCKET,
  });

  const result = await s3.send(command);

  console.log("S3 connection successful!");
  console.log(result.Contents);
} catch (error) {
  console.error("S3 connection failed:");
  console.error(error);
}
