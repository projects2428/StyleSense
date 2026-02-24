import React, { useState } from 'react';

const products = [
  {
    id: 1,
    image: '/src/assets/dress1.jpg',
    brand: 'Zara',
    name: 'Floral Summer Dress',
    color: 'Blush Pink',
    match: 96,
    rating: 4.7,
    explanation: 'Soft pink shade matches your undertone and style preferences.',
    price: 2499,
  },
  {
    id: 2,
    image: '/src/assets/dress2.jpg',
    brand: 'H&M',
    name: 'Elegant Evening Gown',
    color: 'Lavender',
    match: 92,
    rating: 4.8,
    explanation: 'Lavender hue complements your recent wishlist and AI profile.',
    price: 3999,
  },
  // Add more products as needed
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  return (
    <span className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
      ))}
      {halfStar && (
        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15.273l-3.763 2.736 1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394l4.175-.001a1 1 0 00.95-.69l1.286-3.967V15.273z"/></svg>
      )}
      <span className="ml-1 text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
    </span>
  );
}

function OrderModal({ open, onClose, product }: any) {
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('UPI');
  const [success, setSuccess] = useState(false);

  const total = product ? product.price * quantity : 0;

  const handleConfirm = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setQuantity(1);
      setAddress('');
      setPayment('UPI');
      onClose();
    }, 1500);
  };

  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm transition-all">
      <div className="w-full max-w-md rounded-t-2xl bg-white p-6 shadow-2xl animate-slideUp relative">
        {success ? (
          <div className="flex flex-col items-center justify-center py-12">
            <svg className="w-16 h-16 text-pink-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
            <div className="text-xl font-semibold text-pink-500">Order Confirmed!</div>
          </div>
        ) : (
          <>
            <button className="absolute right-4 top-4 text-gray-400 hover:text-pink-400 transition" onClick={onClose}>&times;</button>
            <div className="flex gap-4 items-center mb-4">
              <img src={product.image} alt={product.name} className="w-20 h-28 object-cover rounded-xl shadow" />
              <div>
                <div className="font-semibold text-lg text-pink-600">{product.name}</div>
                <div className="text-gray-500 text-sm">₹{product.price}</div>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full bg-pink-100 text-pink-500 text-xl flex items-center justify-center" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button className="w-8 h-8 rounded-full bg-pink-100 text-pink-500 text-xl flex items-center justify-center" onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Delivery Address</label>
              <textarea className="w-full rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-300 p-2 resize-none" rows={2} value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter your address..." />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Payment Method</label>
              <div className="flex gap-2">
                {['UPI', 'Card', 'Cash on Delivery'].map(method => (
                  <button
                    key={method}
                    className={`px-3 py-1 rounded-xl border transition text-sm font-medium ${payment === method ? 'bg-gradient-to-r from-pink-400 to-purple-300 text-white border-pink-400' : 'bg-white border-pink-200 text-pink-500 hover:bg-pink-50'}`}
                    onClick={() => setPayment(method)}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="font-medium text-gray-700">Total</div>
              <div className="font-bold text-pink-600 text-lg">₹{total}</div>
            </div>
            <button
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-300 text-white font-semibold text-lg shadow-lg hover:scale-105 transition"
              onClick={handleConfirm}
              disabled={!address.trim()}
            >
              Confirm Order
            </button>
          </>
        )}
      </div>
      <style>{`
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function ProductList() {
  const [orderModal, setOrderModal] = useState<{ open: boolean, product: any }>({ open: false, product: null });
  const [wishlist, setWishlist] = useState<number[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white py-8 px-2 sm:px-6">
      <div className="max-w-2xl mx-auto grid gap-8">
        {products.map(product => (
          <div
            key={product.id}
            className="rounded-2xl bg-white shadow-xl p-4 flex flex-col sm:flex-row gap-4 items-center hover:shadow-2xl transition group relative"
          >
            <button
              className="absolute right-4 top-4 text-pink-300 hover:text-pink-500 transition"
              onClick={() => setWishlist(w => w.includes(product.id) ? w.filter(id => id !== product.id) : [...w, product.id])}
              aria-label="Add to wishlist"
            >
              {wishlist.includes(product.id) ? (
                <svg className="w-6 h-6 fill-pink-400" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              )}
            </button>
            <img src={product.image} alt={product.name} className="w-28 h-40 object-cover rounded-xl shadow-md group-hover:scale-105 transition" />
            <div className="flex-1 flex flex-col gap-1">
              <div className="text-xs text-pink-400 font-semibold uppercase tracking-wide">{product.brand}</div>
              <div className="font-bold text-lg text-gray-800">{product.name}</div>
              <div className="text-sm text-gray-500">Color: <span className="font-medium text-pink-500">{product.color}</span></div>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-gradient-to-r from-pink-400 to-purple-300 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow">{product.match}% match</span>
                <StarRating rating={product.rating} />
              </div>
              <div className="text-xs text-gray-400 mt-1">{product.explanation}</div>
              <div className="font-bold text-xl text-pink-600 mt-2">₹{product.price}</div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-2 rounded-2xl bg-pink-50 text-pink-500 font-semibold shadow hover:bg-pink-100 transition">Add to Cart</button>
                <button
                  className="flex-1 py-2 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-300 text-white font-semibold shadow hover:scale-105 transition"
                  onClick={() => setOrderModal({ open: true, product })}
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <OrderModal
        open={orderModal.open}
        onClose={() => setOrderModal({ open: false, product: null })}
        product={orderModal.product}
      />
    </div>
  );
}
