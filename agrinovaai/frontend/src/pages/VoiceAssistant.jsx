import { useEffect, useMemo, useState } from "react";
import { Bot, Languages, Mic, Send, Volume2 } from "lucide-react";
import AppShell from "../components/AppShell";
import { useAuth } from "../context/AuthContext";

const languages = [
  { code: "en-IN", label: "English", fallback: "en-US" },
  { code: "hi-IN", label: "Hindi", fallback: "hi-IN" },
  { code: "kn-IN", label: "Kannada", fallback: "en-IN" },
  { code: "ta-IN", label: "Tamil", fallback: "en-IN" },
  { code: "te-IN", label: "Telugu", fallback: "en-IN" },
  { code: "mr-IN", label: "Marathi", fallback: "hi-IN" },
  { code: "bn-IN", label: "Bengali", fallback: "hi-IN" },
];

const replies = {
  "en-IN": "Your crop advisory is ready. Irrigate early morning, avoid excess nitrogen, and scan lower leaves after rainfall.",
  "hi-IN": "आपकी फसल सलाह तैयार है। सुबह सिंचाई करें, अधिक नाइट्रोजन से बचें, और बारिश के बाद पत्तियों की जांच करें।",
  "kn-IN": "ನಿಮ್ಮ ಬೆಳೆ ಸಲಹೆ ಸಿದ್ಧವಾಗಿದೆ. ಬೆಳಿಗ್ಗೆ ನೀರಾವರಿ ಮಾಡಿ, ಹೆಚ್ಚು ನೈಟ್ರೋಜನ್ ತಪ್ಪಿಸಿ, ಮಳೆಯ ನಂತರ ಎಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
  "ta-IN": "உங்கள் பயிர் ஆலோசனை தயாராக உள்ளது. காலை நேரத்தில் பாசனம் செய்யுங்கள், அதிக நைட்ரஜனை தவிர்க்குங்கள்.",
  "te-IN": "మీ పంట సలహా సిద్ధంగా ఉంది. ఉదయం నీరు పెట్టండి, అధిక నైట్రోజన్ నివారించండి.",
  "mr-IN": "तुमचा पीक सल्ला तयार आहे. सकाळी सिंचन करा, जास्त नायट्रोजन टाळा आणि पावसानंतर पाने तपासा.",
  "bn-IN": "আপনার ফসলের পরামর্শ প্রস্তুত। সকালে সেচ দিন, অতিরিক্ত নাইট্রোজেন এড়িয়ে চলুন।",
};

const quickPrompts = ["Leaf spots after rain", "Best irrigation time", "Fertilizer advice", "Mandi price trend"];

