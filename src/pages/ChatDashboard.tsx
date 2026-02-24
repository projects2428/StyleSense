import { useState, useRef, useEffect } from "react";
import ProductList from "../components/ProductList";
import { motion } from "framer-motion";
import { Send, Sparkles, Bot, User } from "lucide-react";
import { Input } from "@/components/ui/input";

type Message = { role: "user" | "assistant"; content: string };

const quickQuestions = [
  "What should I wear to a first date?",
  "How do I dress for a job interview?",
  "What colors suit warm skin tones?",
  "How to style a plain white t-shirt?",
];

const mockResponses = [
  "That's a great question! For this occasion, I'd recommend going with something that balances comfort and style. A well-fitted outfit in neutral tones with one statement piece — like a textured blazer or a bold accessory — would make a perfect impression. Let me know more details and I can give you specific recommendations!",
  "Based on current trends and timeless fashion principles, I'd suggest layering as your key strategy. Start with a quality base piece, add a mid-layer for dimension, and top it off with an accent piece. The key is ensuring each layer complements the others in both color and texture.",
  "Color harmony is essential in fashion. For your profile, I'd recommend exploring earth tones — warm browns, olive greens, and burnt oranges. These create a cohesive wardrobe that's easy to mix and match. Would you like me to suggest specific outfit combinations?",
];

const ChatDashboard = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your AI fashion stylist ✨ Ask me anything about style, outfits, colors, or trends. I'm here to help you look your absolute best!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setTyping(false);
    }, 1500);
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-[calc(100vh-8rem)]">
        <h2 className="font-display text-3xl font-bold mb-2">AI Stylist Chat</h2>
        <p className="text-muted-foreground font-body mb-4">Get personalized fashion advice from your AI stylist.</p>

        {/* Quick Questions */}
        <div className="flex gap-2 flex-wrap mb-4">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="text-xs font-body bg-card border border-border px-3 py-1.5 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full gradient-rose flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              <div className={`max-w-[75%] px-4 py-3 rounded-2xl font-body text-sm leading-relaxed ${
                msg.role === "user"
                  ? "gradient-rose text-primary-foreground rounded-br-md"
                  : "bg-card border border-border rounded-bl-md"
              }`}>
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
          {typing && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full gradient-rose flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="flex gap-3 pt-4 border-t border-border mt-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Ask me anything about fashion..."
            className="flex-1 font-body"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => send(input)}
            className="gradient-rose text-primary-foreground w-11 h-11 rounded-xl flex items-center justify-center shadow-rose"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default ChatDashboard;
