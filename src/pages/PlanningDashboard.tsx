import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Sparkles, CalendarDays, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const categories = ["College", "Tour", "Vacation", "Office"];

const dayLabels = ["Today", "Tomorrow", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10"];

const PlanningDashboard = () => {
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<{ day: string; imageIdx: number; tip: string }[] | null>(null);
  const [generating, setGenerating] = useState(false);

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 10 - images.length);
    const newImages = files.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...newImages].slice(0, 10));
    setSchedule(null);
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setSchedule(null);
  };

  const generatePlan = () => {
    if (images.length === 0 || !category) return;
    setGenerating(true);
    setTimeout(() => {
      const tips = [
        "Add a watch for a professional touch",
        "Layer with a denim jacket for a casual vibe",
        "Pair with white sneakers for comfort",
        "Accessorize with a scarf",
        "Try tucking in the shirt for a polished look",
        "Go with minimal jewelry",
        "Add sunglasses for outdoor style",
        "Belt it for a structured silhouette",
        "Carry a tote bag to complete the look",
        "Roll up sleeves for a relaxed feel",
      ];
      const plan = dayLabels.slice(0, images.length).map((day, i) => ({
        day,
        imageIdx: i,
        tip: tips[i % tips.length],
      }));
      setSchedule(plan);
      setGenerating(false);
    }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="font-display text-3xl font-bold mb-2">Regular Planning</h2>
      <p className="text-muted-foreground font-body mb-8">Upload your outfits and get an AI-planned daily schedule.</p>

      <div className="mb-6">
        <Label className="font-body text-sm">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="mt-1.5 max-w-xs"><SelectValue placeholder="Select category" /></SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Upload Grid */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {images.map((img, i) => (
          <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-border">
            <img src={img} alt={`Outfit ${i + 1}`} className="w-full h-full object-cover" />
            <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-background/80 backdrop-blur rounded-full p-1">
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        {images.length < 10 && (
          <label className="aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors bg-card">
            <Upload className="w-6 h-6 text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground font-body">{images.length}/10</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />
          </label>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={generatePlan}
        disabled={images.length === 0 || !category || generating}
        className="gradient-rose text-primary-foreground font-body font-semibold py-3 px-8 rounded-xl flex items-center gap-2 shadow-rose disabled:opacity-50"
      >
        <Sparkles className="w-4 h-4" />
        {generating ? "Planning..." : "Generate Schedule"}
      </motion.button>

      {/* Schedule */}
      {schedule && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
          <h3 className="font-display text-2xl font-semibold mb-6 flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-primary" /> Your Daily Plan
          </h3>
          <div className="space-y-4">
            {schedule.map((item) => (
              <div key={item.day} className="flex items-center gap-5 bg-card rounded-2xl p-4 border border-border hover:shadow-warm transition-shadow">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={images[item.imageIdx]} alt={item.day} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-display text-lg font-semibold">{item.day}</h4>
                  <p className="text-sm text-muted-foreground font-body">💡 {item.tip}</p>
                </div>
                <span className="text-xs font-body bg-primary/10 text-primary px-3 py-1 rounded-full font-medium capitalize">
                  {category}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PlanningDashboard;
