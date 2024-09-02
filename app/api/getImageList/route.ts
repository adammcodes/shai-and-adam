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

const PAGE_SIZE = 40; // Make sure this matches the PAGE_SIZE in the client (app/gallery/_constants/pageSize.ts)

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const event = searchParams.get("event") || "ceremony";
  const continuationToken = searchParams.get("continuationToken") || undefined;

  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.B2_BUCKET_NAME!,
      Prefix: event,
      MaxKeys: PAGE_SIZE,
      ContinuationToken: continuationToken,
    });

    const data = await s3Client.send(command);
    const imageList =
      data.Contents?.map(item => item.Key).filter(key => key !== `${event}/.bzEmpty`) || [];

    return NextResponse.json({
      images: imageList,
      nextContinuationToken: data.NextContinuationToken || null,
      hasMore: !!data.IsTruncated,
    });
  } catch (error) {
    console.error("Error fetching image list:", error);
    return NextResponse.json({ error: "Failed to fetch image list" }, { status: 500 });
  }
}
