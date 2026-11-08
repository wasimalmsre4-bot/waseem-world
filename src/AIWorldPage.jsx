
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./AIWorldPage.css";

const categories = [
  { id: "all", name: "جميع الأدوات", icon: "✦" },
  { id: "chat", name: "المحادثة والذكاء", icon: "◈" },
  { id: "image", name: "الصور والتصميم", icon: "▧" },
  { id: "video", name: "الفيديو", icon: "▷" },
  { id: "writing", name: "الكتابة والمحتوى", icon: "✎" },
  { id: "code", name: "البرمجة", icon: "⌘" },
  { id: "audio", name: "الصوت", icon: "♫" },
  { id: "study", name: "التعلم والبحث", icon: "▤" },
];

const tools = [
  { name: "ChatGPT", category: "chat", description: "مساعد ذكي للمحادثة والكتابة والتعلم وتحليل الأفكار.", url: "https://chatgpt.com/", type: "مجاني مع خيارات مدفوعة", icon: "✳" },
  { name: "Google Gemini", category: "chat", description: "مساعد Google للبحث والتفكير والمهام اليومية.", url: "https://gemini.google.com/", type: "مجاني مع خيارات مدفوعة", icon: "✦" },
  { name: "Microsoft Copilot", category: "chat", description: "مساعد ذكي للإجابة عن الأسئلة وإنجاز المهام.", url: "https://copilot.microsoft.com/", type: "مجاني مع خيارات مدفوعة", icon: "◉" },
  { name: "Claude", category: "chat", description: "مساعد ذكي لتحليل النصوص والكتابة وحل المشكلات.", url: "https://claude.ai/", type: "مجاني مع خيارات مدفوعة", icon: "◌" },
  { name: "Perplexity", category: "study", description: "محرك إجابات وبحث يساعدك على استكشاف المعلومات ومصادرها.", url: "https://www.perplexity.ai/", type: "مجاني مع خيارات مدفوعة", icon: "⌕" },
  { name: "DeepSeek", category: "chat", description: "مساعد ذكاء اصطناعي للمحادثة والتفكير والبرمجة.", url: "https://chat.deepseek.com/", type: "مجاني مع خيارات مدفوعة", icon: "◇" },
  { name: "Canva AI", category: "image", description: "تصميم العروض والصور والمحتوى باستخدام أدوات ذكية.", url: "https://www.canva.com/", type: "مجاني مع خيارات مدفوعة", icon: "▧" },
  { name: "Adobe Firefly", category: "image", description: "إنشاء وتعديل الصور والتصاميم بالذكاء الاصطناعي.", url: "https://firefly.adobe.com/", type: "مجاني مع خيارات مدفوعة", icon: "✧" },
  { name: "Leonardo AI", category: "image", description: "إنشاء الصور والأعمال الفنية الرقمية.", url: "https://leonardo.ai/", type: "مجاني مع خيارات مدفوعة", icon: "◈" },
  { name: "Ideogram", category: "image", description: "إنشاء الصور والتصاميم والنصوص المرئية.", url: "https://ideogram.ai/", type: "مجاني مع خيارات مدفوعة", icon: "▦" },
  { name: "Runway", category: "video", description: "أدوات ذكية لإنشاء الفيديو وتحريره.", url: "https://runwayml.com/", type: "مجاني مع خيارات مدفوعة", icon: "▷" },
  { name: "Pika", category: "video", description: "إنشاء مقاطع فيديو إبداعية باستخدام الذكاء الاصطناعي.", url: "https://pika.art/", type: "مجاني مع خيارات مدفوعة", icon: "▶" },
  { name: "CapCut", category: "video", description: "تحرير الفيديو وأدوات ذكية لصناعة المحتوى.", url: "https://www.capcut.com/", type: "مجاني مع خيارات مدفوعة", icon: "◫" },
  { name: "Grammarly", category: "writing", description: "مساعدة في الكتابة والتدقيق وتحسين النصوص.", url: "https://www.grammarly.com/", type: "مجاني مع خيارات مدفوعة", icon: "✎" },
  { name: "QuillBot", category: "writing", description: "إعادة صياغة النصوص وتحسين الكتابة.", url: "https://quillbot.com/", type: "مجاني مع خيارات مدفوعة", icon: "¶" },
  { name: "GitHub Copilot", category: "code", description: "مساعد برمجي لاقتراح الأكواد وشرحها.", url: "https://github.com/features/copilot", type: "خطط مجانية ومدفوعة", icon: "</>" },
  { name: "Replit", category: "code", description: "بيئة برمجة عبر المتصفح مع أدوات ذكاء اصطناعي.", url: "https://replit.com/", type: "مجاني مع خيارات مدفوعة", icon: "⌘" },
  { name: "ElevenLabs", category: "audio", description: "إنشاء الأصوات والتعليق الصوتي باستخدام الذكاء الاصطناعي.", url: "https://elevenlabs.io/", type: "مجاني مع خيارات مدفوعة", icon: "♫" },
  { name: "Suno", category: "audio", description: "إنشاء مقاطع موسيقية باستخدام الذكاء الاصطناعي.", url: "https://suno.com/", type: "مجاني مع خيارات مدفوعة", icon: "♪" },
  { name: "NotebookLM", category: "study", description: "تنظيم المصادر وتلخيصها ومساعدتك على الدراسة.", url: "https://notebooklm.google.com/", type: "مجاني", icon: "▤" },
  { name: "Hugging Face", category: "study", description: "مجتمع ونماذج وأدوات مفتوحة المصدر للذكاء الاصطناعي.", url: "https://huggingface.co/", type: "مجاني مع خدمات مدفوعة", icon: "🤗" },
];

