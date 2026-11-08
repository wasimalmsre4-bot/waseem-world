
import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

export const languages = [
  { code: "ar", native: "العربية", dir: "rtl" },
  { code: "en", native: "English", dir: "ltr" },
  { code: "fr", native: "Français", dir: "ltr" },
  { code: "es", native: "Español", dir: "ltr" },
  { code: "de", native: "Deutsch", dir: "ltr" },
  { code: "tr", native: "Türkçe", dir: "ltr" },
  { code: "zh", native: "中文", dir: "ltr" },
  { code: "ja", native: "日本語", dir: "ltr" },
  { code: "ko", native: "한국어", dir: "ltr" },
  { code: "hi", native: "हिन्दी", dir: "ltr" },
  { code: "ru", native: "Русский", dir: "ltr" },
  { code: "pt", native: "Português", dir: "ltr" },
];

const keys = [
  "home", "worlds", "tools", "ai", "cyber", "dashboard",
  "logout", "language", "welcome",
  "heroEyebrow", "heroTitle1", "heroTitle2", "heroDescription",
  "exploreWorlds", "startJourney", "digitalWorlds", "possibilities",
  "innovation", "future", "explorePlatform", "discoverWorlds",
  "worldsDescription", "searchPlaceholder", "searchLabel",
  "clearSearch", "exploreThisWorld", "noResults", "tryAnother",
  "futureTitle1", "futureTitle2", "manifestoDescription",
  "startExploring", "footerTagline",
];

