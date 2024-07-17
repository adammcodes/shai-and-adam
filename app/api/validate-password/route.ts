import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();
  const isValid = password === process.env.GALLERY_PASSWORD;

  return NextResponse.json({ isValid });
}
