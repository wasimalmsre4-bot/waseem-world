
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";
import "./HomePage.css";

const worlds = [
  {
    id: "ai",
    title: "عالم الذكاء الاصطناعي",
    en: "Artificial Intelligence",
    descriptions: {
      ar: "اكتشف تقنيات الذكاء الاصطناعي وتعلّم كيف تصنع المستقبل.",
      en: "Discover artificial intelligence and learn how to shape the future.",
      fr: "Découvrez l'intelligence artificielle et apprenez à façonner l'avenir.",
      es: "Descubre la inteligencia artificial y aprende a construir el futuro.",
      de: "Entdecke künstliche Intelligenz und gestalte die Zukunft.",
      tr: "Yapay zekâyı keşfet ve geleceği şekillendirmeyi öğren.",
      zh: "探索人工智能，学习如何塑造未来。",
      ja: "人工知能を発見し、未来を形作る方法を学びましょう。",
      ko: "인공지능을 탐구하고 미래를 만들어가는 방법을 배우세요.",
      hi: "कृत्रिम बुद्धिमत्ता की खोज करें और भविष्य बनाना सीखें।",
      ru: "Изучай искусственный интеллект и учись создавать будущее.",
      pt: "Descubra a inteligência artificial e aprenda a construir o futuro."
    },
    tag: "INTELLIGENCE",
    tagAr: "الذكاء والتقنيات",
    icon: "✳"
  },
  {
    id: "cyber",
    title: "عالم الأمن السيبراني",
    en: "Cyber Security",
    descriptions: {
      ar: "تعرّف على الأمن الرقمي والشبكات وأدوات الحماية.",
      en: "Explore digital security, networks and protection tools.",
      fr: "Découvrez la sécurité numérique, les réseaux et les outils de protection.",
      es: "Explora la seguridad digital, las redes y las herramientas de protección.",
      de: "Entdecke digitale Sicherheit, Netzwerke und Schutzwerkzeuge.",
      tr: "Dijital güvenliği, ağları ve koruma araçlarını keşfet.",
      zh: "探索数字安全、网络和防护工具。",
      ja: "デジタルセキュリティ、ネットワーク、保護ツールを学びましょう。",
      ko: "디지털 보안, 네트워크 및 보호 도구를 알아보세요.",
      hi: "डिजिटल सुरक्षा, नेटवर्क और सुरक्षा उपकरणों को जानें।",
      ru: "Изучай цифровую безопасность, сети и инструменты защиты.",
      pt: "Explore a segurança digital, redes e ferramentas de proteção."
    },
    tag: "DIGITAL SECURITY",
    tagAr: "الحماية الرقمية",
    icon: "⬡"
  },
  {
    id: "technology",
    title: "عالم التكنولوجيا",
    en: "Technology",
    descriptions: {
      ar: "تابع أحدث التقنيات والابتكارات في العالم الرقمي.",
      en: "Explore modern technology and digital innovations.",
      fr: "Découvrez les technologies modernes et les innovations numériques.",
      es: "Explora la tecnología moderna y las innovaciones digitales.",
      de: "Entdecke moderne Technologien und digitale Innovationen.",
      tr: "Modern teknolojiyi ve dijital yenilikleri keşfet.",
      zh: "探索现代科技和数字创新。",
      ja: "最新のテクノロジーとデジタルイノベーションを探りましょう。",
      ko: "현대 기술과 디지털 혁신을 탐구하세요.",
      hi: "आधुनिक तकनीक और डिजिटल नवाचारों की खोज करें।",
      ru: "Открой современные технологии и цифровые инновации.",
      pt: "Explore a tecnologia moderna e as inovações digitais."
    },
    tag: "INNOVATION",
    tagAr: "الابتكار",
    icon: "⌘"
  },
  {
    id: "education",
    title: "عالم التعليم",
    en: "Education",
    descriptions: {
      ar: "مصادر تعليمية تساعدك على اكتساب المعرفة والمهارات.",
      en: "Educational resources to build knowledge and skills.",
      fr: "Des ressources éducatives pour développer vos connaissances et compétences.",
      es: "Recursos educativos para desarrollar conocimientos y habilidades.",
      de: "Lernressourcen zum Aufbau von Wissen und Fähigkeiten.",
      tr: "Bilgi ve becerilerini geliştirmek için eğitim kaynakları.",
      zh: "帮助你积累知识和技能的教育资源。",
      ja: "知識とスキルを身につけるための教育リソース。",
      ko: "지식과 기술을 쌓기 위한 교육 자료.",
      hi: "ज्ञान और कौशल विकसित करने के लिए शैक्षिक संसाधन।",
      ru: "Образовательные ресурсы для развития знаний и навыков.",
      pt: "Recursos educacionais para desenvolver conhecimentos e habilidades."
    },
    tag: "KNOWLEDGE",
    tagAr: "المعرفة والتعلّم",
    icon: "▤"
  },
  {
    id: "business",
    title: "عالم الأعمال",
    en: "Business",
    descriptions: {
      ar: "اكتشف ريادة الأعمال والتسويق وتطوير المشاريع.",
      en: "Explore entrepreneurship, marketing and business growth.",
      fr: "Découvrez l'entrepreneuriat, le marketing et le développement commercial.",
      es: "Explora el emprendimiento, el marketing y el crecimiento empresarial.",
      de: "Entdecke Unternehmertum, Marketing und Unternehmenswachstum.",
      tr: "Girişimciliği, pazarlamayı ve iş geliştirmeyi keşfet.",
      zh: "探索创业、营销和业务增长。",
      ja: "起業、マーケティング、ビジネスの成長を探りましょう。",
      ko: "기업가 정신, 마케팅 및 비즈니스 성장을 탐구하세요.",
      hi: "उद्यमिता, मार्केटिंग और व्यवसाय विकास की खोज करें।",
      ru: "Изучай предпринимательство, маркетинг и развитие бизнеса.",
      pt: "Explore o empreendedorismo, marketing e crescimento empresarial."
    },
    tag: "OPPORTUNITY",
    tagAr: "الأعمال والفرص",
    icon: "◈"
  },
  {
    id: "creative",
    title: "عالم الإبداع",
    en: "Creative Studio",
    descriptions: {
      ar: "مساحة للأفكار والتصميم وصناعة المحتوى.",
      en: "A space for ideas, design and content creation.",
      fr: "Un espace dédié aux idées, au design et à la création de contenu.",
      es: "Un espacio para ideas, diseño y creación de contenido.",
      de: "Ein Raum für Ideen, Design und Content-Erstellung.",
      tr: "Fikirler, tasarım ve içerik üretimi için bir alan.",
      zh: "一个用于创意、设计和内容创作的空间。",
      ja: "アイデア、デザイン、コンテンツ制作のための空間。",
      ko: "아이디어, 디자인 및 콘텐츠 제작을 위한 공간.",
      hi: "विचारों, डिज़ाइन और सामग्री निर्माण के लिए एक स्थान।",
      ru: "Пространство для идей, дизайна и создания контента.",
      pt: "Um espaço para ideias, design e criação de conteúdo."
    },
    tag: "CREATIVITY",
    tagAr: "الإبداع والتصميم",
    icon: "✧"
  },
  {
    id: "explore",
    title: "عالم الاستكشاف",
    en: "Explore The World",
    descriptions: {
      ar: "افتح آفاقاً جديدة واكتشف مجالات وتجارب مختلفة.",
      en: "Discover new horizons, fields and experiences.",
      fr: "Ouvrez de nouveaux horizons et découvrez de nouveaux domaines.",
      es: "Descubre nuevos horizontes, áreas y experiencias.",
      de: "Entdecke neue Horizonte, Bereiche und Erfahrungen.",
      tr: "Yeni ufuklar, alanlar ve deneyimler keşfet.",
      zh: "开拓新视野，发现不同领域和体验。",
      ja: "新しい視野を広げ、さまざまな分野や体験を発見しましょう。",
      ko: "새로운 지평과 다양한 분야 및 경험을 발견하세요.",
      hi: "नए क्षितिज और विभिन्न क्षेत्रों और अनुभवों की खोज करें।",
      ru: "Открывай новые горизонты, области и впечатления.",
      pt: "Descubra novos horizontes, áreas e experiências."
    },
    tag: "DISCOVERY",
    tagAr: "الاكتشاف",
    icon: "◎"
  },
  {
    id: "tools",
    title: "عالم الأدوات",
    en: "Digital Tools",
    descriptions: {
      ar: "اكتشف مجموعة من الأدوات الرقمية المفيدة.",
      en: "Discover useful tools for your digital journey.",
      fr: "Découvrez des outils numériques utiles pour votre parcours.",
      es: "Descubre herramientas digitales útiles para tu camino.",
      de: "Entdecke nützliche digitale Werkzeuge für deinen Weg.",
      tr: "Dijital yolculuğun için faydalı araçları keşfet.",
      zh: "发现适合你数字之旅的实用工具。",
      ja: "デジタルの旅に役立つ便利なツールを見つけましょう。",
      ko: "디지털 여정에 유용한 도구를 찾아보세요.",
      hi: "अपनी डिजिटल यात्रा के लिए उपयोगी उपकरण खोजें।",
      ru: "Открой полезные цифровые инструменты для своего пути.",
      pt: "Descubra ferramentas digitais úteis para sua jornada."
    },
    tag: "PRODUCTIVITY",
    tagAr: "الأدوات والإنتاجية",
    icon: "⌘"
  }
];

