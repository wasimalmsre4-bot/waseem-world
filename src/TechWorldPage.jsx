
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { worldContent } from "./data/worldContent";
import "./TechWorldPage.css";

const techTracks = [
  {
    number: "01",
    icon: "⌘",
    title: "البرمجة وتطوير البرمجيات",
    description: "اكتشف لغات البرمجة، تطوير التطبيقات، بناء المواقع وهندسة البرمجيات.",
    tags: ["Programming", "Web Development", "Software"],
    color: "green",
  },
  {
    number: "02",
    icon: "◈",
    title: "الحوسبة والبنية التقنية",
    description: "تعرّف على أنظمة التشغيل، الحوسبة السحابية، الخوادم والبنية التحتية.",
    tags: ["Cloud", "Systems", "Infrastructure"],
    color: "blue",
  },
  {
    number: "03",
    icon: "◎",
    title: "الشبكات والاتصالات",
    description: "استكشف عالم الشبكات والاتصالات والبروتوكولات والاتصال الرقمي.",
    tags: ["Networking", "Internet", "Connectivity"],
    color: "orange",
  },
  {
    number: "04",
    icon: "✳",
    title: "الأجهزة والابتكار",
    description: "تابع أحدث الأجهزة والابتكارات والتقنيات التي تشكل المستقبل.",
    tags: ["Hardware", "Innovation", "Future"],
    color: "purple",
  },
];

const techHighlights = [
  {
    icon: "⌘",
    title: "تعلم البرمجة",
    description: "ابدأ من الأساسيات وتعرّف على عالم بناء البرمجيات.",
  },
  {
    icon: "☁",
    title: "الحوسبة السحابية",
    description: "اكتشف الخدمات السحابية والبنية الرقمية الحديثة.",
  },
  {
    icon: "◎",
    title: "عالم الشبكات",
    description: "افهم كيف تتصل الأجهزة والأنظمة حول العالم.",
  },
];

