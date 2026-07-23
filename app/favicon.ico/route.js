import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  // Minimal valid 16x16 ICO icon buffer
  const icoBase64 = "AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/";
  const buffer = Buffer.from(icoBase64, 'base64');
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'image/x-icon',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
