'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, Layout, Plus, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, Edit3, 
  Image as ImageIcon, Sparkles, Tag, ShoppingBag, Zap, Code, ShieldCheck, 
  Star, CheckCircle2, Upload, X
} from 'lucide-react';

const defaultModules = [
  { id: 'm1', type: 'hero', name: 'Hero Banner (首页大图横幅)', active: true, title: 'Exclusive Fashion Cashback Deals & Verified Promo Codes', subtitle: 'Save big on top global fashion brands, apparel, electronics, and lifestyle items.', btnText: 'Explore Cashback Deals', btnUrl: '/products' },
  { id: 'm2', type: 'brand_wall', name: 'Partner Brands Wall (合作商家品牌墙)', active: true, title: 'OFFICIAL PARTNER MERCHANTS' },
  { id: 'm3', type: 'category_grid', name: 'Category Explorer Bar (主流品类导航)', active: true, title: 'Shop Cashback Deals by Category' },
  { id: 'm4', type: 'product_grid', name: 'Featured Products Grid (热门导购商品区)', active: true, title: 'Verified Fashion & Multi-Category Deals', limit: 6 },
  { id: 'm5', type: 'rebate_calc', name: 'Interactive Rebate Calculator (返利计算器)', active: true, title: 'Calculate Your Shopping Savings' },
  { id: 'm6', type: 'features', name: 'Why Choose Us (平台优势/信任标识)', active: true, title: 'Maximizing Your Savings & Cashback' },
  { id: 'm7', type: 'testimonials', name: 'Shopper Reviews (买家好评展示)', active: true, title: 'Trusted by 100,000+ Smart Shoppers' }
];

