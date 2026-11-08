
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";

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
  {
    name: "ChatGPT",
    category: "chat",
    description: "مساعد ذكي للمحادثة والكتابة والتعلم وتحليل الأفكار.",
    url: "https://chatgpt.com/",
    type: "مجاني مع خيارات مدفوعة",
    icon: "✳",
  },
  {
    name: "Google Gemini",
    category: "chat",
    description: "مساعد Google للبحث والتفكير والمهام اليومية.",
    url: "https://gemini.google.com/",
    type: "مجاني مع خيارات مدفوعة",
    icon: "✦",
  },
  {
    name: "Microsoft Copilot",
    category: "chat",
    description: "مساعد ذكي للإجابة عن الأسئلة وإنجاز المهام.",
    url: "https://copilot.microsoft.com/",
    type: "مجاني مع خيارات مدفوعة",
    icon: "◉",
  },
  {
    name: "Claude",
    category: "chat",
    description: "مساعد ذكي لتحليل النصوص والكتابة وحل المشكلات.",
    url: "https://claude.ai/",
    type: "مجاني مع خيارات مدفوعة",
    icon: "◌",
  },
  {
    name: "Perplexity",
    category: "study",
    description: "محرك إجابات وبحث يساعدك على استكشاف المعلومات ومصادرها.",
    url: "https://www.perplexity.ai/",
    type: "مجاني مع خيارات مدفوعة",
    icon: "⌕",
  },
  {
    name: "DeepSeek",
    category: "chat",
    description: "مساعد ذكاء اصطناعي للمحادثة والتفكير والبرمجة.",
    url: "https://chat.deepseek.com/",
    type: "مجاني مع خيارات مدفوعة",
    icon: "◇",
  },
  {
    name: "Canva AI",
    category: "image",
    description: "تصميم العروض والصور والمحتوى باستخدام أدوات ذكية.",
    url: "https://www.canva.com/",
    type: "مجاني مع خيارات مدفوعة",
    icon: "▧",
  },
  {
    name: "Adobe Firefly",
    category: "image",
    description: "إنشاء وتعديل الصور والتصاميم بالذكاء الاصطناعي.",
    url: "https://firefly.adobe.com/",
    type: "مجاني مع خيارات مدفوعة",
    icon: "✧",
  },
  {
    name: "Leonardo AI",
    category: "image",
    description: "إنشاء الصور والأعمال الفنية الرقمية.",
    url: "https://leonardo.ai/",
    type: "مجاني مع خيارات مدفوعة",
    icon: "◈",
  },
  {
    name: "Ideogram",
    category: "image",
    description: "إنشاء الصور والتصاميم والنصوص المرئية.",
    url: "https://ideogram.ai/",
    type: "مجاني مع خيارات مدفوعة",
    icon: "▦",
  },
  {
    name: "Runway",
    category: "video",
    description: "أدوات ذكية لإنشاء الفيديو وتحريره.",
    url: "https://runwayml.com/",
    type: "مجاني مع خيارات مدفوعة",
    icon: "▷",
  },
  {
    name: "Pika",
    category: "video",
    description: "إنشاء مقاطع فيديو إبداعية باستخدام الذكاء الاصطناعي.",
    url: "https://pika.art/",
    type: "مجاني مع خيارات مدفوعة",
    icon: "▶",
  },
  {
    name: "CapCut",
    category: "video",
    description: "تحرير الفيديو وأدوات ذكية لصناعة المحتوى.",
    url: "https://www.capcut.com/",
    type: "مجاني مع خيارات مدفوعة",
    icon: "◫",
  },
  {
    name: "Grammarly",
    category: "writing",
    description: "مساعدة في الكتابة والتدقيق وتحسين النصوص.",
    url: "https://www.grammarly.com/",
    type: "مجاني مع خيارات مدفوعة",
    icon: "✎",
  },
  {
    name: "QuillBot",
    category: "writing",
    description: "إعادة صياغة النصوص وتحسين الكتابة.",
    url: "https://quillbot.com/",
    type: "مجاني مع خيارات مدفوعة",
    icon: "¶",
  },
  {
    name: "GitHub Copilot",
    category: "code",
    description: "مساعد برمجي لاقتراح الأكواد وشرحها.",
    url: "https://github.com/features/copilot",
    type: "خطط مجانية ومدفوعة",
    icon: "</>",
  },
  {
    name: "Replit",
    category: "code",
    description: "بيئة برمجة عبر المتصفح مع أدوات ذكاء اصطناعي.",
    url: "https://replit.com/",
    type: "مجاني مع خيارات مدفوعة",
    icon: "⌘",
  },
  {
    name: "ElevenLabs",
    category: "audio",
    description: "إنشاء الأصوات والتعليق الصوتي باستخدام الذكاء الاصطناعي.",
    url: "https://elevenlabs.io/",
    type: "مجاني مع خيارات مدفوعة",
    icon: "♫",
  },
  {
    name: "Suno",
    category: "audio",
    description: "إنشاء مقاطع موسيقية باستخدام الذكاء الاصطناعي.",
    url: "https://suno.com/",
    type: "مجاني مع خيارات مدفوعة",
    icon: "♪",
  },
  {
    name: "NotebookLM",
    category: "study",
    description: "تنظيم المصادر وتلخيصها ومساعدتك على الدراسة.",
    url: "https://notebooklm.google.com/",
    type: "مجاني",
    icon: "▤",
  },
  {
    name: "Hugging Face",
    category: "study",
    description: "مجتمع ونماذج وأدوات مفتوحة المصدر للذكاء الاصطناعي.",
    url: "https://huggingface.co/",
    type: "مجاني مع خدمات مدفوعة",
    icon: "🤗",
  },
];

