
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { worldContent } from "./data/worldContent";
import "./EducationWorldPage.css";

const learningPaths = [
  {
    number: "01",
    id: "academic",
    icon: "✦",
    title: "التعليم الأكاديمي",
    description: "اكتشف العلوم والجامعات والمواد التعليمية الأكاديمية.",
    tags: ["Universities", "Science", "Academic"],
    color: "gold",
  },
  {
    number: "02",
    id: "courses",
    icon: "◈",
    title: "الدورات والمهارات",
    description: "طوّر مهاراتك من خلال الدورات والتدريب.",
    tags: ["Courses", "Skills", "Training"],
    color: "olive",
  },
  {
    number: "03",
    id: "research",
    icon: "▤",
    title: "المعرفة والبحث",
    description: "استكشف الأبحاث والمراجع والمكتبات العلمية.",
    tags: ["Research", "Knowledge", "Library"],
    color: "blue",
  },
  {
    number: "04",
    id: "digital",
    icon: "◎",
    title: "التعلم الرقمي",
    description: "اكتشف منصات التعلم الإلكتروني واللغات.",
    tags: ["E-Learning", "Digital", "Online"],
    color: "rose",
  },
];

const educationFeatures = [
  {
    id: "universities",
    icon: "⌂",
    title: "الجامعات",
    description: "اكتشف المؤسسات التعليمية والمواد الأكاديمية.",
    paths: ["academic"],
  },
  {
    id: "courses",
    icon: "✧",
    title: "الدورات",
    description: "تعلّم مهارات جديدة من منصات تعليمية متنوعة.",
    paths: ["courses"],
  },
  {
    id: "libraries",
    icon: "▤",
    title: "المكتبات والأبحاث",
    description: "مصادر للقراءة والبحث واكتساب المعرفة.",
    paths: ["research"],
  },
];

