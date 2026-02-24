import { useState } from "react";
import ProductList from "../components/ProductList";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Sparkles, CheckCircle, XCircle, ShoppingBag } from "lucide-react";

const mockProducts = [
  { name: "Matching Silk Scarf", price: "₹38", img: "🧣" },
  { name: "Complementary Belt", price: "₹55", img: "🎀" },
  { name: "Coordinated Bag", price: "₹95", img: "👜" },
  { name: "Accent Bracelet", price: "₹42", img: "💍" },
];

const ColorMatchingDashboard = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | {
    match: boolean;
    colors: string[];
    reason: string;
    alternatives: string[];
  }>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const analyze = () => {
    if (!image) return;
    setAnalyzing(true);
    setTimeout(() => {
      const isMatch = Math.random() > 0.4;
      setResult({
        match: isMatch,
        colors: ["#C4A882", "#8B6F5C", "#E8D5C4", "#9B2335"],
        reason: isMatch
          ? "The color palette is harmonious with excellent contrast and warm undertones that complement each other beautifully."
          : "The color combination creates visual tension. The cool and warm tones clash, reducing overall cohesion.",
        alternatives: [
          "Try pairing with dusty rose or champagne tones",
          "Earth tones like terracotta would complement well",
          "Navy blue would create a sophisticated contrast",
        ],
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="font-display text-3xl font-bold mb-2">Color & Dress Matching</h2>
      <p className="text-muted-foreground font-body mb-8">Upload a dress photo and let AI analyze color compatibility.</p>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors bg-card">
            {image ? (
              <div className="relative">
                <img src={image} alt="Dress" className="w-full max-h-80 object-contain rounded-xl" />
                <button onClick={() => { setImage(null); setResult(null); }} className="absolute top-2 right-2 bg-background/80 backdrop-blur rounded-full p-2 text-sm font-body">
                  ✕
                </button>
              </div>
            ) : (
              <label className="cursor-pointer block">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-body font-medium mb-1">Upload a dress photo</p>
                <p className="text-sm text-muted-foreground font-body">JPG, PNG up to 10MB</p>
                <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
              </label>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={analyze}
            disabled={!image || analyzing}
            className="w-full gradient-rose text-primary-foreground font-body font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-rose mt-4 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {analyzing ? "Analyzing Colors..." : "Analyze Color Match"}
          </motion.button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              {/* Match Result */}
              <div className={`p-5 rounded-2xl border ${result.match ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
                <div className="flex items-center gap-2 mb-2">
                  {result.match ? <CheckCircle className="w-6 h-6 text-emerald-600" /> : <XCircle className="w-6 h-6 text-red-500" />}
                  <span className="font-display text-xl font-semibold">
                    {result.match ? "Perfect Match! ✨" : "Not Suitable"}
                  </span>
                </div>
                <p className="text-sm font-body text-foreground/70">{result.reason}</p>
              </div>

              {/* Detected Colors */}
              <div>
                <h3 className="font-display text-lg font-semibold mb-3">🎨 Detected Colors</h3>
                <div className="flex gap-3">
                  {result.colors.map((color, i) => (
                    <div key={i} className="text-center">
                      <div className="w-14 h-14 rounded-xl border border-border shadow-sm" style={{ backgroundColor: color }} />
                      <span className="text-xs font-body text-muted-foreground mt-1 block">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alternatives */}
              <div>
                <h3 className="font-display text-lg font-semibold mb-3">💡 Suggestions</h3>
                <ul className="space-y-2">
                  {result.alternatives.map((alt, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-body text-foreground/80">
                      <span className="text-primary mt-0.5">•</span>{alt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Products */}
              <div>
                <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" /> Matching Dresses
                </h3>
                <ProductList />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ColorMatchingDashboard;