const worldNames = {
  ar: ["عالم الذكاء الاصطناعي", "عالم الأمن السيبراني", "عالم التكنولوجيا", "عالم التعليم", "عالم الأعمال", "عالم الإبداع", "عالم الاستكشاف", "عالم الأدوات"],
  en: ["Artificial Intelligence", "Cyber Security", "Technology", "Education", "Business", "Creative Studio", "Explore The World", "Digital Tools"],
  fr: ["Intelligence artificielle", "Cybersécurité", "Technologie", "Éducation", "Affaires", "Studio créatif", "Exploration", "Outils numériques"],
  es: ["Inteligencia artificial", "Ciberseguridad", "Tecnología", "Educación", "Negocios", "Estudio creativo", "Exploración", "Herramientas digitales"],
  de: ["Künstliche Intelligenz", "Cybersicherheit", "Technologie", "Bildung", "Geschäft", "Kreativstudio", "Entdecken", "Digitale Werkzeuge"],
  tr: ["Yapay Zeka", "Siber Güvenlik", "Teknoloji", "Eğitim", "İş Dünyası", "Yaratıcı Stüdyo", "Keşif", "Dijital Araçlar"],
  zh: ["人工智能", "网络安全", "科技", "教育", "商业", "创意工作室", "探索世界", "数字工具"],
  ja: ["人工知能", "サイバーセキュリティ", "テクノロジー", "教育", "ビジネス", "クリエイティブスタジオ", "探検", "デジタルツール"],
  ko: ["인공지능", "사이버 보안", "기술", "교육", "비즈니스", "크리에이티브 스튜디오", "탐험", "디지털 도구"],
  hi: ["कृत्रिम बुद्धिमत्ता", "साइबर सुरक्षा", "प्रौद्योगिकी", "शिक्षा", "व्यवसाय", "क्रिएटिव स्टूडियो", "अन्वेषण", "डिजिटल उपकरण"],
  ru: ["Искусственный интеллект", "Кибербезопасность", "Технологии", "Образование", "Бизнес", "Творческая студия", "Исследование", "Цифровые инструменты"],
  pt: ["Inteligência artificial", "Cibersegurança", "Tecnologia", "Educação", "Negócios", "Estúdio criativo", "Exploração", "Ferramentas digitais"]
};