export default function AIWorldPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "all" ||
        tool.category === activeCategory;

      const matchesSearch =
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.includes(search);

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
            <h1>
              عالم الذكاء
              <br />
              <span>الاصطناعي.</span>
            </h1>
            <p>
              اكتشف أدوات الذكاء الاصطناعي، وتعلم كيف تستخدمها
              في الدراسة والعمل والإبداع والبرمجة.
            </p>
            <a href="#ai-library" className="ai-main-button">
              استكشف مكتبة الأدوات ↙
            </a>
          </div>

          <div className="ai-hero-art">
            <div className="ai-orbit orbit-one"></div>
            <div className="ai-orbit orbit-two"></div>
            <div className="ai-orbit orbit-three"></div>
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
            مكتبة متجددة تجمع أدوات المحادثة والتصميم والفيديو
            والبرمجة والتعلم، لتصل إلى الأداة المناسبة بسهولة.
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
                className={
                  activeCategory === category.id ? "active" : ""
                }
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

                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  زيارة الأداة <span>↗</span>
                </a>
              </article>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="ai-empty">
              لا توجد أدوات مطابقة لبحثك.
            </div>
          )}
        </section>

        <section className="ai-bottom">
          <span>WASEEM WORLD / AI WORLD</span>
          <h2>المستقبل يبدأ بفكرة.</h2>
          <p>تعلم، جرّب، واصنع شيئاً جديداً.</p>
          <Link to="/worlds">العودة إلى جميع العوالم ↗</Link>
        </section>
      </main>

      <style>{`
        .ai-world {
          --ai-ink: #172c43;
          --ai-blue: #2868a8;
          background: #f7f9fc;
          color: var(--ai-ink);
          min-height: 100vh;
          font-family: inherit;
        }

        .ai-hero {
          min-height: 590px;
          padding: 75px 8% 30px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(120deg, #e9f3fc, #f8fbff 60%, #e6f1f9);
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          align-items: center;
          gap: 30px;
        }

        .ai-hero-content { position: relative; z-index: 2; }
        .ai-eyebrow, .ai-section-label {
          color: #5681a6;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
        }
        .ai-symbol { font-size: 40px; color: #397bb5; margin-top: 25px; }
        .ai-hero h1 {
          font-size: clamp(42px, 6vw, 76px);
          line-height: 1.15;
          margin: 12px 0 20px;
          letter-spacing: -2px;
        }
        .ai-hero h1 span { color: #397bb5; }
        .ai-hero-content p {
          max-width: 480px;
          color: #60758a;
          line-height: 2;
          font-size: 16px;
        }
        .ai-main-button {
          display: inline-block;
          margin-top: 20px;
          background: #1d4266;
          color: white;
          padding: 15px 25px;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 700;
        }
        .ai-hero-art {
          min-height: 380px;
          display: grid;
          place-items: center;
          position: relative;
        }
        .ai-core {
          width: 150px;
          height: 150px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: linear-gradient(145deg, #fff, #d9eafa);
          color: #2868a8;
          font-size: 43px;
          font-weight: 900;
          box-shadow: 0 20px 65px #527fa333;
          z-index: 2;
        }
        .ai-orbit {
          position: absolute;
          border: 1px solid #8bb5d766;
          border-radius: 50%;
          transform: rotate(-25deg);
        }
        .orbit-one { width: 240px; height: 240px; }
        .orbit-two { width: 330px; height: 190px; transform: rotate(35deg); }
        .orbit-three { width: 390px; height: 290px; transform: rotate(-55deg); }
        .ai-floating {
          position: absolute;
          background: white;
          padding: 10px 15px;
          border-radius: 5px;
          color: #48759e;
          font-size: 10px;
          font-weight: 900;
          box-shadow: 0 8px 25px #284b6a15;
        }
        .ai-float-one { top: 16%; right: 4%; }
        .ai-float-two { bottom: 17%; right: 10%; }
        .ai-float-three { top: 25%; left: 0; }
        .ai-hero-footer {
          grid-column: 1 / -1;
          display: flex;
          justify-content: space-between;
          border-top: 1px solid #cbdce9;
          padding-top: 20px;
          color: #7890a6;
          font-size: 10px;
          letter-spacing: 1px;
        }
        .ai-intro {
          padding: 85px 9%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: end;
        }
        .ai-intro h2, .ai-library-heading h2 {
          font-size: clamp(28px, 4vw, 43px);
          margin: 15px 0 0;
        }
        .ai-intro p {
          color: #6c7d8e;
          line-height: 2;
          max-width: 500px;
        }
        .ai-library { padding: 35px 8% 100px; }
        .ai-library-heading {
          display: flex;
          justify-content: space-between;
          align-items: end;
          margin-bottom: 30px;
        }
        .ai-library-heading p { color: #7b8997; }
        .ai-library-heading strong {
          color: #6e8eaa;
          font-size: 12px;
          letter-spacing: 2px;
        }
        .ai-search {
          width: 100%;
          box-sizing: border-box;
          padding: 17px 20px;
          border: 1px solid #dce5ed;
          background: white;
          border-radius: 5px;
          font: inherit;
          outline: none;
          margin-bottom: 20px;
        }
        .ai-search:focus { border-color: #5590c2; }
        .ai-categories {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }
        .ai-categories button {
          border: 1px solid #dce5ed;
          background: white;
          color: #536b80;
          padding: 11px 15px;
          border-radius: 4px;
          cursor: pointer;
          font: inherit;
          font-size: 13px;
        }
        .ai-categories button span { margin-left: 7px; }
        .ai-categories button.active {
          background: #1d4266;
          border-color: #1d4266;
          color: white;
        }
        .ai-tools-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 17px;
        }
        .ai-tool-card {
          background: white;
          border: 1px solid #e6edf3;
          padding: 24px;
          min-height: 205px;
          display: flex;
          flex-direction: column;
          transition: .2s ease;
        }
        .ai-tool-card:hover {
          transform: translateY(-4px);
          border-color: #a8c7df;
          box-shadow: 0 15px 35px #294d6a0c;
        }
        .ai-tool-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .ai-tool-icon {
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          background: #edf5fb;
          color: #397bb5;
          border-radius: 8px;
          font-size: 22px;
          font-weight: 800;
        }
        .ai-tool-type { color: #8292a1; font-size: 10px; }
        .ai-tool-card h3 { margin: 22px 0 8px; font-size: 19px; }
        .ai-tool-card p {
          color: #788797;
          line-height: 1.8;
          font-size: 13px;
          margin: 0 0 20px;
          flex: 1;
        }
        .ai-tool-card a {
          color: #2868a8;
          text-decoration: none;
          font-weight: 800;
          font-size: 13px;
          display: flex;
          justify-content: space-between;
        }
        .ai-empty {
          padding: 50px;
          text-align: center;
          color: #718397;
          background: white;
        }
        .ai-bottom {
          padding: 75px 8%;
          text-align: center;
          background: #173653;
          color: white;
        }
        .ai-bottom > span { color: #9ebbd4; font-size: 11px; letter-spacing: 2px; }
        .ai-bottom h2 { font-size: clamp(32px, 5vw, 55px); margin: 20px 0 10px; }
        .ai-bottom p { color: #c0d1df; }
        .ai-bottom a {
          display: inline-block;
          margin-top: 20px;
          color: white;
          border: 1px solid #91aec6;
          padding: 12px 20px;
          text-decoration: none;
        }
        @media (max-width: 850px) {
          .ai-hero { grid-template-columns: 1fr; padding-top: 55px; }
          .ai-hero-art { min-height: 300px; }
          .ai-intro { grid-template-columns: 1fr; padding: 55px 7%; }
          .ai-tools-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 520px) {
          .ai-hero { padding-left: 6%; padding-right: 6%; }
          .ai-hero-footer { gap: 15px; flex-direction: column; }
          .ai-tools-grid { grid-template-columns: 1fr; }
          .ai-library { padding-left: 6%; padding-right: 6%; }
          .ai-library-heading { align-items: start; gap: 15px; flex-direction: column; }
          .ai-categories button { flex: 1 1 42%; }
        }
      `}</style>
    </>
  );
}
