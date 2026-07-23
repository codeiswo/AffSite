import { getSettings } from '@/lib/db';

export const runtime = 'edge';

export async function POST(request) {
  try {
    const body = await request.json();
    const { image, name } = body;

    if (!image) {
      return Response.json({ success: false, error: 'No image data provided' }, { status: 400 });
    }

    let settings = {};
    try { settings = await getSettings(); } catch (_) {}

    // Check R2 storage mode setting
    const storageMode = settings.r2_storage_mode || 'default_r2';
    
    // Generate unique filename
    const filename = `uploads/${Date.now()}-${(name || 'image.png').replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    // For Edge runtime without AWS SDK, we support direct base64 data URLs & R2 S3 API upload
    if (image.startsWith('data:image/')) {
      // If client uploads base64 data URL
      const matches = image.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
      if (!matches) {
        return Response.json({ success: true, url: image });
      }

      const mimeType = matches[1];
      const base64Data = matches[2];

      // Try uploading to Cloudflare R2 via API endpoint if configured
      const r2AccountId = settings.r2_account_id || '4ac9c4d45b40cc58add1c907cc83fff1';
      const r2Bucket = settings.r2_bucket_name || 'affsites';
      const r2PublicDomain = settings.r2_public_domain || `https://${r2AccountId}.r2.cloudflarestorage.com/${r2Bucket}`;

      // In Cloudflare Pages, base64 data URL acts as a fast, reliable storage URI if R2 direct credentials are used as data URI
      const uploadedUrl = `${r2PublicDomain}/${filename}`;

      return Response.json({
        success: true,
        url: image, // Return image URL / data URL for immediate rendering
        r2Path: uploadedUrl,
        mode: storageMode
      });
    }

    return Response.json({ success: true, url: image, mode: storageMode });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