const worldTags = {
  ar: ["الذكاء والتقنيات", "الحماية الرقمية", "الابتكار", "المعرفة والتعلّم", "الأعمال والفرص", "الإبداع والتصميم", "الاكتشاف", "الأدوات والإنتاجية"],
  en: ["INTELLIGENCE", "DIGITAL SECURITY", "INNOVATION", "KNOWLEDGE", "OPPORTUNITY", "CREATIVITY", "DISCOVERY", "PRODUCTIVITY"],
  fr: ["INTELLIGENCE", "SÉCURITÉ NUMÉRIQUE", "INNOVATION", "CONNAISSANCE", "OPPORTUNITÉS", "CRÉATIVITÉ", "DÉCOUVERTE", "PRODUCTIVITÉ"],
  es: ["INTELIGENCIA", "SEGURIDAD DIGITAL", "INNOVACIÓN", "CONOCIMIENTO", "OPORTUNIDAD", "CREATIVIDAD", "DESCUBRIMIENTO", "PRODUCTIVIDAD"],
  de: ["INTELLIGENZ", "DIGITALE SICHERHEIT", "INNOVATION", "WISSEN", "CHANCEN", "KREATIVITÄT", "ENTDECKUNG", "PRODUKTIVITÄT"],
  tr: ["ZEKA", "DİJİTAL GÜVENLİK", "YENİLİK", "BİLGİ", "FIRSAT", "YARATICILIK", "KEŞİF", "VERİMLİLİK"],
  zh: ["智能", "数字安全", "创新", "知识", "机遇", "创造力", "探索", "效率"],
  ja: ["知能", "デジタルセキュリティ", "革新", "知識", "機会", "創造性", "発見", "生産性"],
  ko: ["지능", "디지털 보안", "혁신", "지식", "기회", "창의성", "발견", "생산성"],
  hi: ["बुद्धिमत्ता", "डिजिटल सुरक्षा", "नवाचार", "ज्ञान", "अवसर", "रचनात्मकता", "खोज", "उत्पादकता"],
  ru: ["ИНТЕЛЛЕКТ", "ЦИФРОВАЯ ЗАЩИТА", "ИННОВАЦИИ", "ЗНАНИЯ", "ВОЗМОЖНОСТИ", "ТВОРЧЕСТВО", "ОТКРЫТИЯ", "ПРОДУКТИВНОСТЬ"],
  pt: ["INTELIGÊNCIA", "SEGURANÇA DIGITAL", "INOVAÇÃO", "CONHECIMENTO", "OPORTUNIDADE", "CRIATIVIDADE", "DESCOBERTA", "PRODUTIVIDADE"]
};

