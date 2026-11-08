import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./HomePage.css";

const worlds = [
  {
    id: "ai",
    number: "01",
    title: "عالم الذكاء الاصطناعي",
    en: "Artificial Intelligence",
    desc: "اكتشف أدوات الذكاء الاصطناعي وتعلّم كيف تستخدمها في حياتك ودراستك وعملك.",
    tag: "AI & INNOVATION",
    icon: "✦",
  },
  {
    id: "cyber",
    number: "02",
    title: "عالم الأمن السيبراني",
    en: "Cyber Security",
    desc: "تعرّف على الحماية الرقمية والشبكات وأدوات الأمن السيبراني والمختبرات التعليمية.",
    tag: "SECURITY & NETWORKS",
    icon: "⬡",
  },
  {
    id: "technology",
    number: "03",
    title: "عالم التكنولوجيا",
    en: "Technology",
    desc: "تابع عالم التقنية والبرمجة والابتكارات والأجهزة والتطورات الحديثة.",
    tag: "TECH & FUTURE",
    icon: "⌘",
  },
  {
    id: "education",
    number: "04",
    title: "عالم التعليم",
    en: "Education",
    desc: "مصادر تعليمية ومسارات تعلم ومنصات تساعدك على تطوير معرفتك ومهاراتك.",
    tag: "LEARN & GROW",
    icon: "▤",
  },
  {
    id: "business",
    number: "05",
    title: "عالم الأعمال",
    en: "Business",
    desc: "اكتشف ريادة الأعمال والتسويق والإدارة والعمل الحر وبناء المشاريع.",
    tag: "BUSINESS & STARTUPS",
    icon: "◈",
  },
  {
    id: "creative",
    number: "06",
    title: "عالم الإبداع",
    en: "Creative Studio",
    desc: "أدوات التصميم وصناعة المحتوى والصور والفيديو والصوت والأفكار الإبداعية.",
    tag: "DESIGN & CREATION",
    icon: "✧",
  },
  {
    id: "explore",
    number: "07",
    title: "عالم الاستكشاف",
    en: "Explore The World",
    desc: "اكتشف مواقع وخدمات وأفكاراً ومصادر جديدة من مختلف أنحاء العالم.",
    tag: "DISCOVER MORE",
    icon: "◎",
  },
  {
    id: "tools",
    number: "08",
    title: "عالم الأدوات",
    en: "Digital Tools",
    desc: "مجموعة من الأدوات الرقمية والخدمات التي تساعدك على إنجاز مهامك.",
    tag: "TOOLS & SERVICES",
    icon: "⚙",
  },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("ar");

  const filteredWorlds = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return worlds;

    return worlds.filter((world) =>
      `${world.title} ${world.en} ${world.desc} ${world.tag}`
        .toLowerCase()
        .includes(value)
    );
  }, [search]);

  const isArabic = language === "ar";

  return (
    <main className="ww-home" dir={isArabic ? "rtl" : "ltr"}>
      <Navbar />

      <section className="ww-hero">
        <div className="ww-hero-content">
          <span className="ww-eyebrow">
            WASEEM WORLD · ONE WORLD, INFINITE POSSIBILITIES
          </span>

          <h1>
            {isArabic ? (
              <>
                عالم واحد،
                <br />
                <span>بلا حدود.</span>
              </>
            ) : (
              <>
                One World,
                <br />
                <span>Without Limits.</span>
              </>
            )}
          </h1>

          <p>
            {isArabic
              ? "منصة تجمع المعرفة والتكنولوجيا والإبداع في مكان واحد. اكتشف عوالم جديدة، وتعلّم مهارات مختلفة، وابدأ رحلتك."
              : "A platform bringing knowledge, technology and creativity together. Discover new worlds, learn new skills and start your journey."}
          </p>

          <div className="ww-hero-actions">
            <a href="#worlds" className="ww-primary-btn">
              {isArabic ? "اكتشف العوالم" : "Explore Worlds"}
              <span>↗</span>
            </a>

            <button
              className="ww-language-btn"
              onClick={() =>
                setLanguage((current) => (current === "ar" ? "en" : "ar"))
              }
            >
              {isArabic ? "English" : "العربية"}
            </button>
          </div>
        </div>

        <div className="ww-hero-visual">
          <div className="ww-orbit ww-orbit-one"></div>
          <div className="ww-orbit ww-orbit-two"></div>
          <div className="ww-orbit ww-orbit-three"></div>

          <div className="ww-center-mark">
            <span>W</span>
            <small>WORLD</small>
          </div>

          <span className="ww-floating ww-float-one">✦</span>
          <span className="ww-floating ww-float-two">◈</span>
          <span className="ww-floating ww-float-three">◎</span>
        </div>
      </section>

      <section className="ww-worlds-section" id="worlds">
        <div className="ww-section-heading">
          <div>
            <span className="ww-eyebrow">
              EXPLORE THE UNIVERSE
            </span>

            <h2>
              {isArabic ? "اكتشف عوالمنا" : "Explore Our Worlds"}
            </h2>

            <p>
              {isArabic
                ? "ثمانية عوالم، ومجالات لا نهائية لاكتشافها."
                : "Eight worlds and endless possibilities to explore."}
            </p>
          </div>

          <span className="ww-world-count">08 WORLDS</span>
        </div>

        <div className="ww-search-box">
          <span>⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={
              isArabic
                ? "ابحث عن عالم..."
                : "Search for a world..."
            }
          />
        </div>

        <div className="ww-world-grid">
          {filteredWorlds.map((world) => (
            <Link
              to={`/world/${world.id}`}
              className="ww-world-card"
              key={world.id}
            >
              <div className="ww-card-top">
                <span className="ww-card-number">
                  WORLD {world.number}
                </span>
                <span className="ww-card-icon">{world.icon}</span>
              </div>

              <div className="ww-card-content">
                <span className="ww-card-tag">{world.tag}</span>

                <h3>{isArabic ? world.title : world.en}</h3>

                <p>{world.desc}</p>
              </div>

              <div className="ww-card-bottom">
                <span>
                  {isArabic ? "استكشف العالم" : "Explore World"}
                </span>
                <span className="ww-card-arrow">↗</span>
              </div>
            </Link>
          ))}
        </div>

        {filteredWorlds.length === 0 && (
          <div className="ww-empty">
            {isArabic
              ? "لم نعثر على عالم بهذا الاسم."
              : "No worlds found."}
          </div>
        )}
      </section>

      <section className="ww-manifesto">
        <span className="ww-eyebrow">THE IDEA BEHIND THE WORLD</span>

        <h2>
          {isArabic
            ? "المعرفة لا حدود لها."
            : "Knowledge Has No Limits."}
        </h2>

        <p>
          {isArabic
            ? "WASEEM WORLD ليست مجرد موقع، بل مساحة تجمع العوالم الرقمية في تجربة واحدة، لتجعل الوصول إلى المعرفة والأدوات أسهل."
            : "WASEEM WORLD is more than a website. It brings digital worlds together in one experience, making knowledge and tools easier to discover."}
        </p>
      </section>

      <footer className="ww-footer">
        <div className="ww-footer-brand">WASEEM WORLD.</div>
        <p>Explore More. Learn More. Become More.</p>
        <span>© 2026 WASEEM WORLD · ALL RIGHTS RESERVED</span>
      </footer>
    </main>
  );
}