export default function AIWorldPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "all" || tool.category === activeCategory;

      const matchesSearch =
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <>
      <Navbar />

      <main className="ai-world" dir="rtl">
        <section className="ai-hero">
          <div className="ai-hero-content">
            <span className="ai-eyebrow">WASEEM WORLD / WORLD 01</span>
            <div className="ai-symbol">✳</div>
            <h1>عالم الذكاء<br /><span>الاصطناعي.</span></h1>
            <p>
              اكتشف أدوات الذكاء الاصطناعي، وتعلم كيف تستخدمها
              في الدراسة والعمل والإبداع والبرمجة.
            </p>
            <a href="#ai-library" className="ai-main-button">
              استكشف مكتبة الأدوات ↙
            </a>
          </div>

          <div className="ai-hero-art">
            <div className="ai-orbit orbit-one" />
            <div className="ai-orbit orbit-two" />
            <div className="ai-orbit orbit-three" />
            <div className="ai-core">AI</div>
            <span className="ai-floating ai-float-one">GENERATE</span>
            <span className="ai-floating ai-float-two">CREATE</span>
            <span className="ai-floating ai-float-three">EXPLORE</span>
          </div>

          <div className="ai-hero-footer">
            <span>THINK / CREATE / DISCOVER</span>
            <span>01 — ARTIFICIAL INTELLIGENCE</span>
          </div>
        </section>

        <section className="ai-intro">
          <div>
            <span className="ai-section-label">THE AI UNIVERSE</span>
            <h2>كل أدوات الذكاء الاصطناعي في مكان واحد.</h2>
          </div>
          <p>
            مكتبة تجمع أدوات المحادثة والتصميم والفيديو والبرمجة
            والتعلم، لتصل إلى الأداة المناسبة بسهولة.
          </p>
        </section>

        <section className="ai-library" id="ai-library">
          <div className="ai-library-heading">
            <div>
              <span className="ai-section-label">DISCOVER TOOLS</span>
              <h2>مكتبة الأدوات</h2>
              <p>ابحث واختر المجال الذي تريد استكشافه.</p>
            </div>
            <strong>{filteredTools.length.toString().padStart(2, "0")} TOOLS</strong>
          </div>

          <input
            className="ai-search"
            type="search"
            placeholder="ابحث عن أداة... مثل ChatGPT أو Canva"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="ai-categories">
            {categories.map((category) => (
              <button
                key={category.id}
                className={activeCategory === category.id ? "active" : ""}
                onClick={() => setActiveCategory(category.id)}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          <div className="ai-tools-grid">
            {filteredTools.map((tool) => (
              <article className="ai-tool-card" key={tool.name}>
                <div className="ai-tool-top">
                  <span className="ai-tool-icon">{tool.icon}</span>
                  <span className="ai-tool-type">{tool.type}</span>
                </div>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <a href={tool.url} target="_blank" rel="noopener noreferrer">
                  زيارة الأداة <span>↗</span>
                </a>
              </article>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="ai-empty">لا توجد أدوات مطابقة لبحثك.</div>
          )}
        </section>

        <section className="ai-bottom">
          <span>WASEEM WORLD / AI WORLD</span>
          <h2>المستقبل يبدأ بفكرة.</h2>
          <p>تعلم، جرّب، واصنع شيئاً جديداً.</p>
          <Link to="/worlds">العودة إلى جميع العوالم ↗</Link>
        </section>
      </main>
    </>
  );
}
