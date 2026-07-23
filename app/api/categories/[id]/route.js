import { updateCategory, deleteCategory } from '@/lib/db';

export const runtime = 'edge';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const result = await updateCategory(id, body);
    return Response.json({ success: true, result });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const result = await deleteCategory(id);
    return Response.json({ success: true, result });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
