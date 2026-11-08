
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { worlds } from "../data/worlds";
import CyberWorldPage from "../CyberWorldPage";
import AIWorldPage from "../AIWorldPage";
import ExtraWorldPage from "../ExtraWorldPage";
import TechWorldPage from "../TechWorldPage";
import EducationWorldPage from "../EducationWorldPage";
import "./WorldsPage.css";

export default function WorldPage() {
  const { id } = useParams();

  if (id === "cyber") return <CyberWorldPage />;
  if (id === "ai") return <AIWorldPage />;
  if (id === "technology") return <TechWorldPage />;
  if (id === "education") return <EducationWorldPage />;

  const extraWorlds = [
    "business",
    "creative",
    "explore",
    "tools",
  ];

  if (extraWorlds.includes(id)) {
    return <ExtraWorldPage />;
  }

  if (!id) {
    return (
      <>
        <Navbar />
        <main className="ww-directory" dir="rtl">
          <section className="ww-directory-hero">
            <span>WASEEM WORLD / EXPLORE</span>
            <h1>اكتشف عوالم بلا حدود.</h1>
            <p>
              ثمانية عوالم تجمع المعرفة والتقنية والإبداع
              والفرص في مساحة واحدة.
            </p>
          </section>

          <section className="ww-directory-section">
            <div className="ww-directory-grid">
              {worlds.map((world) => (
                <Link
                  to={`/world/${world.id}`}
                  className="ww-directory-card"
                  key={world.id}
                >
                  <span>{world.icon}</span>
                  <div>
                    <h2>{world.title}</h2>
                    <p>{world.desc}</p>
                    <small>{world.en}</small>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </>
    );
  }

  const world = worlds.find((item) => item.id === id);

  if (!world) {
    return (
      <>
        <Navbar />
        <main className="ww-directory" dir="rtl">
          <h1>العالم غير موجود</h1>
          <Link to="/worlds">العودة إلى العوالم</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="world-detail" dir="rtl">
        <Link to="/worlds">← جميع العوالم</Link>
        <h1>{world.title}</h1>
        <h2>{world.en}</h2>
        <p>{world.desc}</p>
        <Link to="/tools">استكشف الأدوات</Link>
      </main>
    </>
  );
}