export default function ModularHomepageAdmin() {
  const router = useRouter();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Edit Modal State
  const [editingModule, setEditingModule] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        const settings = data.settings || {};
        
        if (settings.homepage_modules) {
          try {
            const parsed = JSON.parse(settings.homepage_modules);
            setModules(Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultModules);
          } catch {
            setModules(defaultModules);
          }
        } else {
          setModules(defaultModules);
        }
      } catch {
        setModules(defaultModules);
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ homepage_modules: JSON.stringify(modules) })
      });
      if (res.ok) {
        setSaved(true);
        router.refresh();
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert('Failed to save module settings');
      }
    } catch {
      alert('Network error');
    }
    setSaving(false);
  };

  const moveModule = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= modules.length) return;
    const updated = [...modules];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setModules(updated);
  };

  const toggleModuleActive = (index) => {
    const updated = [...modules];
    updated[index].active = !updated[index].active;
    setModules(updated);
  };

  const deleteModule = (index) => {
    if (!confirm('Are you sure you want to delete this homepage module?')) return;
    setModules(modules.filter((_, i) => i !== index));
  };

  const addModule = (type) => {
    const newId = 'm_' + Date.now();
    let newMod = { id: newId, type, active: true };

    switch (type) {
      case 'custom_banner':
        newMod.name = 'Custom Image Banner (自定义广告横幅)';
        newMod.title = 'Special Seasonal Fashion Sale';
        newMod.subtitle = 'Get extra 20% discount code at checkout';
        newMod.btnText = 'Claim Offer Now';
        newMod.btnUrl = '/products';
        newMod.imageUrl = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80';
        break;
      case 'custom_html':
        newMod.name = 'Custom HTML Block (自定义 HTML 模块)';
        newMod.title = 'Announcement';
        newMod.htmlContent = '<div class="p-6 bg-indigo-50 text-indigo-900 rounded-2xl text-center font-bold">🔥 Black Friday Mega Cashback Sale is LIVE!</div>';
        break;
      case 'hero':
        newMod.name = 'Hero Banner (首页大图横幅)';
        newMod.title = 'Exclusive Fashion Cashback Deals';
        newMod.subtitle = 'Shop partner brand stores with instant rebates.';
        newMod.btnText = 'Shop Now';
        newMod.btnUrl = '/products';
        break;
      case 'product_grid':
        newMod.name = 'Product Grid (商品展示区)';
        newMod.title = 'Featured Discounts';
        newMod.limit = 6;
        break;
      default:
        newMod.name = `Custom Module (${type})`;
        newMod.title = 'Module Title';
    }

    setModules([...modules, newMod]);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: reader.result, name: file.name })
        });
        const data = await res.json();
        if (data.success && data.url) {
          setEditingModule(prev => ({ ...prev, imageUrl: data.url }));
        } else {
          alert('Failed to upload image');
        }
      } catch {
        alert('Upload error');
      }
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const saveEditingModule = () => {
    setModules(modules.map(m => m.id === editingModule.id ? editingModule : m));
    setEditingModule(null);
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-400">Loading module configuration...</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Layout className="w-6 h-6 text-indigo-600" />
            自定义首页模块 (Modular Homepage Builder)
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            自由拖动/调整顺序、添加、编辑、删除模块，上传自定义广告横幅图片 (支持 Cloudflare R2 存储)
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-500 transition-colors shadow-lg cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save Layout Changes'}
        </button>
      </div>

      {/* Add New Module Toolbar */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">Add New Homepage Module</h2>
        <div className="flex flex-wrap gap-2.5">
          <button onClick={() => addModule('custom_banner')} className="btn-secondary text-xs px-3.5 py-2 flex items-center gap-1.5 cursor-pointer">
            <ImageIcon className="w-3.5 h-3.5 text-purple-500" />
            + Custom Image Banner (自定义图片横幅)
          </button>
          <button onClick={() => addModule('hero')} className="btn-secondary text-xs px-3.5 py-2 flex items-center gap-1.5 cursor-pointer">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            + Hero Banner (大图横幅)
          </button>
          <button onClick={() => addModule('product_grid')} className="btn-secondary text-xs px-3.5 py-2 flex items-center gap-1.5 cursor-pointer">
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-500" />
            + Product Grid (商品区)
          </button>
          <button onClick={() => addModule('custom_html')} className="btn-secondary text-xs px-3.5 py-2 flex items-center gap-1.5 cursor-pointer">
            <Code className="w-3.5 h-3.5 text-amber-500" />
            + Custom HTML (自定义代码)
          </button>
        </div>
      </div>

      {/* Module List (Drag / Reorder) */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">Current Active Homepage Sequence</h2>

        {modules.map((mod, index) => (
          <div
            key={mod.id || index}
            className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              mod.active !== false
                ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm'
                : 'bg-gray-50 dark:bg-gray-900 border-dashed border-gray-200 dark:border-gray-800 opacity-60'
            }`}
          >
            <div className="flex items-center gap-4 flex-1">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                #{index + 1}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">{mod.name || mod.type}</h3>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500">
                    {mod.type}
                  </span>
                </div>
                <p className="text-xs text-gray-400 truncate max-w-md mt-0.5">
                  {mod.title || mod.subtitle || 'Standard Module'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => moveModule(index, -1)}
                disabled={index === 0}
                className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 disabled:opacity-30 cursor-pointer"
                title="Move Up"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => moveModule(index, 1)}
                disabled={index === modules.length - 1}
                className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 disabled:opacity-30 cursor-pointer"
                title="Move Down"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleModuleActive(index)}
                className={`p-2 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors cursor-pointer ${
                  mod.active !== false ? 'text-emerald-500 hover:bg-emerald-50' : 'text-gray-400 hover:bg-gray-100'
                }`}
                title={mod.active !== false ? 'Active (Visible)' : 'Hidden'}
              >
                {mod.active !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setEditingModule({ ...mod })}
                className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                title="Edit Module Content & Image"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteModule(index)}
                className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Delete Module"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Module Drawer / Modal */}
      {editingModule && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-100 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-indigo-600" />
                Edit Module: {editingModule.name}
              </h3>
              <button onClick={() => setEditingModule(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-500 uppercase mb-1">Module Title (标题)</label>
                <input
                  type="text"
                  value={editingModule.title || ''}
                  onChange={e => setEditingModule({ ...editingModule, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm font-semibold outline-none focus:border-indigo-500"
                />
              </div>

              {editingModule.subtitle !== undefined && (
                <div>
                  <label className="block font-bold text-gray-500 uppercase mb-1">Subtitle / Description (副标题)</label>
                  <textarea
                    value={editingModule.subtitle || ''}
                    onChange={e => setEditingModule({ ...editingModule, subtitle: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              )}

              {editingModule.btnText !== undefined && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-500 uppercase mb-1">Button Text (按钮文字)</label>
                    <input
                      type="text"
                      value={editingModule.btnText || ''}
                      onChange={e => setEditingModule({ ...editingModule, btnText: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-500 uppercase mb-1">Button URL (跳转链接)</label>
                    <input
                      type="text"
                      value={editingModule.btnUrl || ''}
                      onChange={e => setEditingModule({ ...editingModule, btnUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Image Upload (Cloudflare R2) */}
              {(editingModule.type === 'custom_banner' || editingModule.imageUrl !== undefined) && (
                <div>
                  <label className="block font-bold text-gray-500 uppercase mb-1">Module Image (模块图片 - R2 Cloudflare 存储)</label>
                  <div className="flex items-center gap-4 mb-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      id="module-image-file"
                      className="hidden"
                    />
                    <label
                      htmlFor="module-image-file"
                      className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 font-bold text-xs flex items-center gap-1.5 cursor-pointer hover:bg-indigo-100 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      {uploading ? 'Uploading to R2...' : 'Upload Image to R2'}
                    </label>
                    {editingModule.imageUrl && (
                      <button
                        onClick={() => setEditingModule({ ...editingModule, imageUrl: '' })}
                        className="text-rose-500 font-semibold cursor-pointer"
                      >
                        Remove Image
                      </button>
                    )}
                  </div>
                  {editingModule.imageUrl && (
                    <div className="p-2 border rounded-xl bg-gray-50 dark:bg-gray-900 max-h-40 overflow-hidden flex items-center justify-center">
                      <img src={editingModule.imageUrl} alt="Preview" className="max-h-36 object-contain rounded-lg" />
                    </div>
                  )}
                </div>
              )}

              {editingModule.htmlContent !== undefined && (
                <div>
                  <label className="block font-bold text-gray-500 uppercase mb-1">Custom HTML Content</label>
                  <textarea
                    value={editingModule.htmlContent || ''}
                    onChange={e => setEditingModule({ ...editingModule, htmlContent: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-xs outline-none focus:border-indigo-500"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setEditingModule(null)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={saveEditingModule}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-colors cursor-pointer"
              >
                Apply Module Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
