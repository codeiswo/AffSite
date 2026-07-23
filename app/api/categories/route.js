import { getCategories, createCategory } from '@/lib/db';

export const runtime = 'edge';

const defaultFallbackCategories = [
  { id: 1, name: "Women's Clothing", slug: 'womens-clothing', parent_id: null, sort_order: 1, is_active: 1 },
  { id: 2, name: 'Tops & Blouses', slug: 'tops-blouses', parent_id: 1, sort_order: 1, is_active: 1 },
  { id: 3, name: 'Dresses & Skirts', slug: 'dresses-skirts', parent_id: 1, sort_order: 2, is_active: 1 },
  { id: 4, name: "Men's Clothing", slug: 'mens-clothing', parent_id: null, sort_order: 2, is_active: 1 },
  { id: 5, name: 'Jackets & Coats', slug: 'jackets-coats', parent_id: 4, sort_order: 1, is_active: 1 },
  { id: 6, name: 'Shoes & Sneakers', slug: 'shoes-sneakers', parent_id: null, sort_order: 3, is_active: 1 },
  { id: 7, name: 'Bags & Accessories', slug: 'bags-accessories', parent_id: null, sort_order: 4, is_active: 1 },
  { id: 8, name: 'Beauty & Skincare', slug: 'beauty-skincare', parent_id: null, sort_order: 5, is_active: 1 },
  { id: 9, name: 'Jewelry & Watches', slug: 'jewelry-watches', parent_id: null, sort_order: 6, is_active: 1 },
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('all') === 'true';

    let categories = [];
    try {
      categories = await getCategories({ includeInactive });
    } catch (_) {}

    if (!categories || categories.length === 0) {
      categories = defaultFallbackCategories;
    }

    return Response.json({ success: true, categories });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.name) {
      return Response.json({ success: false, error: 'Category name is required' }, { status: 400 });
    }

    const result = await createCategory(body);
    return Response.json({ success: true, result });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