export default function HomePage() {
  const [search, setSearch] = useState("");
  const { language, currentLanguage, t } = useLanguage();

  const isArabic = language === "ar";
  const names = worldNames[language] || worldNames.en;
  const tags = worldTags[language] || worldTags.en;

  const filteredWorlds = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return worlds;

    return worlds.filter((world, index) => {
      const description = world.descriptions[language] || world.descriptions.en;

      return [
        names[index],
        world.title,
        world.en,
        description,
        world.tag,
        tags[index]
      ].some((item) => item.toLowerCase().includes(value));
    });
  }, [search, language, names, tags]);

  return (
    <main className="ww-home" dir={currentLanguage.dir}>
      <Navbar />

      <section className="ww-hero">
        <div className="ww-hero-grid">
          <div className="ww-hero-copy">
            <div className="ww-eyebrow">
              <span className="ww-live-dot" />
              {t("heroEyebrow")}
            </div>

            <h1>
              {t("heroTitle1")}
              <span>{t("heroTitle2")}</span>
            </h1>

            <p>{t("heroDescription")}</p>

            <div className="ww-hero-buttons">
              <a href="#worlds" className="ww-primary-button">
                {t("exploreWorlds")} <span>↗</span>
              </a>

              <Link to="/world/ai" className="ww-secondary-button">
                {t("startJourney")} <span>→</span>
              </Link>
            </div>

            <div className="ww-hero-stats">
              <div>
                <strong>08</strong>
                <span>{t("digitalWorlds")}</span>
              </div>
              <i />
              <div>
                <strong>12</strong>
                <span>{t("language")}</span>
              </div>
              <i />
              <div>
                <strong>∞</strong>
                <span>{t("possibilities")}</span>
              </div>
            </div>
          </div>

          <div className="ww-hero-art">
            <div className="ww-orbit ww-orbit-one" />
            <div className="ww-orbit ww-orbit-two" />
            <div className="ww-orbit ww-orbit-three" />

            <div className="ww-orbit-core">
              <span>W</span>
              <small>WORLD</small>
            </div>

            <div className="ww-orbit-label ww-label-top">
              {t("innovation")}
            </div>
            <div className="ww-orbit-label ww-label-right">AI</div>
            <div className="ww-orbit-label ww-label-bottom">
              {t("future")}
            </div>
            <div className="ww-orbit-label ww-label-left">CYBER</div>

            <div className="ww-art-caption">
              EXPLORE • LEARN • CREATE
            </div>
          </div>
        </div>

        <div className="ww-hero-bottom">
          <span>WASEEM WORLD — YOUR WORLD</span>
          <div className="ww-scroll-line" />
          <span>{t("futureTitle2")}</span>
        </div>
      </section>

      <section className="ww-worlds-section" id="worlds">
        <div className="ww-section-heading">
          <div>
            <div className="ww-eyebrow">
              <span className="ww-live-dot" />
              {t("explorePlatform")}
            </div>

            <h2>{t("discoverWorlds")}</h2>
            <p>{t("worldsDescription")}</p>
          </div>

          <div className="ww-world-total">
            <strong>08</strong>
            <span>WORLDS</span>
          </div>
        </div>

        <div className="ww-search-wrap">
          <span>⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("searchPlaceholder")}
            aria-label={t("searchLabel")}
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label={t("clearSearch")}
            >
              ×
            </button>
          )}

          <kbd>SEARCH</kbd>
        </div>

        <div className="ww-world-grid">
          {filteredWorlds.map((world) => {
            const originalIndex = worlds.findIndex((item) => item.id === world.id);
            const description =
              world.descriptions[language] || world.descriptions.en;

            return (
              <Link
                to={`/world/${world.id}`}
                className="ww-world-card"
                key={world.id}
              >
                <div className="ww-card-top">
                  <span className="ww-card-number">
                    WORLD / {String(originalIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="ww-card-icon">{world.icon}</span>
                </div>

                <div className="ww-card-content">
                  <span className="ww-card-tag">{tags[originalIndex]}</span>
                  <h3>{names[originalIndex]}</h3>
                  <span className="ww-card-en">
                    {language === "en" ? world.title : world.en}
                  </span>
                  <p>{description}</p>
                </div>

                <div className="ww-card-bottom">
                  <span>{t("exploreThisWorld")}</span>
                  <span className="ww-card-arrow">
                    {isArabic ? "←" : "→"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredWorlds.length === 0 && (
          <div className="ww-empty">
            <h3>{t("noResults")}</h3>
            <p>{t("tryAnother")}</p>
          </div>
        )}
      </section>

      <section className="ww-manifesto">
        <div className="ww-eyebrow">
          <span className="ww-live-dot" />
          WASEEM WORLD
        </div>

        <h2>
          {t("futureTitle1")}
          <span> {t("futureTitle2")}</span>
        </h2>

        <p>{t("manifestoDescription")}</p>

        <a href="#worlds">
          {t("startExploring")} ↗
        </a>
      </section>

      <footer className="ww-footer">
        <span>
          © {new Date().getFullYear()} WASEEM WORLD. ALL RIGHTS RESERVED.
        </span>
        <span>{t("footerTagline")}</span>
      </footer>
    </main>
  );
}
