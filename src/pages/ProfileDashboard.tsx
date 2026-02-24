import { useState } from "react";
import { motion } from "framer-motion";
import { User, Camera, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const ProfileDashboard = () => {
  const [profile, setProfile] = useState({
    name: "", age: "", gender: "", phone: "", style: "",
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    toast({ title: "Profile saved!", description: "Your style preferences have been updated." });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
      <h2 className="font-display text-3xl font-bold mb-2">Your Profile</h2>
      <p className="text-muted-foreground font-body mb-8">Help us personalize your fashion experience.</p>

      {/* Photo */}
      <div className="flex justify-center mb-8">
        <label className="relative cursor-pointer group">
          <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden border-4 border-primary/20 group-hover:border-primary transition-colors">
            {photoPreview ? (
              <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-muted-foreground" />
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-9 h-9 rounded-full gradient-rose flex items-center justify-center shadow-rose">
            <Camera className="w-4 h-4 text-primary-foreground" />
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
        </label>
      </div>

      <div className="space-y-5">
        <div>
          <Label className="font-body text-sm">Full Name</Label>
          <Input placeholder="Enter your name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="mt-1.5" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="font-body text-sm">Age</Label>
            <Input type="number" placeholder="25" value={profile.age} onChange={(e) => setProfile({ ...profile, age: e.target.value })} className="mt-1.5" />
          </div>
          <div>
            <Label className="font-body text-sm">Gender</Label>
            <Select value={profile.gender} onValueChange={(v) => setProfile({ ...profile, gender: v })}>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="non-binary">Non-Binary</SelectItem>
                <SelectItem value="prefer-not">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label className="font-body text-sm">Phone Number</Label>
          <Input type="tel" placeholder="+1 (555) 000-0000" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="mt-1.5" />
        </div>
        <div>
          <Label className="font-body text-sm">Style Preference</Label>
          <Select value={profile.style} onValueChange={(v) => setProfile({ ...profile, style: v })}>
            <SelectTrigger className="mt-1.5"><SelectValue placeholder="Choose your style" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="casual">Casual & Relaxed</SelectItem>
              <SelectItem value="formal">Formal & Elegant</SelectItem>
              <SelectItem value="streetwear">Streetwear</SelectItem>
              <SelectItem value="bohemian">Bohemian</SelectItem>
              <SelectItem value="minimalist">Minimalist</SelectItem>
              <SelectItem value="trendy">Trendy & Bold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="w-full gradient-rose text-primary-foreground font-body font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-rose mt-4"
        >
          <Save className="w-4 h-4" />
          Save Profile
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProfileDashboard;
