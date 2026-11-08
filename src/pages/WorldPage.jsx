
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { worlds } from "../data/worlds";
import CyberWorldPage from "../CyberWorldPage";
import AIWorldPage from "../AIWorldPage";
import "./WorldsPage.css";

export default function WorldPage() {
  const { id } = useParams();

  // عالم الأمن السيبراني
  if (id === "cyber") {
    return <CyberWorldPage />;
  }

  // عالم الذكاء الاصطناعي
  if (id === "ai") {
    return <AIWorldPage />;
  }

  // صفحة قائمة العوالم
  if (!id) {
    return (
      <>
        <Navbar />
        <main className="ww-directory" dir="rtl">
          <section className="ww-directory-hero">
            <span>THE UNIVERSE OF WASEEM WORLD</span>
            <h1>عوالم بلا حدود.</h1>
            <p>
              اكتشف المعرفة والتكنولوجيا والإبداع والأدوات.
              اختر عالمك وابدأ رحلتك.
            </p>
            <strong>{String(worlds.length).padStart(2, "0")} WORLDS</strong>
          </section>

          <section className="ww-directory-section">
            <div className="ww-directory-heading">
              <div>
                <span>EXPLORE OUR UNIVERSE</span>
                <h2>اكتشف جميع العوالم</h2>
              </div>
              <Link to="/">الرئيسية ↗</Link>
            </div>

            <div className="ww-directory-grid">
              {worlds.map((world) => (
                <Link
                  to={`/world/${world.id}`}
                  className="ww-directory-card"
                  key={world.id}
                >
                  <div className="ww-directory-card-top">
                    <span>WORLD {world.number}</span>
                    <strong>{world.icon}</strong>
                  </div>

                  <h3>{world.nameAr}</h3>
                  <h4>{world.name}</h4>
                  <p>{world.description}</p>

                  <div className="ww-directory-card-bottom">
                    <span>{world.tagline}</span>
                    <b>↗</b>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </>
    );
  }

  // صفحة العالم المختار
  const world = worlds.find((item) => item.id === id);

  if (!world) {
    return (
      <>
        <Navbar />
        <main className="world-not-found">
          <h1>هذا العالم غير موجود</h1>
          <Link to="/worlds">العودة إلى العوالم</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="world-detail">
        <section className="world-detail-hero">
          <div className="world-detail-content">
            <span>WASEEM WORLD / WORLD {world.number}</span>
            <div className="world-detail-icon">{world.icon}</div>
            <h1>{world.nameAr}</h1>
            <h2>{world.name}</h2>
            <p>{world.description}</p>

            <Link to="/tools" className="world-primary-button">
              استكشف الأدوات
            </Link>
          </div>

          <div className="world-detail-side">
            <span>DISCOVER</span>
            <strong>{world.number}</strong>
            <p>{world.tagline}</p>
          </div>
        </section>

        <section className="world-features-section">
          <h2>ماذا ستجد هنا؟</h2>

          <div className="world-features-grid">
            {world.features.map((feature, index) => (
              <article className="world-feature-card" key={index}>
                <span>0{index + 1}</span>
                <h3>{feature}</h3>
                <p>
                  اكتشف هذا المجال وتعرّف على أهم المعلومات والموارد
                  المرتبطة به داخل WASEEM WORLD.
                </p>
                <Link to="/tools">استكشف الأدوات ←</Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}