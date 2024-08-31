import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand, GetObjectCommandOutput } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const s3Client = new S3Client({
  endpoint: `https://${process.env.B2_ENDPOINT!}`,
  region: process.env.B2_REGION!,
  credentials: {
    accessKeyId: process.env.B2_APPLICATION_KEY_ID!,
    secretAccessKey: process.env.B2_APPLICATION_KEY!,
  },
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageName = searchParams.get("imageName");

  if (!imageName) {
    return NextResponse.json({ error: "Image name is required" }, { status: 400 });
  }

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.B2_BUCKET_NAME!,
      Key: imageName,
    });

    const { Body, ContentType }: GetObjectCommandOutput = await s3Client.send(command);

    if (!Body) {
      return NextResponse.json({ error: "Failed to fetch image from B2" }, { status: 500 });
    }

    const buffer = await streamToBuffer(Body as Readable);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": ContentType || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${imageName}"`,
      },
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json({ error: "Failed to download image" }, { status: 500 });
  }
}

async function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
