import { useState } from "react";
import ProductList from "../components/ProductList";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, Sparkles, CheckCircle, AlertTriangle, ShoppingBag } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const events = ["Wedding", "Party", "Interview", "Festival", "Grand Occasion"];

const mockProducts = [
  { name: "Gold Statement Earrings", price: "₹45", img: "💎" },
  { name: "Silk Clutch Bag", price: "₹89", img: "👜" },
  { name: "Strappy Heels", price: "₹120", img: "👠" },
  { name: "Pearl Necklace", price: "₹65", img: "📿" },
];

const UploadDashboard = () => {
  const [image, setImage] = useState<string | null>(null);
  const [event, setEvent] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { suitable: boolean; tips: string[]; improvements: string[] }>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const analyze = () => {
    if (!image || !event) return;
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setResult({
        suitable: Math.random() > 0.4,
        tips: [
          "Add a statement accessory to elevate the look",
          "Consider a half-up hairstyle for elegance",
          "A bold lip color would complement this outfit",
        ],
        improvements: [
          "Layer with a structured blazer for a polished silhouette",
          "Swap to pointed-toe heels for a sleeker profile",
          "Add a metallic clutch for evening sparkle",
        ],
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="font-display text-3xl font-bold mb-2">Upload & Analyze</h2>
      <p className="text-muted-foreground font-body mb-8">Upload an outfit photo and get AI-powered event analysis.</p>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Area */}
        <div>
          <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors bg-card">
            {image ? (
              <div className="relative">
                <img src={image} alt="Uploaded outfit" className="w-full max-h-80 object-contain rounded-xl" />
                <button onClick={() => { setImage(null); setResult(null); }} className="absolute top-2 right-2 bg-background/80 backdrop-blur rounded-full p-2 text-sm font-body">
                  ✕
                </button>
              </div>
            ) : (
              <label className="cursor-pointer block">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-body font-medium mb-1">Drop your outfit photo here</p>
                <p className="text-sm text-muted-foreground font-body">or click to upload</p>
                <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
              </label>
            )}
          </div>

          <div className="mt-4">
            <Label className="font-body text-sm">Select Event</Label>
            <Select value={event} onValueChange={setEvent}>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Choose event type" /></SelectTrigger>
              <SelectContent>
                {events.map((e) => (
                  <SelectItem key={e} value={e.toLowerCase()}>{e}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={analyze}
            disabled={!image || !event || analyzing}
            className="w-full gradient-rose text-primary-foreground font-body font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-rose mt-4 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {analyzing ? "Analyzing..." : "Analyze Outfit"}
          </motion.button>
        </div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className={`p-5 rounded-2xl border ${result.suitable ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
                <div className="flex items-center gap-2 mb-2">
                  {result.suitable ? <CheckCircle className="w-5 h-5 text-emerald-600" /> : <AlertTriangle className="w-5 h-5 text-amber-600" />}
                  <span className="font-display text-lg font-semibold">
                    {result.suitable ? "Great Choice!" : "Needs Adjustments"}
                  </span>
                </div>
                <p className="text-sm font-body text-foreground/70">
                  {result.suitable
                    ? `This outfit works well for a ${event}. Here are some tips to make it even better.`
                    : `This outfit may not be the best fit for a ${event}. Here's how to improve it.`}
                </p>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold mb-3">💡 Styling Tips</h3>
                <ul className="space-y-2">
                  {result.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-body text-foreground/80">
                      <span className="text-primary mt-0.5">•</span>{tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold mb-3">✨ Improvements</h3>
                <ul className="space-y-2">
                  {result.improvements.map((imp, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-body text-foreground/80">
                      <span className="text-accent mt-0.5">•</span>{imp}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" /> Recommended Dresses
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

export default UploadDashboard;