const values = {
  ar: [
    "الرئيسية", "العوالم", "الأدوات", "الذكاء الاصطناعي", "الأمن السيبراني",
    "لوحة التحكم", "تسجيل الخروج", "اللغة", "أهلاً بك في WASEEM WORLD",
    "بوابتك إلى العالم الرقمي", "عالم واحد،", "بلا حدود.",
    "مرحباً بك في WASEEM WORLD، منصة تجمع المعرفة والتكنولوجيا والإبداع في مكان واحد. اكتشف عوالم جديدة، وتعلّم، وابدأ رحلتك نحو المستقبل.",
    "اكتشف العوالم", "ابدأ رحلتك", "عوالم رقمية", "فرص للاكتشاف",
    "الابتكار", "المستقبل", "استكشف المنصة", "اكتشف عوالمنا",
    "ثمانية عوالم، ومجالات متنوعة، وتجربة رقمية واحدة.",
    "ابحث عن عالم أو مجال...", "ابحث في العوالم", "مسح البحث",
    "استكشف هذا العالم", "لم نعثر على نتائج", "جرّب البحث بكلمة أخرى.",
    "المستقبل لا ينتظر،", "اصنع مكانك فيه.",
    "ابدأ من هنا، استكشف أفكاراً جديدة، واكتسب المعرفة التي تساعدك على التقدم.",
    "ابدأ الاستكشاف", "عالم واحد، بلا حدود."
  ],

  en: [
    "Home", "Worlds", "Tools", "Artificial Intelligence", "Cybersecurity",
    "Dashboard", "Log out", "Language", "Welcome to WASEEM WORLD",
    "YOUR DIGITAL GATEWAY", "One World,", "Without Limits.",
    "Welcome to WASEEM WORLD, a platform bringing knowledge, technology and creativity together. Explore new worlds, learn and begin your journey into the future.",
    "Explore Worlds", "Start Your Journey", "DIGITAL WORLDS", "POSSIBILITIES",
    "INNOVATION", "FUTURE", "EXPLORE THE PLATFORM", "Discover Our Worlds",
    "Eight worlds, diverse fields and one digital experience.",
    "Search for a world or field...", "Search worlds", "Clear search",
    "Explore this world", "No results found", "Try another keyword.",
    "The future doesn't wait.", "Create your place in it.",
    "Start here. Explore new ideas and gain knowledge that helps you move forward.",
    "START EXPLORING", "One world, without limits."
  ],

  fr: [
    "Accueil", "Univers", "Outils", "Intelligence artificielle", "Cybersécurité",
    "Tableau de bord", "Déconnexion", "Langue", "Bienvenue sur WASEEM WORLD",
    "VOTRE PASSERELLE NUMÉRIQUE", "Un seul monde,", "Sans limites.",
    "Bienvenue sur WASEEM WORLD, une plateforme qui réunit savoir, technologie et créativité. Explorez de nouveaux univers et préparez votre avenir.",
    "Découvrir les univers", "Commencer", "UNIVERS NUMÉRIQUES", "POSSIBILITÉS",
    "INNOVATION", "AVENIR", "EXPLORER LA PLATEFORME", "Découvrez nos univers",
    "Huit univers, des domaines variés et une expérience numérique unique.",
    "Rechercher un univers ou un domaine...", "Rechercher", "Effacer",
    "Explorer cet univers", "Aucun résultat", "Essayez un autre mot.",
    "L'avenir n'attend pas.", "Créez votre place.",
    "Commencez ici. Découvrez de nouvelles idées et développez vos connaissances.",
    "COMMENCER À EXPLORER", "Un monde, sans limites."
  ],

  es: [
    "Inicio", "Mundos", "Herramientas", "Inteligencia artificial", "Ciberseguridad",
    "Panel", "Cerrar sesión", "Idioma", "Bienvenido a WASEEM WORLD",
    "TU PUERTA AL MUNDO DIGITAL", "Un solo mundo,", "Sin límites.",
    "Bienvenido a WASEEM WORLD, una plataforma que reúne conocimiento, tecnología y creatividad. Explora nuevos mundos y construye tu futuro.",
    "Explorar mundos", "Comenzar", "MUNDOS DIGITALES", "POSIBILIDADES",
    "INNOVACIÓN", "FUTURO", "EXPLORAR LA PLATAFORMA", "Descubre nuestros mundos",
    "Ocho mundos, diversos campos y una experiencia digital.",
    "Busca un mundo o área...", "Buscar mundos", "Borrar búsqueda",
    "Explorar este mundo", "No hay resultados", "Prueba otra palabra.",
    "El futuro no espera.", "Crea tu lugar en él.",
    "Empieza aquí. Explora nuevas ideas y adquiere conocimientos para avanzar.",
    "COMENZAR A EXPLORAR", "Un mundo, sin límites."
  ],

  de: [
    "Startseite", "Welten", "Werkzeuge", "Künstliche Intelligenz", "Cybersicherheit",
    "Dashboard", "Abmelden", "Sprache", "Willkommen bei WASEEM WORLD",
    "DEIN ZUGANG ZUR DIGITALEN WELT", "Eine Welt,", "Ohne Grenzen.",
    "Willkommen bei WASEEM WORLD. Eine Plattform für Wissen, Technologie und Kreativität. Entdecke neue Welten und gestalte deine Zukunft.",
    "Welten entdecken", "Jetzt starten", "DIGITALE WELTEN", "MÖGLICHKEITEN",
    "INNOVATION", "ZUKUNFT", "PLATTFORM ENTDECKEN", "Entdecke unsere Welten",
    "Acht Welten, vielfältige Themen und ein digitales Erlebnis.",
    "Suche nach einer Welt oder einem Thema...", "Welten suchen", "Suche löschen",
    "Diese Welt entdecken", "Keine Ergebnisse", "Versuche ein anderes Wort.",
    "Die Zukunft wartet nicht.", "Gestalte deinen Platz darin.",
    "Beginne hier. Entdecke neue Ideen und erweitere dein Wissen.",
    "JETZT ENTDECKEN", "Eine Welt, ohne Grenzen."
  ],

  tr: [
    "Ana Sayfa", "Dünyalar", "Araçlar", "Yapay Zeka", "Siber Güvenlik",
    "Kontrol Paneli", "Çıkış Yap", "Dil", "WASEEM WORLD'e Hoş Geldiniz",
    "DİJİTAL DÜNYAYA AÇILAN KAPIN", "Tek bir dünya,", "Sınırsız.",
    "WASEEM WORLD'e hoş geldiniz. Bilgi, teknoloji ve yaratıcılığı bir araya getiren platform. Yeni dünyaları keşfedin ve geleceğe yolculuğunuza başlayın.",
    "Dünyaları Keşfet", "Yolculuğa Başla", "DİJİTAL DÜNYALAR", "OLASILIKLAR",
    "YENİLİK", "GELECEK", "PLATFORMU KEŞFET", "Dünyalarımızı Keşfedin",
    "Sekiz dünya, farklı alanlar ve tek bir dijital deneyim.",
    "Bir dünya veya alan ara...", "Dünyalarda ara", "Aramayı temizle",
    "Bu dünyayı keşfet", "Sonuç bulunamadı", "Başka bir kelime dene.",
    "Gelecek beklemez.", "Onda kendi yerini oluştur.",
    "Buradan başla. Yeni fikirler keşfet ve bilgini geliştir.",
    "KEŞFETMEYE BAŞLA", "Tek dünya, sınırsız."
  ],

  zh: [
    "首页", "世界", "工具", "人工智能", "网络安全",
    "控制面板", "退出登录", "语言", "欢迎来到 WASEEM WORLD",
    "通往数字世界的大门", "一个世界，", "无限可能。",
    "欢迎来到 WASEEM WORLD，一个汇聚知识、科技与创意的平台。探索新领域，学习新知识，开启未来之旅。",
    "探索世界", "开始探索", "数字世界", "无限可能",
    "创新", "未来", "探索平台", "发现我们的世界",
    "八个世界，多元领域，一个数字体验。",
    "搜索世界或领域...", "搜索世界", "清除搜索",
    "探索这个世界", "未找到结果", "请尝试其他关键词。",
    "未来不会等待。", "创造属于你的位置。",
    "从这里开始，探索新想法，获取帮助你前进的知识。",
    "开始探索", "一个世界，无限可能。"
  ],

  ja: [
    "ホーム", "ワールド", "ツール", "人工知能", "サイバーセキュリティ",
    "ダッシュボード", "ログアウト", "言語", "WASEEM WORLDへようこそ",
    "デジタル世界への入口", "ひとつの世界、", "無限の可能性。",
    "WASEEM WORLDへようこそ。知識、テクノロジー、創造性を一つに集めたプラットフォームです。新しい世界を発見し、未来への旅を始めましょう。",
    "世界を探す", "旅を始める", "デジタルワールド", "可能性",
    "イノベーション", "未来", "プラットフォームを探す", "世界を発見する",
    "8つの世界、多様な分野、ひとつのデジタル体験。",
    "世界や分野を検索...", "ワールドを検索", "検索をクリア",
    "この世界を探す", "結果がありません", "別のキーワードを試してください。",
    "未来は待ってくれない。", "自分の居場所を作ろう。",
    "ここから始め、新しいアイデアと知識を発見しましょう。",
    "探索を始める", "ひとつの世界、無限の可能性。"
  ],

  ko: [
    "홈", "월드", "도구", "인공지능", "사이버 보안",
    "대시보드", "로그아웃", "언어", "WASEEM WORLD에 오신 것을 환영합니다",
    "디지털 세계로 가는 관문", "하나의 세계,", "무한한 가능성.",
    "WASEEM WORLD에 오신 것을 환영합니다. 지식, 기술, 창의성을 하나로 모은 플랫폼입니다. 새로운 세계를 탐험하고 미래를 향한 여정을 시작하세요.",
    "월드 탐색", "여정 시작", "디지털 월드", "가능성",
    "혁신", "미래", "플랫폼 탐색", "우리의 월드 발견",
    "여덟 개의 월드, 다양한 분야, 하나의 디지털 경험.",
    "월드 또는 분야 검색...", "월드 검색", "검색 지우기",
    "이 월드 탐색", "검색 결과 없음", "다른 키워드를 시도하세요.",
    "미래는 기다리지 않습니다.", "그 안에서 당신의 자리를 만드세요.",
    "여기서 시작하세요. 새로운 아이디어와 지식을 발견하세요.",
    "탐색 시작", "하나의 세계, 무한한 가능성."
  ],

  hi: [
    "होम", "दुनिया", "उपकरण", "कृत्रिम बुद्धिमत्ता", "साइबर सुरक्षा",
    "डैशबोर्ड", "लॉग आउट", "भाषा", "WASEEM WORLD में आपका स्वागत है",
    "डिजिटल दुनिया का प्रवेश द्वार", "एक दुनिया,", "असीम संभावनाएँ।",
    "WASEEM WORLD में आपका स्वागत है। यह ज्ञान, तकनीक और रचनात्मकता को एक साथ लाने वाला मंच है। नई दुनिया खोजें और भविष्य की यात्रा शुरू करें।",
    "दुनिया खोजें", "यात्रा शुरू करें", "डिजिटल दुनिया", "संभावनाएँ",
    "नवाचार", "भविष्य", "मंच खोजें", "हमारी दुनिया खोजें",
    "आठ दुनिया, विविध क्षेत्र और एक डिजिटल अनुभव।",
    "दुनिया या क्षेत्र खोजें...", "दुनिया खोजें", "खोज साफ़ करें",
    "इस दुनिया को खोजें", "कोई परिणाम नहीं", "दूसरा शब्द आज़माएँ।",
    "भविष्य इंतज़ार नहीं करता।", "उसमें अपनी जगह बनाएँ।",
    "यहाँ से शुरू करें। नए विचार और आगे बढ़ने का ज्ञान प्राप्त करें।",
    "खोज शुरू करें", "एक दुनिया, असीम संभावनाएँ।"
  ],

  ru: [
    "Главная", "Миры", "Инструменты", "Искусственный интеллект", "Кибербезопасность",
    "Панель управления", "Выйти", "Язык", "Добро пожаловать в WASEEM WORLD",
    "ТВОИ ВОРОТА В ЦИФРОВОЙ МИР", "Один мир,", "Без границ.",
    "Добро пожаловать в WASEEM WORLD — платформу, объединяющую знания, технологии и творчество. Открывай новые миры и создавай своё будущее.",
    "Открыть миры", "Начать путь", "ЦИФРОВЫЕ МИРЫ", "ВОЗМОЖНОСТИ",
    "ИННОВАЦИИ", "БУДУЩЕЕ", "ИЗУЧИТЬ ПЛАТФОРМУ", "Открой наши миры",
    "Восемь миров, разные направления и единый цифровой опыт.",
    "Найти мир или направление...", "Поиск миров", "Очистить поиск",
    "Открыть этот мир", "Ничего не найдено", "Попробуйте другое слово.",
    "Будущее не ждёт.", "Создай своё место в нём.",
    "Начни здесь. Открывай новые идеи и получай знания для развития.",
    "НАЧАТЬ ИЗУЧЕНИЕ", "Один мир, без границ."
  ],

  pt: [
    "Início", "Mundos", "Ferramentas", "Inteligência artificial", "Cibersegurança",
    "Painel", "Sair", "Idioma", "Bem-vindo ao WASEEM WORLD",
    "SUA PORTA PARA O MUNDO DIGITAL", "Um mundo,", "Sem limites.",
    "Bem-vindo ao WASEEM WORLD, uma plataforma que reúne conhecimento, tecnologia e criatividade. Explore novos mundos e comece sua jornada para o futuro.",
    "Explorar mundos", "Começar jornada", "MUNDOS DIGITAIS", "POSSIBILIDADES",
    "INOVAÇÃO", "FUTURO", "EXPLORAR A PLATAFORMA", "Descubra nossos mundos",
    "Oito mundos, áreas diversas e uma experiência digital.",
    "Pesquise um mundo ou área...", "Pesquisar mundos", "Limpar pesquisa",
    "Explorar este mundo", "Nenhum resultado", "Tente outra palavra.",
    "O futuro não espera.", "Crie seu lugar nele.",
    "Comece aqui. Explore novas ideias e adquira conhecimento para avançar.",
    "COMEÇAR A EXPLORAR", "Um mundo, sem limites."
  ],
};

const translations = Object.fromEntries(
  languages.map((language) => [
    language.code,
    Object.fromEntries(keys.map((key, index) => [key, values[language.code][index]])),
  ])
);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("ww-language");
    return languages.some((item) => item.code === saved) ? saved : "ar";
  });

  const currentLanguage =
    languages.find((item) => item.code === language) || languages[0];

  useEffect(() => {
    document.documentElement.lang = currentLanguage.code;
    document.documentElement.dir = currentLanguage.dir;
    localStorage.setItem("ww-language", currentLanguage.code);
  }, [currentLanguage]);

  const changeLanguage = (code) => {
    if (languages.some((item) => item.code === code)) {
      setLanguage(code);
    }
  };

  const t = (key) => translations[language]?.[key] || translations.ar[key] || key;

  return (
    <LanguageContext.Provider
      value={{ language, languages, currentLanguage, changeLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
