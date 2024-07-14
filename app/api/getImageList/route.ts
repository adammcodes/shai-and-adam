// app/api/getImageList/route.ts
import { NextRequest, NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  endpoint: "https://s3.us-east-005.backblazeb2.com",
  region: "us-east-005",
  credentials: {
    accessKeyId: process.env.B2_APPLICATION_KEY_ID!,
    secretAccessKey: process.env.B2_APPLICATION_KEY!,
  },
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const event = searchParams.get("event") || "ceremony"; // Default to 'ceremony' if no event specified

  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.B2_BUCKET_NAME!,
      Prefix: event, // Use the event to filter photos
    });

    const data = await s3Client.send(command);
    const imageList = data.Contents?.map(item => item.Key) || [];

    return NextResponse.json({ images: imageList });
  } catch (error) {
    console.error("Error fetching image list:", error);
    return NextResponse.json({ error: "Failed to fetch image list" }, { status: 500 });
  }
}
