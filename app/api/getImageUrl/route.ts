import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import sharp from "sharp";

const s3Client = new S3Client({
  endpoint: `https://${process.env.B2_ENDPOINT!}`, // Update this to your B2 endpoint
  region: process.env.B2_REGION!, // Update this to your B2 region
  credentials: {
    accessKeyId: process.env.B2_APPLICATION_KEY_ID!,
    secretAccessKey: process.env.B2_APPLICATION_KEY!,
  },
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const imageName = searchParams.get("imageName");

  if (!imageName) {
    return NextResponse.json({ error: "Image name is required" }, { status: 400 });
  }

  try {
    // Generate signed URL
    const command = new GetObjectCommand({
      Bucket: process.env.B2_BUCKET_NAME!,
      Key: imageName,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    // Fetch image metadata
    const getObjectResponse = await s3Client.send(command);

    if (!getObjectResponse.Body) {
      console.error("No response body received from B2");
      return NextResponse.json({ error: "Failed to fetch image from B2" }, { status: 500 });
    }

    const imageBuffer = await streamToBuffer(getObjectResponse.Body);

    if (!imageBuffer || imageBuffer.length === 0) {
      console.error("Empty buffer received from B2");
      console.error("Image name on empty buffer: ", imageName);
      return NextResponse.json({ error: "Empty image buffer" }, { status: 500 });
    }

    // console.log(`Received buffer of size: ${imageBuffer.length} bytes`);

    const metadata = await sharp(imageBuffer).metadata();

    return NextResponse.json({
      url: signedUrl,
      width: metadata.width,
      height: metadata.height,
    });
  } catch (error) {
    console.error("Error generating signed URL or fetching metadata:", error);
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 });
  }
}

// Helper function to convert stream to buffer
async function streamToBuffer(stream: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];
    stream.on("data", (chunk: any) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => {
      const buffer = Buffer.concat(chunks);
      // console.log(
      //   `streamToBuffer: Received ${chunks.length} chunks, total size: ${buffer.length} bytes`
      // );
      resolve(buffer);
    });
  });
}
