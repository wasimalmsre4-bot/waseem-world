
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";

const translations = {
  ar: {
    welcome: "مرحباً بك في لوحة التحكم",
    description: "مكانك الخاص لإدارة حسابك والوصول إلى عوالم المنصة.",
    explore: "استكشف منصتك",
    choose: "اختر القسم الذي تريد الدخول إليه.",
    account: "حسابك الشخصي",
    noEmail: "لم يتم العثور على البريد الإلكتروني",
    logout: "تسجيل الخروج",
    sections: [
      ["الذكاء الاصطناعي", "اكتشف أدوات الذكاء الاصطناعي"],
      ["الأمن السيبراني", "تعلم الحماية والشبكات والأمن الرقمي"],
      ["الأدوات الرقمية", "اكتشف الأدوات والخدمات الرقمية"],
      ["جميع العوالم", "استكشف جميع أقسام WASEEM WORLD"]
    ]
  },
  en: {
    welcome: "Welcome to your Dashboard",
    description: "Your personal space to manage your account and access the platform's worlds.",
    explore: "Explore Your Platform",
    choose: "Choose the section you want to visit.",
    account: "Your Account",
    noEmail: "Email address not found",
    logout: "Log Out",
    sections: [
      ["Artificial Intelligence", "Discover AI tools"],
      ["Cybersecurity", "Learn digital security, networks and protection"],
      ["Digital Tools", "Discover digital tools and services"],
      ["All Worlds", "Explore all WASEEM WORLD sections"]
    ]
  },
  fr: {
    welcome: "Bienvenue dans votre tableau de bord",
    description: "Votre espace personnel pour gérer votre compte et accéder aux univers de la plateforme.",
    explore: "Explorez votre plateforme",
    choose: "Choisissez la section que vous souhaitez visiter.",
    account: "Votre compte",
    noEmail: "Adresse e-mail introuvable",
    logout: "Déconnexion",
    sections: [
      ["Intelligence artificielle", "Découvrez les outils d'IA"],
      ["Cybersécurité", "Apprenez la sécurité numérique et les réseaux"],
      ["Outils numériques", "Découvrez les outils et services numériques"],
      ["Tous les univers", "Explorez toutes les sections de WASEEM WORLD"]
    ]
  },
  es: {
    welcome: "Bienvenido a tu panel",
    description: "Tu espacio personal para administrar tu cuenta y acceder a los mundos de la plataforma.",
    explore: "Explora tu plataforma",
    choose: "Elige la sección que deseas visitar.",
    account: "Tu cuenta",
    noEmail: "No se encontró el correo electrónico",
    logout: "Cerrar sesión",
    sections: [
      ["Inteligencia artificial", "Descubre herramientas de IA"],
      ["Ciberseguridad", "Aprende seguridad digital y redes"],
      ["Herramientas digitales", "Descubre herramientas y servicios digitales"],
      ["Todos los mundos", "Explora todas las secciones de WASEEM WORLD"]
    ]
  },
  de: {
    welcome: "Willkommen in deinem Dashboard",
    description: "Dein persönlicher Bereich zur Kontoverwaltung und zum Zugriff auf die Plattformwelten.",
    explore: "Entdecke deine Plattform",
    choose: "Wähle den Bereich aus, den du besuchen möchtest.",
    account: "Dein Konto",
    noEmail: "E-Mail-Adresse nicht gefunden",
    logout: "Abmelden",
    sections: [
      ["Künstliche Intelligenz", "Entdecke KI-Werkzeuge"],
      ["Cybersicherheit", "Lerne digitale Sicherheit und Netzwerke"],
      ["Digitale Werkzeuge", "Entdecke digitale Werkzeuge und Dienste"],
      ["Alle Welten", "Entdecke alle Bereiche von WASEEM WORLD"]
    ]
  },
  tr: {
    welcome: "Kontrol Paneline Hoş Geldin",
    description: "Hesabını yönetebileceğin ve platform dünyalarına erişebileceğin kişisel alanın.",
    explore: "Platformunu Keşfet",
    choose: "Ziyaret etmek istediğin bölümü seç.",
    account: "Hesabın",
    noEmail: "E-posta adresi bulunamadı",
    logout: "Çıkış Yap",
    sections: [
      ["Yapay Zekâ", "Yapay zekâ araçlarını keşfet"],
      ["Siber Güvenlik", "Dijital güvenlik ve ağları öğren"],
      ["Dijital Araçlar", "Dijital araçları ve hizmetleri keşfet"],
      ["Tüm Dünyalar", "WASEEM WORLD bölümlerini keşfet"]
    ]
  },
  zh: {
    welcome: "欢迎来到控制面板",
    description: "管理账户并访问平台各个世界的个人空间。",
    explore: "探索你的平台",
    choose: "选择你想访问的部分。",
    account: "个人账户",
    noEmail: "未找到电子邮件地址",
    logout: "退出登录",
    sections: [
      ["人工智能", "探索人工智能工具"],
      ["网络安全", "学习数字安全和网络知识"],
      ["数字工具", "探索数字工具和服务"],
      ["所有世界", "探索 WASEEM WORLD 的所有板块"]
    ]
  },
  ja: {
    welcome: "ダッシュボードへようこそ",
    description: "アカウント管理とプラットフォームの各世界にアクセスするための個人スペースです。",
    explore: "プラットフォームを探索",
    choose: "アクセスしたいセクションを選択してください。",
    account: "あなたのアカウント",
    noEmail: "メールアドレスが見つかりません",
    logout: "ログアウト",
    sections: [
      ["人工知能", "AIツールを発見しましょう"],
      ["サイバーセキュリティ", "デジタルセキュリティとネットワークを学ぶ"],
      ["デジタルツール", "デジタルツールとサービスを発見"],
      ["すべての世界", "WASEEM WORLDのすべてのセクションを探索"]
    ]
  },
  ko: {
    welcome: "대시보드에 오신 것을 환영합니다",
    description: "계정을 관리하고 플랫폼의 다양한 세계에 접근할 수 있는 개인 공간입니다.",
    explore: "플랫폼 탐색",
    choose: "방문할 섹션을 선택하세요.",
    account: "내 계정",
    noEmail: "이메일 주소를 찾을 수 없습니다",
    logout: "로그아웃",
    sections: [
      ["인공지능", "AI 도구 살펴보기"],
      ["사이버 보안", "디지털 보안과 네트워크 배우기"],
      ["디지털 도구", "디지털 도구와 서비스 발견하기"],
      ["모든 세계", "WASEEM WORLD의 모든 섹션 탐색"]
    ]
  },
  hi: {
    welcome: "आपके डैशबोर्ड में आपका स्वागत है",
    description: "अपने खाते को प्रबंधित करने और प्लेटफ़ॉर्म की दुनिया तक पहुँचने का आपका निजी स्थान।",
    explore: "अपना प्लेटफ़ॉर्म देखें",
    choose: "वह अनुभाग चुनें जहाँ आप जाना चाहते हैं।",
    account: "आपका खाता",
    noEmail: "ईमेल पता नहीं मिला",
    logout: "लॉग आउट",
    sections: [
      ["कृत्रिम बुद्धिमत्ता", "AI उपकरण खोजें"],
      ["साइबर सुरक्षा", "डिजिटल सुरक्षा और नेटवर्क सीखें"],
      ["डिजिटल उपकरण", "डिजिटल उपकरण और सेवाएँ खोजें"],
      ["सभी दुनिया", "WASEEM WORLD के सभी अनुभाग देखें"]
    ]
  },
  ru: {
    welcome: "Добро пожаловать в панель управления",
    description: "Ваше личное пространство для управления аккаунтом и доступа к мирам платформы.",
    explore: "Исследуйте платформу",
    choose: "Выберите раздел, который хотите посетить.",
    account: "Ваш аккаунт",
    noEmail: "Адрес электронной почты не найден",
    logout: "Выйти",
    sections: [
      ["Искусственный интеллект", "Откройте инструменты ИИ"],
      ["Кибербезопасность", "Изучайте цифровую безопасность и сети"],
      ["Цифровые инструменты", "Откройте цифровые инструменты и сервисы"],
      ["Все миры", "Изучите все разделы WASEEM WORLD"]
    ]
  },
  pt: {
    welcome: "Bem-vindo ao seu painel",
    description: "Seu espaço pessoal para gerenciar sua conta e acessar os mundos da plataforma.",
    explore: "Explore sua plataforma",
    choose: "Escolha a seção que deseja visitar.",
    account: "Sua conta",
    noEmail: "E-mail não encontrado",
    logout: "Sair",
    sections: [
      ["Inteligência artificial", "Descubra ferramentas de IA"],
      ["Cibersegurança", "Aprenda segurança digital e redes"],
      ["Ferramentas digitais", "Descubra ferramentas e serviços digitais"],
      ["Todos os mundos", "Explore todas as seções do WASEEM WORLD"]
    ]
  }
};

