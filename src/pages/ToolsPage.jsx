ToolsPage.jsx

import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { tools, categories } from "../data/tools";

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("waseem-favorites") || "[]");
    } catch {
      return [];
    }
  });

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "all" || tool.category === activeCategory;

      const matchesSearch =
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  function toggleFavorite(id) {
    setFavorites((current) => {
      const updated = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

      localStorage.setItem("waseem-favorites", JSON.stringify(updated));
      return updated;
    });
  }

  return (
    <div className="tools-page">
      <Navbar />

      <main className="tools-container">
        <section className="tools-hero">
          <span className="eyebrow">WASEEM WORLD · GLOBAL DIRECTORY</span>
          <h1>
            اكتشف عالم <span>الأدوات الرقمية.</span>
          </h1>
          <p>
            مكتبة تجمع أدوات الذكاء الاصطناعي والتصميم والبرمجة
            والتعليم والأمن السيبراني في مكان واحد.
          </p>

          <div className="tools-stats">
            <div>
              <strong>{tools.length}+</strong>
              <span>أداة رقمية</span>
            </div>
            <div>
              <strong>{categories.length - 1}</strong>
              <span>تصنيف</span>
            </div>
            <div>
              <strong>{favorites.length}</strong>
              <span>المفضلة</span>
            </div>
          </div>
        </section>

        <section className="tools-library">
          <div className="tools-heading">
            <div>
              <span className="eyebrow">EXPLORE THE COLLECTION</span>
              <h2>مكتبة الأدوات</h2>
            </div>
            <span className="results-count">
              {filteredTools.length} نتيجة
            </span>
          </div>

          <input
            className="tools-search"
            type="search"
            placeholder="ابحث عن أداة... ChatGPT, Canva, Python"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="category-list">
            {categories.map((category) => (
              <button
                key={category.id}
                className={
                  activeCategory === category.id ? "category active" : "category"
                }
                onClick={() => setActiveCategory(category.id)}
              >
                {category.ar}
              </button>
            ))}
          </div>

          <div className="tools-grid">
            {filteredTools.map((tool) => (
              <article className="tool-card" key={tool.id}>
                <div className="tool-card-top">
                  <div className="tool-icon">{tool.icon}</div>
                  <button
                    className={
                      favorites.includes(tool.id)
                        ? "favorite-button selected"
                        : "favorite-button"
                    }
                    onClick={() => toggleFavorite(tool.id)}
                    aria-label="إضافة إلى المفضلة"
                    title="إضافة إلى المفضلة"
                  >
                    {favorites.includes(tool.id) ? "★" : "☆"}
                  </button>
                </div>

                <h3>{tool.name}</h3>
                <p>{tool.description}</p>

                <a
                  className="tool-open"
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
            <div className="empty-tools">
              <h3>لم نعثر على نتائج</h3>
              <p>جرّب كلمة بحث أخرى أو اختر تصنيفاً مختلفاً.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
              >
                عرض جميع الأدوات
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