export default function EducationWorldPage() {
  const world = worldContent.education;

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activePath, setActivePath] = useState(null);

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
        resource.pricing,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchText.includes(
        search.trim().toLowerCase()
      );

      const matchesPath =
        !activePath || resource.path === activePath;

      return matchesCategory && matchesSearch && matchesPath;
    });
  }, [resources, activeCategory, search, activePath]);

  function scrollToLibrary() {
    document.getElementById("education-library")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function explorePath(pathId) {
    setActivePath(pathId);
    setActiveCategory("all");
    setSearch("");
    scrollToLibrary();
  }

  function resetFilters() {
    setActivePath(null);
    setActiveCategory("all");
    setSearch("");
  }

  if (!world) {
    return (
      <div className="education-world-page">
        <Navbar />
        <main className="education-not-found">
          <h1>EDUCATION WORLD</h1>
          <p>تعذر تحميل محتوى عالم التعليم.</p>
          <Link to="/worlds">العودة إلى العوالم</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="education-world-page" dir="rtl">
      <Navbar />

      <main>
        <section className="education-hero">
          <div className="education-hero-pattern"></div>
          <div className="education-hero-glow"></div>

          <div className="education-hero-inner">
            <div className="education-hero-content">
              <Link to="/worlds" className="education-back">
                <span>←</span> جميع العوالم
              </Link>

              <div className="education-eyebrow">
                <span></span>
                THE WORLD OF KNOWLEDGE
              </div>

              <h1>
                المعرفة
                <span> تصنع المستقبل.</span>
              </h1>

              <p className="education-hero-description">
                عالم يجمع التعليم والجامعات والدورات والمصادر
                المعرفية في مكان واحد. اكتشف فرص التعلم،
                ووسّع آفاقك، وابدأ رحلتك نحو مستقبل أفضل.
              </p>

              <div className="education-hero-actions">
                <a href="#education-paths" className="education-primary">
                  اكتشف مسارات التعلم <span>↙</span>
                </a>

                <a href="#education-library" className="education-secondary">
                  المكتبة التعليمية
                </a>
              </div>

              <div className="education-stats">
                <div>
                  <strong>{String(resources.length).padStart(2, "0")}</strong>
                  <span>مصدر تعليمي</span>
                </div>
                <div>
                  <strong>{String(categories.length).padStart(2, "0")}</strong>
                  <span>تصنيفات</span>
                </div>
                <div>
                  <strong>{String(learningPaths.length).padStart(2, "0")}</strong>
                  <span>مسارات تعليمية</span>
                </div>
              </div>
            </div>

            <div className="education-art">
              <div className="education-art-frame">
                <div className="education-art-top">
                  <span>WASEEM WORLD</span>
                  <span>EDITION 001</span>
                </div>

                <div className="education-book">
                  <div className="education-book-page">
                    <span>THE ART OF</span>
                    <strong>KNOWLEDGE</strong>
                    <i></i>
                    <small>LEARN · DISCOVER · GROW</small>
                  </div>
                </div>

                <div className="education-art-bottom">
                  <span>EST. 2026</span>
                  <span>THE KNOWLEDGE COLLECTION</span>
                </div>
              </div>

              <div className="education-floating education-float-one">
                ✦ LIFELONG LEARNING
              </div>

              <div className="education-floating education-float-two">
                KNOWLEDGE IS POWER
              </div>
            </div>
          </div>

          <div className="education-hero-footer">
            <span>EDUCATION / KNOWLEDGE / DISCOVERY</span>
            <span>01 — 08 WORLDS</span>
          </div>
        </section>

        <section className="education-paths" id="education-paths">
          <div className="education-section-heading">
            <div>
              <span className="education-kicker">CHOOSE YOUR DIRECTION</span>
              <h2>ابدأ من <span>المسار المناسب.</span></h2>
              <p>اختر مسارك التعليمي وسنعرض لك المصادر المرتبطة به.</p>
            </div>
            <span className="education-section-number">01 / PATHS</span>
          </div>

          <div className="education-path-grid">
            {learningPaths.map((path) => {
              const count = resources.filter(
                (resource) => resource.path === path.id
              ).length;

              return (
                <button
                  type="button"
                  className={`education-path-card ${path.color} ${
                    activePath === path.id ? "active" : ""
                  }`}
                  key={path.id}
                  onClick={() => explorePath(path.id)}
                >
                  <div className="education-path-top">
                    <span className="education-path-number">
                      {path.number}
                    </span>
                    <span className="education-path-icon">
                      {path.icon}
                    </span>
                  </div>

                  <h3>{path.title}</h3>
                  <p>{path.description}</p>

                  <div className="education-path-tags">
                    {path.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="education-path-link">
                    استكشف المسار <span>↙</span>
                  </div>

                  <div className="education-path-count">
                    {count} مصادر تعليمية
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="education-features">
          <div className="education-section-heading">
            <div>
              <span className="education-kicker">EXPLORE EDUCATION</span>
              <h2>مساحات <span>للتعلّم.</span></h2>
              <p>انتقل مباشرة إلى نوع المحتوى الذي تبحث عنه.</p>
            </div>
            <span className="education-section-number">02 / EXPLORE</span>
          </div>

          <div className="education-feature-grid">
            {educationFeatures.map((feature) => {
              const count = resources.filter((resource) =>
                feature.paths.includes(resource.path)
              ).length;

              return (
                <button
                  type="button"
                  className="education-feature-card"
                  key={feature.id}
                  onClick={() => explorePath(feature.paths[0])}
                >
                  <span className="education-feature-icon">
                    {feature.icon}
                  </span>

                  <span className="education-feature-text">
                    <strong>{feature.title}</strong>
                    <small>{feature.description}</small>
                    <small>{count} مصادر متاحة</small>
                  </span>

                  <span className="education-feature-arrow">↙</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="education-library" id="education-library">
          <div className="education-section-heading">
            <div>
              <span className="education-kicker">THE LEARNING LIBRARY</span>
              <h2>المكتبة <span>التعليمية.</span></h2>
              <p>
                مجموعة من المنصات والمصادر التعليمية التي يمكنك
                استكشافها والانتقال إليها مباشرة.
              </p>
            </div>

            <span className="education-section-number">03 / LIBRARY</span>
          </div>

          <div className="education-library-toolbar">
            <div className="education-search">
              <span>⌕</span>
              <input
                type="search"
                placeholder="ابحث عن منصة أو مصدر تعليمي..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setActivePath(null);
                }}
              />
            </div>

            <button
              type="button"
              className="education-reset"
              onClick={resetFilters}
            >
              إعادة ضبط الفلاتر ↺
            </button>
          </div>

          <div className="education-category-list">
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                className={
                  activeCategory === category.id
                    ? "education-category active"
                    : "education-category"
                }
                onClick={() => {
                  setActiveCategory(category.id);
                  setActivePath(null);
                }}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {activePath && (
            <div className="education-active-filter">
              <span>
                المسار المحدد:{" "}
                {learningPaths.find((path) => path.id === activePath)?.title}
              </span>
              <button type="button" onClick={resetFilters}>
                إلغاء التحديد ×
              </button>
            </div>
          )}

          <div className="education-resource-grid">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource, index) => (
                <article
                  className="education-resource-card"
                  key={resource.id}
                >
                  <div className="education-resource-top">
                    <span className="education-resource-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="education-resource-category">
                      {categories.find(
                        (category) => category.id === resource.category
                      )?.name || resource.category}
                    </span>
                  </div>

                  <h3>{resource.name}</h3>
                  <p>{resource.description}</p>

                  <div className="education-resource-meta">
                    <span>{resource.level}</span>
                    <span>{resource.pricing}</span>
                  </div>

                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="education-resource-link"
                  >
                    زيارة المنصة <span>↗</span>
                  </a>
                </article>
              ))
            ) : (
              <div className="education-empty">
                <span>⌕</span>
                <h3>لم نعثر على نتائج</h3>
                <p>جرّب تغيير البحث أو اختيار تصنيف آخر.</p>
                <button type="button" onClick={resetFilters}>
                  عرض جميع المصادر
                </button>
              </div>
            )}
          </div>

          <div className="education-library-footer">
            <span>
              عرض {filteredResources.length} من {resources.length} مصدر
            </span>
            <span>WASEEM WORLD — EDUCATION</span>
          </div>
        </section>

        <section className="education-quote">
          <span className="education-quote-mark">“</span>
          <h2>
            كل يوم تتعلم فيه شيئاً جديداً،
            <br />
            تقترب خطوة من مستقبلك.
          </h2>
          <span className="education-quote-caption">
            KEEP LEARNING. KEEP GROWING.
          </span>
        </section>
      </main>

      <footer className="education-footer">
        <span>WASEEM WORLD</span>
        <span>EDUCATION WORLD © 2026</span>
        <Link to="/worlds">العودة إلى العوالم ↑</Link>
      </footer>
    </div>
  );
}