const sectionLinks = [
  { icon: "✦", link: "/world/ai", number: "01" },
  { icon: "⬡", link: "/world/cyber", number: "02" },
  { icon: "⚙", link: "/tools", number: "03" },
  { icon: "◎", link: "/worlds", number: "04" }
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const { language, currentLanguage } = useLanguage();

  const t = translations[language] || translations.ar;
  const direction = currentLanguage?.dir || (language === "ar" ? "rtl" : "ltr");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="dashboard" dir={direction}>
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
          flex-shrink: 0;
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
        .dashboard-section-title p,
        .dashboard-card p {
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
          text-align: start;
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
            <h1>{t.welcome}</h1>
            <p>{t.description}</p>
          </div>

          <div className="dashboard-avatar">
            {(user?.displayName || user?.email || "W")
              .charAt(0)
              .toUpperCase()}
          </div>
        </section>

        <div className="dashboard-section-title">
          <h2>{t.explore}</h2>
          <p>{t.choose}</p>
        </div>

        <section className="dashboard-grid">
          {sectionLinks.map((item, index) => (
            <Link
              to={item.link}
              className="dashboard-card"
              key={item.number}
            >
              <span className="dashboard-card-number">
                WORLD {item.number}
              </span>

              <div className="dashboard-card-icon">{item.icon}</div>

              <h3>{t.sections[index][0]}</h3>
              <p>{t.sections[index][1]}</p>
            </Link>
          ))}
        </section>

        <section className="dashboard-account">
          <div>
            <strong>{t.account}</strong>
            <p>{user?.email || t.noEmail}</p>
          </div>

          <button className="dashboard-logout" onClick={handleLogout}>
            {t.logout}
          </button>
        </section>
      </div>
    </div>
  );
}