export default function TechWorldPage() {
  const world = worldContent.technology;
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const resources = world?.resources || [];
  const categories = world?.categories || [];

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesCategory =
        activeCategory === "all" ||
        resource.category === activeCategory;

      const searchText = [
        resource.name,
        resource.description,
        resource.category,
        resource.level,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [resources, activeCategory, search]);

  if (!world) {
    return (
      <div className="tech-world-page">
        <Navbar />
        <main className="tech-not-found">
          <h1>TECH WORLD</h1>
          <p>تعذر تحميل محتوى عالم التقنية.</p>
          <Link to="/worlds">العودة إلى العوالم</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="tech-world-page" dir="rtl">
      <Navbar />

      <main>
        {/* HERO */}
        <section className="tech-hero">
          <div className="tech-hero-grid"></div>
          <div className="tech-hero-glow tech-glow-one"></div>
          <div className="tech-hero-glow tech-glow-two"></div>

          <div className="tech-hero-inner">
            <div className="tech-hero-content">
              <Link to="/worlds" className="tech-back-link">
                <span>←</span> جميع العوالم
              </Link>

              <div className="tech-eyebrow">
                <span className="tech-status-dot"></span>
                THE WORLD OF TECHNOLOGY
              </div>

              <h1>
                اكتشف عالم
                <span> التقنية.</span>
              </h1>

              <p className="tech-hero-description">
                مساحة تجمع المعرفة التقنية والابتكار والبرمجة
                والتكنولوجيا الحديثة. اكتشف الأدوات، تعلّم المهارات،
                واستكشف التقنيات التي تصنع عالم الغد.
              </p>

              <div className="tech-hero-actions">
                <a href="#tech-explore" className="tech-primary-button">
                  ابدأ الاستكشاف <span>↙</span>
                </a>
                <a href="#tech-resources" className="tech-secondary-button">
                  استكشف المصادر
                </a>
              </div>

              <div className="tech-hero-stats">
                <div>
                  <strong>{String(resources.length).padStart(2, "0")}</strong>
                  <span>مصدر تقني</span>
                </div>
                <div>
                  <strong>{String(categories.length).padStart(2, "0")}</strong>
                  <span>تصنيف</span>
                </div>
                <div>
                  <strong>∞</strong>
                  <span>فرص للتعلم</span>
                </div>
              </div>
            </div>

            <div className="tech-visual">
              <div className="tech-visual-orbit orbit-one"></div>
              <div className="tech-visual-orbit orbit-two"></div>
              <div className="tech-visual-orbit orbit-three"></div>

              <div className="tech-visual-card">
                <div className="tech-visual-card-top">
                  <span>TECHNOLOGY / 001</span>
                  <span className="tech-live-dot"></span>
                </div>

                <div className="tech-main-symbol">T.</div>

                <div className="tech-visual-caption">
                  <span>BEYOND THE ORDINARY</span>
                  <strong>Explore What's Next.</strong>
                </div>

                <div className="tech-visual-lines">
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
              </div>

              <div className="tech-floating-chip chip-top">
                <span>⌘</span> INNOVATION
              </div>
              <div className="tech-floating-chip chip-bottom">
                <span>◈</span> DIGITAL FUTURE
              </div>
            </div>
          </div>

          <div className="tech-hero-bottom">
            <span>WASEEM WORLD</span>
            <span>TECHNOLOGY / EXPLORE / CREATE</span>
          </div>
        </section>

        {/* INTRO */}
        <section className="tech-intro" id="tech-explore">
          <div className="tech-section-label">
            <span>01</span> / EXPLORE THE WORLD
          </div>

          <div className="tech-intro-layout">
            <h2>
              التقنية ليست
              <span> مجرد أدوات.</span>
              إنها طريقة لصناعة المستقبل.
            </h2>

            <div className="tech-intro-text">
              <p>
                من أول سطر برمجي إلى أعقد الأنظمة الرقمية، يفتح لك
                عالم التقنية أبواباً لفهم العالم من حولك والمشاركة
                في تطويره.
              </p>
              <span>LEARN · BUILD · INNOVATE</span>
            </div>
          </div>
        </section>

        {/* TRACKS */}
        <section className="tech-tracks-section">
          <div className="tech-section-heading">
            <div>
              <div className="tech-section-label">
                <span>02</span> / DISCOVER YOUR PATH
              </div>
              <h2>استكشف مجالات التقنية</h2>
              <p>مسارات متنوعة، وكل مسار يفتح لك عالماً جديداً.</p>
            </div>
            <span className="tech-heading-decoration">04 PATHS</span>
          </div>

          <div className="tech-tracks-grid">
            {techTracks.map((track) => (
              <article
                className={`tech-track-card track-${track.color}`}
                key={track.number}
              >
                <div className="tech-track-top">
                  <span className="tech-track-number">{track.number}</span>
                  <span className="tech-track-icon">{track.icon}</span>
                </div>

                <h3>{track.title}</h3>
                <p>{track.description}</p>

                <div className="tech-track-tags">
                  {track.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="tech-track-bottom">
                  <span>EXPLORE FIELD</span>
                  <span>↙</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section className="tech-highlights-section">
          <div className="tech-section-label">
            <span>03</span> / WHAT YOU CAN DISCOVER
          </div>

          <div className="tech-highlights-heading">
            <h2>عالم واسع من الإمكانيات.</h2>
            <p>
              اكتشف المعرفة والمهارات والأدوات التي تساعدك على
              فهم التكنولوجيا والتطور معها.
            </p>
          </div>

          <div className="tech-highlights-grid">
            {techHighlights.map((item, index) => (
              <article className="tech-highlight-card" key={item.title}>
                <span className="tech-highlight-number">
                  0{index + 1}
                </span>
                <div className="tech-highlight-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="tech-highlight-arrow">↙</span>
              </article>
            ))}
          </div>
        </section>

        {/* RESOURCES */}
        <section className="tech-resources-section" id="tech-resources">
          <div className="tech-section-heading">
            <div>
              <div className="tech-section-label">
                <span>04</span> / KNOWLEDGE DIRECTORY
              </div>
              <h2>مكتبة التقنية</h2>
              <p>مجموعة من المصادر والمنصات لاكتشاف عالم التكنولوجيا.</p>
            </div>

            <span className="tech-heading-decoration">
              {filteredResources.length} RESULTS
            </span>
          </div>

          <div className="tech-resource-toolbar">
            <div className="tech-resource-search">
              <span>⌕</span>
              <input
                type="search"
                placeholder="ابحث عن منصة أو مصدر أو مجال..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              {search && (
                <button onClick={() => setSearch("")}>مسح</button>
              )}
            </div>

            <div className="tech-resource-categories">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={
                    activeCategory === category.id ? "active" : ""
                  }
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {filteredResources.length > 0 ? (
            <div className="tech-resources-grid">
              {filteredResources.map((resource, index) => (
                <article className="tech-resource-card" key={resource.id}>
                  <div className="tech-resource-card-top">
                    <span className="tech-resource-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="tech-resource-category">
                      {resource.category}
                    </span>
                  </div>

                  <div className="tech-resource-symbol">◈</div>

                  <h3>{resource.name}</h3>
                  <p>{resource.description}</p>

                  <div className="tech-resource-meta">
                    <span>{resource.level || "مختلف المستويات"}</span>
                    <span>{resource.pricing || "متاح للاستكشاف"}</span>
                  </div>

                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tech-resource-link"
                  >
                    زيارة المصدر <span>↗</span>
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="tech-resource-empty">
              <span>⌕</span>
              <h3>لم نعثر على نتائج</h3>
              <p>جرّب كلمة بحث مختلفة أو اختر تصنيفاً آخر.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
              >
                عرض جميع المصادر
              </button>
            </div>
          )}
        </section>

        {/* FINAL BANNER */}
        <section className="tech-final-banner">
          <div className="tech-final-decoration">T.</div>
          <div className="tech-final-content">
            <span>THE FUTURE IS BUILT TODAY</span>
            <h2>المستقبل يبدأ بفكرة.</h2>
            <p>
              استكشف، تعلّم، وابدأ رحلتك في عالم لا يتوقف عن التطور.
            </p>
            <Link to="/worlds">اكتشف عوالم WASEEM WORLD ↙</Link>
          </div>
        </section>
      </main>

      <footer className="tech-footer">
        <span>WASEEM WORLD</span>
        <span>TECH WORLD © 2026</span>
        <Link to="/worlds">ALL WORLDS ↗</Link>
      </footer>
    </div>
  );
}
