'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Tag, Plus, Edit3, Trash2, FolderPlus, CheckCircle2, XCircle, 
  ExternalLink, ChevronRight, Save, X, ArrowUp, ArrowDown
} from 'lucide-react';

export default function AdminCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    id: null,
    name: '',
    slug: '',
    parent_id: '',
    description: '',
    sort_order: 0,
    is_active: 1
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/categories?all=true');
      const data = await res.json();
      if (data.success && Array.isArray(data.categories)) {
        setCategories(data.categories);
      }
    } catch (_) {}
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = (parentId = null) => {
    setForm({
      id: null,
      name: '',
      slug: '',
      parent_id: parentId ? String(parentId) : '',
      description: '',
      sort_order: categories.length + 1,
      is_active: 1
    });
    setModalOpen(true);
  };

  const openEditModal = (cat) => {
    setForm({
      id: cat.id,
      name: cat.name || '',
      slug: cat.slug || '',
      parent_id: cat.parent_id ? String(cat.parent_id) : '',
      description: cat.description || '',
      sort_order: cat.sort_order || 0,
      is_active: cat.is_active !== undefined ? cat.is_active : 1
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      parent_id: form.parent_id ? parseInt(form.parent_id) : null,
      sort_order: parseInt(form.sort_order || '0')
    };

    try {
      const isEdit = !!form.id;
      const url = isEdit ? `/api/categories/${form.id}` : '/api/categories';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        fetchCategories();
      } else {
        alert(data.error || 'Failed to save category');
      }
    } catch (_) {
      alert('Network error');
    }
    setSaving(false);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchCategories();
      } else {
        alert(data.error || 'Failed to delete category');
      }
    } catch (_) {
      alert('Network error');
    }
  };

  // Group categories into parent/child tree
  const parentCategories = categories.filter(c => !c.parent_id);
  const getSubCategories = (parentId) => categories.filter(c => c.parent_id === parentId);

  return (
    <div className="space-y-8 max-w-5xl pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Tag className="w-6 h-6 text-indigo-600" />
            商品分类管理 (Product Category Management)
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            自主创建与编辑商品分类，支持添加一级分类与二级子分类菜单，商品抓取与编辑可自由归类
          </p>
        </div>
        <button
          onClick={() => openCreateModal(null)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-500 transition-colors shadow-lg cursor-pointer shrink-0"
        >
          <Plus className="w-4.5 h-4.5" />
          + 新增一级分类 (Add Parent Category)
        </button>
      </div>

      {/* Categories Tree List */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
            全站商品分类列表 (Category Hierarchy Tree)
          </h2>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 font-mono">
            Total: {categories.length} Categories
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading categories...</div>
        ) : parentCategories.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Tag className="w-12 h-12 text-gray-300 mx-auto" />
            <p className="text-sm font-semibold text-gray-500">暂无商品分类，点击上方按钮创建第一个分类</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700/60">
            {parentCategories.map((parent) => {
              const subCats = getSubCategories(parent.id);
              return (
                <div key={parent.id} className="p-5 hover:bg-gray-50/80 dark:hover:bg-gray-900/50 transition-colors space-y-3">
                  {/* Parent Category Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0">
                        📁
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-gray-900 dark:text-white">{parent.name}</h3>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                            /{parent.slug}
                          </span>
                          {parent.is_active ? (
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">Active</span>
                          ) : (
                            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">Disabled</span>
                          )}
                        </div>
                        {parent.description && (
                          <p className="text-xs text-gray-400 mt-0.5">{parent.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => openCreateModal(parent.id)}
                        className="px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-50 dark:hover:bg-indigo-950 flex items-center gap-1 cursor-pointer"
                        title="Add Sub-category"
                      >
                        <FolderPlus className="w-3.5 h-3.5" />
                        + 添加二级子分类
                      </button>
                      <button
                        onClick={() => openEditModal(parent)}
                        className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 text-gray-600 cursor-pointer"
                        title="Edit Category"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(parent.id, parent.name)}
                        className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-rose-50 text-rose-500 cursor-pointer"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Sub-categories List (二级菜单) */}
                  {subCats.length > 0 && (
                    <div className="pl-6 sm:pl-10 space-y-2 border-l-2 border-indigo-100 dark:border-indigo-900/50 ml-4 my-2">
                      {subCats.map((sub) => (
                        <div key={sub.id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2.5">
                            <span className="text-gray-400 text-xs font-mono">└─</span>
                            <span className="font-semibold text-xs text-gray-900 dark:text-white">{sub.name}</span>
                            <span className="text-[10px] font-mono text-gray-400">/{sub.slug}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditModal(sub)}
                              className="p-1 text-gray-400 hover:text-indigo-600 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(sub.id, sub.name)}
                              className="p-1 text-gray-400 hover:text-rose-500 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal: Create/Edit Category */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-indigo-600" />
                {form.id ? '编辑商品分类 (Edit Category)' : '创建商品分类 (Create Category)'}
              </h3>
              <button type="button" onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-500 uppercase mb-1">Parent Category (父级分类 / 层级)</label>
                <select
                  value={form.parent_id}
                  onChange={e => setForm({ ...form, parent_id: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm font-semibold outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="">顶级分类 (None - Top-level Category)</option>
                  {parentCategories.filter(p => p.id !== form.id).map(p => (
                    <option key={p.id} value={p.id}>
                      └ {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-500 uppercase mb-1">Category Name (分类名称) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 女装服饰 / Women's Apparel"
                  value={form.name}
                  onChange={e => {
                    const nameVal = e.target.value;
                    const autoSlug = form.slug ? form.slug : nameVal.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    setForm({ ...form, name: nameVal, slug: autoSlug });
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm font-semibold outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-500 uppercase mb-1">URL Slug (别名 / URL 路径)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. womens-clothing"
                  value={form.slug}
                  onChange={e => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm font-mono outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-500 uppercase mb-1">Description (分类描述 - 选填)</label>
                <textarea
                  rows={2}
                  placeholder="Category description..."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-500 uppercase mb-1">Sort Order (排序)</label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={e => setForm({ ...form, sort_order: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-500 uppercase mb-1">Status (状态)</label>
                  <select
                    value={form.is_active}
                    onChange={e => setForm({ ...form, is_active: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm outline-none"
                  >
                    <option value={1}>Enabled (启用)</option>
                    <option value={0}>Disabled (禁用)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-colors cursor-pointer"
              >
                {saving ? 'Saving...' : 'Save Category'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
