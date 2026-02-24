import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Eye, Calendar, MessageCircle, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-fashion.jpg";

const features = [
  { icon: Eye, title: "AI Event Analysis", desc: "Get outfit recommendations for any occasion" },
  { icon: Calendar, title: "Smart Planning", desc: "AI-curated daily outfit schedules" },
  { icon: MessageCircle, title: "Stylist Chat", desc: "Your personal AI fashion advisor" },
  { icon: Palette, title: "Color Matching", desc: "Perfect color harmony every time" },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Fashion editorial" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mb-6"
            >
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-body tracking-widest uppercase text-muted-foreground">
                Powered by Generative AI
              </span>
            </motion.div>

            <h1 className="font-display text-6xl lg:text-8xl font-bold leading-[0.95] mb-6">
              <span className="text-foreground">Style</span>
              <span className="text-gradient-rose">Sense</span>
            </h1>

            <p className="font-body text-lg lg:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg">
              Your intelligent virtual stylist. Analyze outfits, plan wardrobes, match colors — all powered by cutting-edge AI.
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/dashboard")}
              className="gradient-rose text-primary-foreground font-body font-semibold px-10 py-4 rounded-full flex items-center gap-3 shadow-rose text-lg transition-all"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl lg:text-5xl font-bold text-center mb-4"
          >
            Your AI Fashion Suite
          </motion.h2>
          <p className="text-center text-muted-foreground font-body mb-16 max-w-md mx-auto">
            Everything you need to elevate your style, powered by generative AI.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background rounded-2xl p-8 shadow-warm hover:shadow-rose transition-shadow duration-500 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl gradient-rose flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center border-t border-border">
        <p className="text-sm text-muted-foreground font-body">
          © 2026 StyleSense. AI-Powered Fashion.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
