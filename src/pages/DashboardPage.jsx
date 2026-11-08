import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import Navbar from "../components/Navbar";

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const sections = [
    {
      icon: "✦",
      title: "الذكاء الاصطناعي",
      description: "اكتشف أدوات الذكاء الاصطناعي",
      link: "/world/ai",
      number: "01",
    },
    {
      icon: "⬡",
      title: "الأمن السيبراني",
      description: "تعلم الحماية والشبكات والأمن الرقمي",
      link: "/world/cyber",
      number: "02",
    },
    {
      icon: "⚙",
      title: "الأدوات الرقمية",
      description: "اكتشف الأدوات والخدمات الرقمية",
      link: "/tools",
      number: "03",
    },
    {
      icon: "◎",
      title: "جميع العوالم",
      description: "استكشف جميع أقسام WASEEM WORLD",
      link: "/worlds",
      number: "04",
    },
  ];

  return (
    <div className="dashboard" dir="rtl">
      <Navbar />

      <style>{`
        .dashboard {
          min-height: 100vh;
          background: #f5f2e9;
          color: #183c32;
          font-family: Arial, sans-serif;
          padding-bottom: 60px;
        }

        .dashboard-container {
          max-width: 1200px;
          margin: auto;
          padding: 55px 25px;
        }

        .dashboard-welcome {
          background: #183c32;
          color: white;
          border-radius: 25px;
          padding: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .dashboard-welcome h1 {
          font-size: clamp(28px, 5vw, 42px);
          margin: 15px 0;
        }

        .dashboard-welcome p {
          color: #d5dfd8;
          line-height: 1.8;
        }

        .dashboard-label {
          color: #c5a66b;
          letter-spacing: 2px;
          font-size: 12px;
        }

        .dashboard-avatar {
          width: 85px;
          height: 85px;
          border-radius: 50%;
          background: #c5a66b;
          color: #183c32;
          display: grid;
          place-items: center;
          font-size: 35px;
          font-weight: bold;
        }

        .dashboard-section-title {
          margin: 55px 0 25px;
        }

        .dashboard-section-title h2 {
          font-size: 28px;
          margin-bottom: 10px;
        }

        .dashboard-section-title p {
          color: #777;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 20px;
        }

        .dashboard-card {
          display: block;
          text-decoration: none;
          color: #183c32;
          background: #fffdf7;
          border: 1px solid #e8e3d7;
          border-radius: 20px;
          padding: 25px;
          transition: .25s;
        }

        .dashboard-card:hover {
          transform: translateY(-6px);
          border-color: #b6975b;
          box-shadow: 0 15px 35px #183c3210;
        }

        .dashboard-card-number {
          color: #b6975b;
          font-size: 12px;
        }

        .dashboard-card-icon {
          font-size: 32px;
          margin: 25px 0 15px;
        }

        .dashboard-card h3 {
          margin-bottom: 10px;
          font-size: 20px;
        }

        .dashboard-card p {
          color: #777;
          line-height: 1.7;
          font-size: 14px;
        }

        .dashboard-account {
          margin-top: 35px;
          padding: 25px;
          background: #fffdf7;
          border: 1px solid #e8e3d7;
          border-radius: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }

        .dashboard-account p {
          color: #777;
          margin-top: 8px;
          direction: ltr;
          text-align: right;
        }

        .dashboard-logout {
          background: #183c32;
          color: white;
          border: none;
          padding: 13px 23px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 14px;
        }

        @media (max-width: 600px) {
          .dashboard-container {
            padding: 30px 15px;
          }

          .dashboard-welcome {
            padding: 25px;
          }
        }
      `}</style>

      <div className="dashboard-container">
        <section className="dashboard-welcome">
          <div>
            <span className="dashboard-label">
              WASEEM WORLD · PERSONAL SPACE
            </span>

            <h1>مرحباً بك في لوحة التحكم</h1>

            <p>
              مكانك الخاص لإدارة حسابك والوصول إلى عوالم المنصة.
            </p>
          </div>

          <div className="dashboard-avatar">
            {(user?.displayName || user?.email || "W")
              .charAt(0)
              .toUpperCase()}
          </div>
        </section>

        <div className="dashboard-section-title">
          <h2>استكشف منصتك</h2>
          <p>اختر القسم الذي تريد الدخول إليه.</p>
        </div>

        <section className="dashboard-grid">
          {sections.map((item) => (
            <Link
              to={item.link}
              className="dashboard-card"
              key={item.number}
            >
              <span className="dashboard-card-number">
                WORLD {item.number}
              </span>

              <div className="dashboard-card-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Link>
          ))}
        </section>

        <section className="dashboard-account">
          <div>
            <strong>حسابك الشخصي</strong>
            <p>{user?.email || "لم يتم العثور على البريد الإلكتروني"}</p>
          </div>

          <button
            className="dashboard-logout"
            onClick={handleLogout}
          >
            تسجيل الخروج
          </button>
        </section>
      </div>
    </div>
  );
}