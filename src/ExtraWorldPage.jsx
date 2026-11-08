
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import { worldContent } from "./data/worldContent";
import "./ExtraWorldPage.css";

export default function ExtraWorldPage() {
  const { id } = useParams();
  const world = worldContent[id];

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const worldThemes = {
    business: "business-theme",
    creative: "creative-theme",
    explore: "explore-theme",
    tools: "tools-theme",
  };

  const worldIcons = {
    business: "◆",
    creative: "✦",
    explore: "◎",
    tools: "⌘",
  };

  const worldDescriptions = {
    business: "BUSINESS & ENTREPRENEURSHIP",
    creative: "CREATIVITY & DESIGN",
    explore: "DISCOVER THE WORLD",
    tools: "DIGITAL TOOLS & SERVICES",
  };

  const themeClass = worldThemes[id] || "default-theme";
  const worldIcon = worldIcons[id] || "◈";
  const worldLabel = worldDescriptions[id] || "EXPLORE & DISCOVER";

  const filteredResources = useMemo(() => {
    if (!world) return [];

    return world.resources.filter((resource) => {
      const matchesCategory =
        activeCategory === "all" ||
        resource.category === activeCategory;

      const searchText = [
        resource.name,
        resource.description,
        resource.level,
        resource.pricing,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesCategory &&
        searchText.includes(search.trim().toLowerCase())
      );
    });
  }, [world, activeCategory, search]);

  if (!world) {
    return (
      <>
        <Navbar />
        <main className="extra-not-found" dir="rtl">
          <h1>العالم غير موجود</h1>
          <p>لم نتمكن من العثور على الصفحة المطلوبة.</p>
          <Link to="/worlds">العودة إلى العوالم</Link>
        </main>
      </>
    );
  }

  const featuredResources = world.resources.slice(0, 3);

  return (
    <div className={`extra-world-page ${themeClass}`} dir="rtl">
      <Navbar />

      <main>
        <section className="extra-hero">
          <div className="extra-hero-content">
            <Link to="/worlds" className="extra-back">
              <span>←</span> العودة إلى جميع العوالم
            </Link>

            <span className="extra-eyebrow">
              WASEEM WORLD <span>/</span> {world.english}
            </span>

            <div className="extra-hero-label">
              <span>{worldIcon}</span>
              {worldLabel}
            </div>

            <h1>{world.title}</h1>
            <h2>{world.subtitle}</h2>
            <p>{world.description}</p>

            <div className="extra-hero-actions">
              <a href="#extra-resources" className="extra-primary-action">
                ابدأ الاستكشاف <span>↙</span>
              </a>

              <span className="extra-hero-note">
                اكتشف الأدوات والمنصات التي تناسبك
              </span>
            </div>

            <div className="extra-hero-stats">
              <div>
                <strong>
                  {String(world.resources.length).padStart(2, "0")}
                </strong>
                <span>مورد رقمي</span>
              </div>

              <div>
                <strong>
                  {String(world.categories.length - 1).padStart(2, "0")}
                </strong>
                <span>تصنيف متخصص</span>
              </div>

              <div>
                <strong>∞</strong>
                <span>فرص للاكتشاف</span>
              </div>
            </div>
          </div>

          <div className="extra-hero-art">
            <div className="extra-art-orbit orbit-one" />
            <div className="extra-art-orbit orbit-two" />
            <div className="extra-art-orbit orbit-three" />

            <div className="extra-art-decoration decoration-one">✦</div>
            <div className="extra-art-decoration decoration-two">✧</div>
            <div className="extra-art-decoration decoration-three">◈</div>

            <div className="extra-art-center">
              <span>{worldIcon}</span>
              <small>WASEEM WORLD</small>
              <strong>{world.english}</strong>
            </div>
          </div>
        </section>

        <section className="extra-featured">
          <div className="extra-featured-heading">
            <div>
              <span>HANDPICKED FOR YOU</span>
              <h2>نقطة البداية</h2>
              <p>مجموعة مختارة من الموارد لتبدأ رحلتك.</p>
            </div>

            <a href="#extra-resources">
              جميع الموارد <span>←</span>
            </a>
          </div>

          <div className="extra-featured-grid">
            {featuredResources.map((resource, index) => (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="extra-featured-card"
                key={resource.id}
              >
                <span className="extra-featured-number">
                  0{index + 1}
                </span>

                <span className="extra-featured-icon">
                  {worldIcon}
                </span>

                <h3>{resource.name}</h3>
                <p>{resource.description}</p>

                <span className="extra-featured-link">
                  اكتشف المنصة ↗
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="extra-directory" id="extra-resources">
          <div className="extra-section-heading">
            <div>
              <span>{worldLabel}</span>
              <h2>مكتبة الموارد</h2>
              <p>
                ابحث، استكشف، واختر الأدوات المناسبة لاحتياجاتك.
              </p>
            </div>

            <span className="extra-result-count">
              {filteredResources.length} نتيجة
            </span>
          </div>

          <div className="extra-search-box">
            <span>⌕</span>

            <input
              type="search"
              placeholder="ابحث عن أداة أو منصة أو موضوع..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button onClick={() => setSearch("")}>
                مسح
              </button>
            )}
          </div>

          <div className="extra-categories">
            {world.categories.map((category) => (
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

          {filteredResources.length > 0 ? (
            <div className="extra-resource-grid">
              {filteredResources.map((resource, index) => (
                <article
                  className="extra-resource-card"
                  key={resource.id}
                >
                  <div className="extra-card-top">
                    <span className="extra-card-icon">
                      {worldIcon}
                    </span>

                    <span className="extra-card-level">
                      {resource.level}
                    </span>
                  </div>

                  <span className="extra-resource-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{resource.name}</h3>
                  <p>{resource.description}</p>

                  <div className="extra-card-footer">
                    <span>{resource.pricing}</span>

                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      زيارة الموقع <span>↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="extra-empty">
              <span>⌕</span>
              <h3>لم نجد نتائج</h3>
              <p>
                جرّب كلمة بحث أخرى أو اختر تصنيفاً مختلفاً.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
              >
                عرض جميع الموارد
              </button>
            </div>
          )}
        </section>

        <section className="extra-bottom-banner">
          <span>THE WORLD IS YOURS TO EXPLORE</span>
          <h2>المعرفة لا حدود لها.</h2>
          <p>
            استمر في الاستكشاف، فكل اكتشاف يفتح لك باباً جديداً.
          </p>

          <Link to="/worlds">
            اكتشف العوالم الأخرى <span>←</span>
          </Link>
        </section>
      </main>

      <footer className="extra-footer">
        <span>WASEEM WORLD</span>
        <span>Explore. Learn. Create.</span>
      </footer>
    </div>
  );
}