export default function VoiceAssistant() {
  const { user } = useAuth();
  const [language, setLanguage] = useState(user?.language || "en-IN");
  const [listening, setListening] = useState(false);
  const [input, setInput] = useState("");
  const [voices, setVoices] = useState([]);
  const [voiceStatus, setVoiceStatus] = useState("Loading system voices...");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Ask about crop disease, irrigation, fertilizer, or market prices." },
  ]);

  const Recognition = useMemo(() => window.SpeechRecognition || window.webkitSpeechRecognition, []);
  const selectedLanguage = languages.find((item) => item.code === language) || languages[0];

  useEffect(() => {
    const loadVoices = () => {
      const available = window.speechSynthesis?.getVoices?.() || [];
      setVoices(available);
    };
    loadVoices();
    window.speechSynthesis?.addEventListener?.("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis?.cancel();
      window.speechSynthesis?.removeEventListener?.("voiceschanged", loadVoices);
    };
  }, []);

  useEffect(() => {
    const voice = findVoice(language, voices);
    if (voice) {
      setVoiceStatus(`Voice ready: ${voice.name} (${voice.lang})`);
    } else if (language === "kn-IN") {
      setVoiceStatus("Kannada system voice is not installed. AgriNova will still speak using the closest available Indian voice.");
    } else {
      setVoiceStatus("Using the closest available system voice for this language.");
    }
  }, [language, voices]);

  const start = () => {
    if (!Recognition) {
      addMessage("assistant", "Speech recognition is not available in this browser. Type your question below and I can still speak the advisory.");
      return;
    }
    const recognition = new Recognition();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => {
      setListening(false);
      addMessage("assistant", "I could not access the microphone. Please allow mic permission or type your question.");
    };
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      handleQuestion(text);
    };
    recognition.start();
  };

  const addMessage = (role, text) => {
    setMessages((current) => [...current, { role, text }]);
  };

  const handleQuestion = (question) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;
    const answer = buildAnswer(cleanQuestion, language);
    addMessage("user", cleanQuestion);
    addMessage("assistant", answer);
    setInput("");
    speak(answer);
  };

  const speak = (text = replies[language]) => {
    if (!window.speechSynthesis) {
      setVoiceStatus("Text-to-speech is not supported in this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = findVoice(language, voices) || findVoice(selectedLanguage.fallback, voices);
    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang || language;
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.onerror = () => setVoiceStatus("Speech was blocked by the browser. Click Speak advisory once more.");
    window.speechSynthesis.speak(utterance);
  };

  return (
    <AppShell>
      <section className="mx-auto max-w-5xl glass rounded-3xl p-6 text-center md:p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-nova-300">Multilingual field assistant</p>
        <h1 className="mt-3 font-display text-4xl font-bold">Talk to AgriNova Voice AI</h1>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <label className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-[#082116] px-4 py-3">
            <Languages size={18} className="text-nova-200" />
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-transparent outline-none">
              {languages.map((item) => (
                <option key={item.code} value={item.code}>{item.label}</option>
              ))}
            </select>
          </label>
          <button onClick={() => speak()} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 hover:bg-white/10">
            <Volume2 size={18} /> Speak advisory
          </button>
        </div>
        <p className="mx-auto mt-3 max-w-2xl text-xs text-white/45">{voiceStatus}</p>

        <div className="mx-auto mt-8 grid h-64 w-64 place-items-center rounded-full bg-nova-400/10">
          <button onClick={start} className={`orb grid h-40 w-40 place-items-center rounded-full bg-nova-400 text-nova-950 transition ${listening ? "scale-110" : ""}`}>
            <Mic size={58} />
          </button>
        </div>

        <div className="mx-auto mt-8 max-w-3xl space-y-3 text-left">
          {messages.slice(-6).map((message, index) => (
            <div key={`${message.role}-${index}`} className={`rounded-3xl p-4 ${message.role === "assistant" ? "bg-white/10 text-white/72" : "ml-auto max-w-[85%] bg-nova-400 text-nova-950"}`}>
              <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] opacity-70">
                {message.role === "assistant" && <Bot size={14} />}
                {message.role === "assistant" ? "AgriNova" : "You"}
              </div>
              {message.text}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-2">
          {quickPrompts.map((prompt) => (
            <button key={prompt} onClick={() => handleQuestion(prompt)} className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/15">
              {prompt}
            </button>
          ))}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleQuestion(input);
          }}
          className="mx-auto mt-5 flex max-w-3xl gap-3 rounded-3xl bg-white/10 p-2"
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type a farming question..."
            className="min-w-0 flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-white/38"
          />
          <button className="grid h-12 w-12 place-items-center rounded-2xl bg-nova-400 text-nova-950">
            <Send size={19} />
          </button>
        </form>
      </section>
    </AppShell>
  );
}

function findVoice(language, voices) {
  const base = language.split("-")[0].toLowerCase();
  return (
    voices.find((voice) => voice.lang.toLowerCase() === language.toLowerCase()) ||
    voices.find((voice) => voice.lang.toLowerCase().startsWith(base)) ||
    voices.find((voice) => voice.lang.toLowerCase().includes("in")) ||
    voices[0]
  );
}

function buildAnswer(question, language) {
  const normalized = question.toLowerCase();
  if (normalized.includes("price") || normalized.includes("mandi")) {
    return language === "hi-IN"
      ? "आज मंडी भाव स्थिर दिख रहे हैं। बेचने से पहले नजदीकी मंडी का ताजा भाव जांचें।"
      : language === "kn-IN"
        ? "ಇಂದು ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಸ್ಥಿರವಾಗಿದೆ. ಮಾರಾಟಕ್ಕೂ ಮೊದಲು ಹತ್ತಿರದ ಮಂಡಿಯ ಬೆಲೆ ಪರಿಶೀಲಿಸಿ."
        : "Market prices look stable today. Check your nearest mandi before selling and compare transport cost.";
  }
  if (normalized.includes("water") || normalized.includes("irrigation")) {
    return language === "kn-IN"
      ? "ಬೆಳಿಗ್ಗೆ ನೀರಾವರಿ ಮಾಡುವುದು ಉತ್ತಮ. ಮಣ್ಣು ಈಗಾಗಲೇ ತೇವವಾಗಿದ್ದರೆ ನೀರನ್ನು ಕಡಿಮೆ ಮಾಡಿ."
      : language === "hi-IN"
        ? "सुबह सिंचाई करना बेहतर है। अगर मिट्टी नम है तो पानी कम दें।"
        : "Irrigate early morning. If the soil is already moist, reduce watering and avoid evening leaf wetness.";
  }
  if (normalized.includes("fertilizer") || normalized.includes("urea")) {
    return language === "kn-IN"
      ? "ಹೆಚ್ಚು ಯೂರಿಯಾ ತಪ್ಪಿಸಿ. ಮಣ್ಣಿನ ಪರೀಕ್ಷೆಯ ಆಧಾರದ ಮೇಲೆ ಸಮತೋಲನ ಪೋಷಕಾಂಶ ನೀಡಿ."
      : language === "hi-IN"
        ? "ज्यादा यूरिया से बचें। मिट्टी परीक्षण के आधार पर संतुलित पोषण दें।"
        : "Avoid excess urea. Use soil-test based balanced nutrition and split nitrogen doses.";
  }
  return replies[language] || replies["en-IN"];
}
