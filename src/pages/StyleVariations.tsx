import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '@/lib/mockProducts';

const USER_ID = 'demo_user_1';

function readOrders() {
  try { return JSON.parse(localStorage.getItem('orders') || '[]'); } catch { return []; }
}

function saveOrder(order: any) {
  const orders = readOrders();
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
}

export default function StyleVariations() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
  }

  function generate() {
    if (!preview) return alert('Please upload an image first');
    setLoading(true);
    setTimeout(() => {
      const variations = [
        {
          id: 'v1',
          title: 'Traditional Look',
          description: 'Elegant, classic styling with traditional accessories.',
          accessories: ['Gold earrings', 'Embroidered clutch'],
          footwear: ['Kolhapuri sandals'],
          image: preview,
          products: [MOCK_PRODUCTS[0]]
        },
        {
          id: 'v2',
          title: 'Minimal Modern',
          description: 'Clean silhouette, minimal accessories for a refined look.',
          accessories: ['Slim belt', 'Minimal studs'],
          footwear: ['Loafers'],
          image: preview,
          products: [MOCK_PRODUCTS[1]]
        },
        {
          id: 'v3',
          title: 'Structured Fusion',
          description: 'Indo-western mix with structured layers and bold motifs.',
          accessories: ['Statement necklace', 'Structured bag'],
          footwear: ['Block heels'],
          image: preview,
          products: [MOCK_PRODUCTS[2]]
        },
        {
          id: 'v4',
          title: 'Layered Western',
          description: 'Casual layering with jackets and relaxed accessories.',
          accessories: ['Chunky scarf', 'Crossbody bag'],
          footwear: ['Sneakers'],
          image: preview,
          products: [MOCK_PRODUCTS[1]]
        },
        {
          id: 'v5',
          title: 'Party Ready',
          description: 'Evening-ready with bold accessories and statement footwear.',
          accessories: ['Statement clutch', 'Chandelier earrings'],
          footwear: ['Stilettos'],
          image: preview,
          products: [MOCK_PRODUCTS[2]]
        }
      ];
      setResult({ detected: { dress_type: 'Auto', color: 'Neutral', silhouette: 'A-line' }, variations });
      setLoading(false);
    }, 800);
  }

  function placeOrder(product_id: string) {
    const order = {
      order_id: Date.now().toString(),
      user_id: USER_ID,
      product_id,
      order_date: new Date().toISOString(),
      status: 'Placed'
    };
    saveOrder(order);
    alert('Order Placed Successfully');
  }

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Style Variation Engine</h1>
        <p className="text-sm text-gray-600">Upload one outfit and discover multiple styling possibilities — from traditional to party-ready.</p>
      </header>

      <section className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <label className="border-dashed border-2 border-gray-300 rounded p-4 w-full sm:w-1/2 text-center cursor-pointer hover:border-gray-400">
            <input type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }} />
            <div className="text-sm text-gray-500">Click to upload base outfit image</div>
            <div className="text-xs text-gray-400 mt-2">Only one image. JPG/PNG</div>
          </label>

          <div className="w-full sm:w-1/2">
            <div className="mb-2 font-semibold">Preview</div>
            <div className="bg-white rounded shadow p-3 flex items-center justify-center" style={{ minHeight: 160 }}>
              {preview ? <img src={preview} alt="preview" className="max-h-40 object-contain rounded" /> : <div className="text-gray-400">No image uploaded</div>}
            </div>
            <button
              onClick={generate}
              disabled={loading}
              className="mt-3 w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-400"
            >
              {loading ? 'Generating...' : 'Generate Variations'}
            </button>
          </div>
        </div>
      </section>

      {result && (
        <section>
          <div className="mb-4 text-sm text-gray-600">Detected: {result.detected?.dress_type} • {result.detected?.color} • {result.detected?.silhouette}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.variations.map((v: any, idx: number) => (
              <div key={v.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-start gap-4">
                  <div className="w-28 flex-shrink-0">
                    <img src={v.image} alt={v.title} className="w-full h-28 object-cover rounded" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-500">#{idx + 1}</div>
                        <h3 className="font-semibold">{v.title}</h3>
                      </div>
                      <div className="text-xs text-gray-400">{v.footwear?.join(', ')}</div>
                    </div>

                    <p className="text-gray-600 mt-2">{v.description}</p>

                    <div className="mt-3 text-sm">
                      <div className="font-medium">Accessories:</div>
                      <ul className="list-disc list-inside text-gray-600">
                        {v.accessories.map((a: string) => <li key={a}>{a}</li>)}
                      </ul>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <button onClick={() => { /* toggle handled inline by showing products */ }} className="px-3 py-1 rounded bg-gray-200">View Matching Products</button>
                    </div>

                    <div className="mt-3 bg-gray-50 p-3 rounded">
                      <div className="font-medium mb-2">Recommended Products</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {v.products.map((p: any) => (
                          <div key={p.product_id} className="p-2 bg-white rounded shadow-sm flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded" />
                            <div className="flex-1">
                              <div className="font-medium">{p.name}</div>
                              <div className="text-sm text-gray-500">₹ {p.price}</div>
                            </div>
                            <button onClick={() => placeOrder(p.product_id)} className="px-3 py-1 rounded bg-indigo-600 text-white">Order Now</button>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}