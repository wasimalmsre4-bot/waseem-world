
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";
import "./HomePage.css";

const worlds = [
  {
    id: "ai", icon: "✳",
    names: ["عالم الذكاء الاصطناعي", "Artificial Intelligence", "Intelligence artificielle", "Inteligencia artificial", "Künstliche Intelligenz", "Yapay Zekâ", "人工智能", "人工知能", "인공지능", "कृत्रिम बुद्धिमत्ता", "Искусственный интеллект", "Inteligência artificial"],
    descriptions: ["اكتشف تقنيات الذكاء الاصطناعي وتعلّم كيف تصنع المستقبل.", "Discover artificial intelligence and learn how to shape the future.", "Découvrez l'intelligence artificielle et apprenez à façonner l'avenir.", "Descubre la inteligencia artificial y aprende a construir el futuro.", "Entdecke künstliche Intelligenz und gestalte die Zukunft.", "Yapay zekâyı keşfet ve geleceği şekillendirmeyi öğren.", "探索人工智能技术，学习如何创造未来。", "人工知能を発見し、未来を創る方法を学びましょう。", "인공지능 기술을 발견하고 미래를 만드는 방법을 배워보세요.", "कृत्रिम बुद्धिमत्ता की खोज करें और भविष्य बनाना सीखें。", "Откройте искусственный интеллект и научитесь создавать будущее.", "Descubra a inteligência artificial e aprenda a construir o futuro."],
    tags: ["الذكاء والتقنيات", "INTELLIGENCE", "INTELLIGENCE", "INTELIGENCIA", "INTELLIGENZ", "YAPAY ZEKÂ", "智能科技", "知能技術", "지능 기술", "बुद्धिमत्ता", "ИНТЕЛЛЕКТ", "INTELIGÊNCIA"]
  },
  {
    id: "cyber", icon: "⬡",
    names: ["عالم الأمن السيبراني", "Cybersecurity", "Cybersécurité", "Ciberseguridad", "Cybersicherheit", "Siber Güvenlik", "网络安全", "サイバーセキュリティ", "사이버 보안", "साइबर सुरक्षा", "Кибербезопасность", "Cibersegurança"],
    descriptions: ["تعرّف على الأمن الرقمي والشبكات وأدوات الحماية.", "Explore digital security, networks and protection tools.", "Explorez la sécurité numérique, les réseaux et les outils de protection.", "Explora la seguridad digital, las redes y las herramientas de protección.", "Entdecke digitale Sicherheit, Netzwerke und Schutzwerkzeuge.", "Dijital güvenliği, ağları ve koruma araçlarını keşfet.", "探索数字安全、网络和保护工具。", "デジタルセキュリティ、ネットワーク、保護ツールを探求しましょう。", "디지털 보안, 네트워크 및 보호 도구를 살펴보세요.", "डिजिटल सुरक्षा, नेटवर्क और सुरक्षा उपकरणों को जानें।", "Изучите цифровую безопасность, сети и инструменты защиты.", "Explore a segurança digital, redes e ferramentas de proteção."],
    tags: ["الحماية الرقمية", "DIGITAL SECURITY", "SÉCURITÉ NUMÉRIQUE", "SEGURIDAD DIGITAL", "DIGITALE SICHERHEIT", "DİJİTAL GÜVENLİK", "数字安全", "デジタルセキュリティ", "디지털 보안", "डिजिटल सुरक्षा", "ЦИФРОВАЯ БЕЗОПАСНОСТЬ", "SEGURANÇA DIGITAL"]
  },
  {
    id: "technology", icon: "⌘",
    names: ["عالم التكنولوجيا", "Technology", "Technologie", "Tecnología", "Technologie", "Teknoloji", "科技", "テクノロジー", "기술", "प्रौद्योगिकी", "Технологии", "Tecnologia"],
    descriptions: ["تابع أحدث التقنيات والابتكارات في العالم الرقمي.", "Explore modern technology and digital innovations.", "Explorez les dernières technologies et innovations numériques.", "Descubre las últimas tecnologías e innovaciones digitales.", "Entdecke moderne Technologien und digitale Innovationen.", "En yeni teknolojileri ve dijital yenilikleri keşfet.", "探索最新技术和数字创新。", "最新のテクノロジーとデジタルイノベーションを探求しましょう。", "최신 기술과 디지털 혁신을 살펴보세요.", "आधुनिक तकनीक और डिजिटल नवाचारों की खोज करें।", "Откройте современные технологии и цифровые инновации.", "Explore as tecnologias modernas e as inovações digitais."],
    tags: ["الابتكار", "INNOVATION", "INNOVATION", "INNOVACIÓN", "INNOVATION", "YENİLİK", "创新", "イノベーション", "혁신", "नवाचार", "ИННОВАЦИИ", "INOVAÇÃO"]
  },
  {
    id: "education", icon: "▤",
    names: ["عالم التعليم", "Education", "Éducation", "Educación", "Bildung", "Eğitim", "教育", "教育", "교육", "शिक्षा", "Образование", "Educação"],
    descriptions: ["مصادر تعليمية تساعدك على اكتساب المعرفة والمهارات.", "Educational resources to build knowledge and skills.", "Des ressources éducatives pour développer vos connaissances et compétences.", "Recursos educativos para desarrollar conocimientos y habilidades.", "Lernressourcen zum Aufbau von Wissen und Fähigkeiten.", "Bilgi ve beceriler kazanmanı sağlayan eğitim kaynakları.", "帮助你获取知识和技能的教育资源。", "知識とスキルを身につけるための学習リソース。", "지식과 기술을 쌓을 수 있는 학습 자료.", "ज्ञान और कौशल विकसित करने के लिए शैक्षिक संसाधन।", "Образовательные ресурсы для развития знаний и навыков.", "Recursos educacionais para desenvolver conhecimentos e habilidades."],
    tags: ["المعرفة والتعلّم", "KNOWLEDGE", "CONNAISSANCE", "CONOCIMIENTO", "WISSEN", "BİLGİ", "知识", "知識", "지식", "ज्ञान", "ЗНАНИЯ", "CONHECIMENTO"]
  },
  {
    id: "business", icon: "◈",
    names: ["عالم الأعمال", "Business", "Affaires", "Negocios", "Geschäft", "İş Dünyası", "商业", "ビジネス", "비즈니스", "व्यापार", "Бизнес", "Negócios"],
    descriptions: ["اكتشف ريادة الأعمال والتسويق وتطوير المشاريع.", "Explore entrepreneurship, marketing and business growth.", "Explorez l'entrepreneuriat, le marketing et le développement commercial.", "Explora el emprendimiento, el marketing y el crecimiento empresarial.", "Entdecke Unternehmertum, Marketing und Unternehmenswachstum.", "Girişimciliği, pazarlamayı ve iş geliştirmeyi keşfet.", "探索创业、营销和商业发展。", "起業、マーケティング、ビジネス成長を探求しましょう。", "창업, 마케팅 및 비즈니스 성장을 살펴보세요.", "उद्यमिता, विपणन और व्यवसाय विकास की खोज करें।", "Изучите предпринимательство, маркетинг и развитие бизнеса.", "Explore o empreendedorismo, o marketing e o crescimento empresarial."],
    tags: ["الأعمال والفرص", "OPPORTUNITY", "OPPORTUNITÉ", "OPORTUNIDAD", "CHANCEN", "FIRSATLAR", "机会", "チャンス", "기회", "अवसर", "ВОЗМОЖНОСТИ", "OPORTUNIDADE"]
  },
  {
    id: "creative", icon: "✧",
    names: ["عالم الإبداع", "Creative Studio", "Studio créatif", "Estudio creativo", "Kreativstudio", "Yaratıcı Stüdyo", "创意工作室", "クリエイティブスタジオ", "크리에이티브 스튜디오", "रचनात्मक स्टूडियो", "Творческая студия", "Estúdio criativo"],
    descriptions: ["مساحة للأفكار والتصميم وصناعة المحتوى.", "A space for ideas, design and content creation.", "Un espace pour les idées, le design et la création de contenu.", "Un espacio para ideas, diseño y creación de contenido.", "Ein Raum für Ideen, Design und Content-Erstellung.", "Fikirler, tasarım ve içerik üretimi için bir alan.", "一个用于创意、设计和内容创作的空间。", "アイデア、デザイン、コンテンツ制作のための空間。", "아이디어, 디자인 및 콘텐츠 제작을 위한 공간.", "विचारों, डिज़ाइन और सामग्री निर्माण के लिए एक स्थान।", "Пространство для идей, дизайна и создания контента.", "Um espaço para ideias, design e criação de conteúdo."],
    tags: ["الإبداع والتصميم", "CREATIVITY", "CRÉATIVITÉ", "CREATIVIDAD", "KREATIVITÄT", "YARATICILIK", "创意", "創造性", "창의성", "रचनात्मकता", "ТВОРЧЕСТВО", "CRIATIVIDADE"]
  },
  {
    id: "explore", icon: "◎",
    names: ["عالم الاستكشاف", "Explore the World", "Explorer le monde", "Explora el mundo", "Welt entdecken", "Dünyayı Keşfet", "探索世界", "世界を探検", "세상 탐험", "दुनिया की खोज", "Исследуй мир", "Explore o mundo"],
    descriptions: ["افتح آفاقاً جديدة واكتشف مجالات وتجارب مختلفة.", "Discover new horizons, fields and experiences.", "Découvrez de nouveaux horizons, domaines et expériences.", "Descubre nuevos horizontes, campos y experiencias.", "Entdecke neue Horizonte, Bereiche und Erfahrungen.", "Yeni ufuklar, alanlar ve deneyimler keşfet.", "发现新的视野、领域和体验。", "新しい可能性、分野、体験を発見しましょう。", "새로운 분야와 경험을 발견하세요.", "नए क्षितिज, क्षेत्र और अनुभव खोजें।", "Откройте новые горизонты, области и впечатления.", "Descubra novos horizontes, áreas e experiências."],
    tags: ["الاكتشاف", "DISCOVERY", "DÉCOUVERTE", "DESCUBRIMIENTO", "ENTDECKUNG", "KEŞİF", "探索", "発見", "탐험", "खोज", "ОТКРЫТИЯ", "DESCOBERTA"]
  },
  {
    id: "tools", icon: "⌘",
    names: ["عالم الأدوات", "Digital Tools", "Outils numériques", "Herramientas digitales", "Digitale Werkzeuge", "Dijital Araçlar", "数字工具", "デジタルツール", "디지털 도구", "डिजिटल उपकरण", "Цифровые инструменты", "Ferramentas digitais"],
    descriptions: ["اكتشف مجموعة من الأدوات الرقمية المفيدة.", "Discover useful tools for your digital journey.", "Découvrez des outils utiles pour votre parcours numérique.", "Descubre herramientas útiles para tu camino digital.", "Entdecke nützliche Werkzeuge für deine digitale Reise.", "Dijital yolculuğun için faydalı araçları keşfet.", "探索数字旅程中的实用工具。", "デジタルの旅に役立つツールを見つけましょう。", "디지털 여정에 유용한 도구를 발견하세요.", "अपनी डिजिटल यात्रा के लिए उपयोगी उपकरण खोजें।", "Откройте полезные инструменты для цифрового пути.", "Descubra ferramentas úteis para sua jornada digital."],
    tags: ["الأدوات والإنتاجية", "PRODUCTIVITY", "PRODUCTIVITÉ", "PRODUCTIVIDAD", "PRODUKTIVITÄT", "VERİMLİLİK", "效率", "生産性", "생산성", "उत्पादकता", "ПРОДУКТИВНОСТЬ", "PRODUTIVIDADE"]
  }
];

const pageText = {
  ar: {
    eyebrow: "بوابتك إلى العالم الرقمي", title: "عالم واحد،", subtitle: "بلا حدود.",
    welcome: "مرحباً بك في WASEEM WORLD، منصة تجمع المعرفة والتكنولوجيا والإبداع في مكان واحد. اكتشف عوالم جديدة، وتعلّم، وابدأ رحلتك نحو المستقبل.",
    explore: "اكتشف العوالم", start: "ابدأ رحلتك", digital: "عوالم رقمية", languages: "لغة", possibilities: "فرص للاكتشاف",
    innovation: "الابتكار", future: "المستقبل", beyond: "اكتشف ما وراء الحدود",
    platform: "استكشف المنصة", discover: "اكتشف عوالمنا", intro: "ثمانية عوالم، ومجالات متنوعة، وتجربة رقمية واحدة.",
    search: "ابحث عن عالم أو مجال...", searchLabel: "ابحث في العوالم", clear: "مسح البحث",
    exploreWorld: "استكشف هذا العالم", noResults: "لم نعثر على نتائج", tryAgain: "جرّب البحث بكلمة أخرى.",
    manifesto: "المستقبل لا ينتظر،", manifesto2: "اصنع مكانك فيه.",
    manifestoDesc: "ابدأ من هنا، استكشف أفكاراً جديدة، واكتسب المعرفة التي تساعدك على التقدم.",
    startExplore: "ابدأ الاستكشاف", footer: "عالم واحد، بلا حدود."
  },
  en: {
    eyebrow: "YOUR DIGITAL GATEWAY", title: "One World,", subtitle: "Without Limits.",
    welcome: "Welcome to WASEEM WORLD, a platform bringing knowledge, technology and creativity together. Explore new worlds, learn and begin your journey into the future.",
    explore: "Explore Worlds", start: "Start Your Journey", digital: "DIGITAL WORLDS", languages: "LANGUAGES", possibilities: "POSSIBILITIES",
    innovation: "INNOVATION", future: "FUTURE", beyond: "BEYOND THE LIMITS",
    platform: "EXPLORE THE PLATFORM", discover: "Discover Our Worlds", intro: "Eight worlds, different fields and one digital experience.",
    search: "Search for a world or field...", searchLabel: "Search worlds", clear: "Clear search",
    exploreWorld: "EXPLORE THIS WORLD", noResults: "No results found", tryAgain: "Try searching with another keyword.",
    manifesto: "The future doesn't wait.", manifesto2: "Create your place in it.",
    manifestoDesc: "Start here. Explore new ideas and gain the knowledge that helps you move forward.",
    startExplore: "START EXPLORING", footer: "ONE WORLD, WITHOUT LIMITS."
  },
  fr: {
    eyebrow: "VOTRE PASSERELLE NUMÉRIQUE", title: "Un seul monde,", subtitle: "Sans limites.",
    welcome: "Bienvenue sur WASEEM WORLD, une plateforme qui réunit connaissances, technologie et créativité. Explorez de nouveaux univers et préparez votre avenir.",
    explore: "Explorer les univers", start: "Commencer votre parcours", digital: "MONDES NUMÉRIQUES", languages: "LANGUES", possibilities: "POSSIBILITÉS",
    innovation: "INNOVATION", future: "AVENIR", beyond: "AU-DELÀ DES LIMITES",
    platform: "EXPLORER LA PLATEFORME", discover: "Découvrez nos univers", intro: "Huit univers, des domaines variés et une expérience numérique.",
    search: "Rechercher un univers ou un domaine...", searchLabel: "Rechercher", clear: "Effacer",
    exploreWorld: "EXPLORER CET UNIVERS", noResults: "Aucun résultat", tryAgain: "Essayez un autre mot-clé.",
    manifesto: "L'avenir n'attend pas.", manifesto2: "Créez votre place.",
    manifestoDesc: "Explorez de nouvelles idées et développez vos connaissances pour avancer.",
    startExplore: "COMMENCER", footer: "UN MONDE, SANS LIMITES."
  },
  es: {
    eyebrow: "TU PUERTA AL MUNDO DIGITAL", title: "Un mundo,", subtitle: "Sin límites.",
    welcome: "Bienvenido a WASEEM WORLD, una plataforma que reúne conocimiento, tecnología y creatividad. Explora nuevos mundos y comienza tu camino hacia el futuro.",
    explore: "Explorar mundos", start: "Comienza tu viaje", digital: "MUNDOS DIGITALES", languages: "IDIOMAS", possibilities: "POSIBILIDADES",
    innovation: "INNOVACIÓN", future: "FUTURO", beyond: "MÁS ALLÁ DE LOS LÍMITES",
    platform: "EXPLORA LA PLATAFORMA", discover: "Descubre nuestros mundos", intro: "Ocho mundos, diferentes áreas y una experiencia digital.",
    search: "Busca un mundo o área...", searchLabel: "Buscar mundos", clear: "Borrar búsqueda",
    exploreWorld: "EXPLORAR ESTE MUNDO", noResults: "No hay resultados", tryAgain: "Prueba con otra palabra.",
    manifesto: "El futuro no espera.", manifesto2: "Crea tu lugar en él.",
    manifestoDesc: "Explora nuevas ideas y adquiere conocimientos para avanzar.",
    startExplore: "COMENZAR A EXPLORAR", footer: "UN MUNDO, SIN LÍMITES."
  },
  de: {
    eyebrow: "DEIN TOR ZUR DIGITALEN WELT", title: "Eine Welt,", subtitle: "Ohne Grenzen.",
    welcome: "Willkommen bei WASEEM WORLD, einer Plattform für Wissen, Technologie und Kreativität. Entdecke neue Welten und starte deine Reise in die Zukunft.",
    explore: "Welten entdecken", start: "Reise beginnen", digital: "DIGITALE WELTEN", languages: "SPRACHEN", possibilities: "MÖGLICHKEITEN",
    innovation: "INNOVATION", future: "ZUKUNFT", beyond: "JENSEITS DER GRENZEN",
    platform: "PLATTFORM ENTDECKEN", discover: "Entdecke unsere Welten", intro: "Acht Welten, verschiedene Bereiche und ein digitales Erlebnis.",
    search: "Suche nach einer Welt oder einem Bereich...", searchLabel: "Welten suchen", clear: "Suche löschen",
    exploreWorld: "DIESE WELT ENTDECKEN", noResults: "Keine Ergebnisse", tryAgain: "Versuche einen anderen Suchbegriff.",
    manifesto: "Die Zukunft wartet nicht.", manifesto2: "Gestalte deinen Platz darin.",
    manifestoDesc: "Entdecke neue Ideen und erweitere dein Wissen.",
    startExplore: "JETZT ENTDECKEN", footer: "EINE WELT, OHNE GRENZEN."
  },
  tr: {
    eyebrow: "DİJİTAL DÜNYAYA AÇILAN KAPIN", title: "Tek Dünya,", subtitle: "Sınırsız.",
    welcome: "WASEEM WORLD'e hoş geldin. Bilgi, teknoloji ve yaratıcılığı bir araya getiren platform. Yeni dünyaları keşfet ve geleceğe yolculuğuna başla.",
    explore: "Dünyaları keşfet", start: "Yolculuğa başla", digital: "DİJİTAL DÜNYALAR", languages: "DİLLER", possibilities: "OLASILIKLAR",
    innovation: "YENİLİK", future: "GELECEK", beyond: "SINIRLARIN ÖTESİNDE",
    platform: "PLATFORMU KEŞFET", discover: "Dünyalarımızı keşfet", intro: "Sekiz dünya, farklı alanlar ve tek bir dijital deneyim.",
    search: "Bir dünya veya alan ara...", searchLabel: "Dünyalarda ara", clear: "Aramayı temizle",
    exploreWorld: "BU DÜNYAYI KEŞFET", noResults: "Sonuç bulunamadı", tryAgain: "Başka bir kelime dene.",
    manifesto: "Gelecek beklemez.", manifesto2: "Onda kendi yerini yarat.",
    manifestoDesc: "Yeni fikirleri keşfet ve ilerlemene yardımcı olacak bilgiler edin.",
    startExplore: "KEŞFETMEYE BAŞLA", footer: "TEK DÜNYA, SINIRSIZ."
  },
  zh: {
    eyebrow: "通往数字世界的大门", title: "一个世界，", subtitle: "无限可能。",
    welcome: "欢迎来到 WASEEM WORLD，一个汇集知识、科技与创意的平台。探索新世界，学习并开启未来之旅。",
    explore: "探索世界", start: "开启旅程", digital: "数字世界", languages: "语言", possibilities: "无限可能",
    innovation: "创新", future: "未来", beyond: "超越界限",
    platform: "探索平台", discover: "发现我们的世界", intro: "八个世界，多元领域，一种数字体验。",
    search: "搜索世界或领域...", searchLabel: "搜索世界", clear: "清除搜索",
    exploreWorld: "探索这个世界", noResults: "没有找到结果", tryAgain: "请尝试其他关键词。",
    manifesto: "未来不会等待。", manifesto2: "创造属于你的位置。",
    manifestoDesc: "从这里开始，探索新想法，获取帮助你前进的知识。",
    startExplore: "开始探索", footer: "一个世界，无限可能。"
  },
  ja: {
    eyebrow: "デジタル世界への入り口", title: "ひとつの世界、", subtitle: "無限の可能性。",
    welcome: "WASEEM WORLDへようこそ。知識、テクノロジー、創造性をひとつにするプラットフォームです。新しい世界を発見し、未来への旅を始めましょう。",
    explore: "世界を探す", start: "旅を始める", digital: "デジタルワールド", languages: "言語", possibilities: "可能性",
    innovation: "イノベーション", future: "未来", beyond: "限界を超えて",
    platform: "プラットフォームを探す", discover: "世界を発見する", intro: "8つの世界、多様な分野、ひとつのデジタル体験。",
    search: "世界や分野を検索...", searchLabel: "世界を検索", clear: "検索をクリア",
    exploreWorld: "この世界を探検", noResults: "結果が見つかりません", tryAgain: "別のキーワードを試してください。",
    manifesto: "未来は待ってくれない。", manifesto2: "自分の居場所を創ろう。",
    manifestoDesc: "新しいアイデアを探し、前進するための知識を身につけましょう。",
    startExplore: "探検を始める", footer: "ひとつの世界、無限の可能性。"
  },
  ko: {
    eyebrow: "디지털 세계로 가는 관문", title: "하나의 세계,", subtitle: "무한한 가능성.",
    welcome: "WASEEM WORLD에 오신 것을 환영합니다. 지식, 기술, 창의성을 한곳에 모은 플랫폼입니다. 새로운 세계를 탐험하고 미래를 향한 여정을 시작하세요.",
    explore: "세계 탐험하기", start: "여정 시작하기", digital: "디지털 세계", languages: "언어", possibilities: "가능성",
    innovation: "혁신", future: "미래", beyond: "한계를 넘어",
    platform: "플랫폼 탐색", discover: "우리의 세계 발견하기", intro: "여덟 개의 세계, 다양한 분야, 하나의 디지털 경험.",
    search: "세계 또는 분야 검색...", searchLabel: "세계 검색", clear: "검색 지우기",
    exploreWorld: "이 세계 탐험하기", noResults: "결과를 찾을 수 없습니다", tryAgain: "다른 키워드로 검색해 보세요.",
    manifesto: "미래는 기다려 주지 않습니다.", manifesto2: "당신의 자리를 만드세요.",
    manifestoDesc: "새로운 아이디어를 탐색하고 앞으로 나아갈 지식을 얻으세요.",
    startExplore: "탐험 시작하기", footer: "하나의 세계, 무한한 가능성."
  },
  hi: {
    eyebrow: "डिजिटल दुनिया का प्रवेश द्वार", title: "एक दुनिया,", subtitle: "असीमित संभावनाएँ।",
    welcome: "WASEEM WORLD में आपका स्वागत है। ज्ञान, तकनीक और रचनात्मकता को एक साथ लाने वाला मंच। नई दुनिया खोजें और भविष्य की यात्रा शुरू करें।",
    explore: "दुनिया खोजें", start: "अपनी यात्रा शुरू करें", digital: "डिजिटल दुनिया", languages: "भाषाएँ", possibilities: "संभावनाएँ",
    innovation: "नवाचार", future: "भविष्य", beyond: "सीमाओं से परे",
    platform: "प्लेटफ़ॉर्म देखें", discover: "हमारी दुनिया खोजें", intro: "आठ दुनिया, विभिन्न क्षेत्र और एक डिजिटल अनुभव।",
    search: "दुनिया या क्षेत्र खोजें...", searchLabel: "दुनिया खोजें", clear: "खोज साफ़ करें",
    exploreWorld: "इस दुनिया को खोजें", noResults: "कोई परिणाम नहीं मिला", tryAgain: "किसी दूसरे शब्द से खोजें।",
    manifesto: "भविष्य इंतज़ार नहीं करता।", manifesto2: "उसमें अपनी जगह बनाएँ।",
    manifestoDesc: "नए विचार खोजें और आगे बढ़ने के लिए ज्ञान प्राप्त करें।",
    startExplore: "खोज शुरू करें", footer: "एक दुनिया, असीमित संभावनाएँ।"
  },
  ru: {
    eyebrow: "ТВОИ ВОРОТА В ЦИФРОВОЙ МИР", title: "Один мир,", subtitle: "Без границ.",
    welcome: "Добро пожаловать в WASEEM WORLD — платформу, объединяющую знания, технологии и творчество. Открывайте новые миры и начинайте путь в будущее.",
    explore: "Исследовать миры", start: "Начать путешествие", digital: "ЦИФРОВЫЕ МИРЫ", languages: "ЯЗЫКИ", possibilities: "ВОЗМОЖНОСТИ",
    innovation: "ИННОВАЦИИ", future: "БУДУЩЕЕ", beyond: "ЗА ГРАНИЦАМИ",
    platform: "ИССЛЕДОВАТЬ ПЛАТФОРМУ", discover: "Откройте наши миры", intro: "Восемь миров, разные направления и единый цифровой опыт.",
    search: "Найти мир или направление...", searchLabel: "Поиск миров", clear: "Очистить поиск",
    exploreWorld: "ИССЛЕДОВАТЬ ЭТОТ МИР", noResults: "Ничего не найдено", tryAgain: "Попробуйте другое ключевое слово.",
    manifesto: "Будущее не ждёт.", manifesto2: "Создайте в нём своё место.",
    manifestoDesc: "Открывайте новые идеи и получайте знания для движения вперёд.",
    startExplore: "НАЧАТЬ ИССЛЕДОВАНИЕ", footer: "ОДИН МИР, БЕЗ ГРАНИЦ."
  },
  pt: {
    eyebrow: "SUA PORTA PARA O MUNDO DIGITAL", title: "Um mundo,", subtitle: "Sem limites.",
    welcome: "Bem-vindo ao WASEEM WORLD, uma plataforma que reúne conhecimento, tecnologia e criatividade. Explore novos mundos e comece sua jornada rumo ao futuro.",
    explore: "Explorar mundos", start: "Comece sua jornada", digital: "MUNDOS DIGITAIS", languages: "IDIOMAS", possibilities: "POSSIBILIDADES",
    innovation: "INOVAÇÃO", future: "FUTURO", beyond: "ALÉM DOS LIMITES",
    platform: "EXPLORE A PLATAFORMA", discover: "Descubra nossos mundos", intro: "Oito mundos, diferentes áreas e uma experiência digital.",
    search: "Pesquise um mundo ou área...", searchLabel: "Pesquisar mundos", clear: "Limpar pesquisa",
    exploreWorld: "EXPLORAR ESTE MUNDO", noResults: "Nenhum resultado encontrado", tryAgain: "Tente outra palavra-chave.",
    manifesto: "O futuro não espera.", manifesto2: "Crie seu lugar nele.",
    manifestoDesc: "Explore novas ideias e adquira conhecimentos para seguir em frente.",
    startExplore: "COMEÇAR A EXPLORAR", footer: "UM MUNDO, SEM LIMITES."
  }
};

export default function HomePage() {
  const { language, currentLanguage } = useLanguage();
  const [search, setSearch] = useState("");

  const langIndex = {
    ar: 0, en: 1, fr: 2, es: 3, de: 4, tr: 5,
    zh: 6, ja: 7, ko: 8, hi: 9, ru: 10, pt: 11
  }[language] ?? 0;

  const text = pageText[language] || pageText.ar;
  const isArabic = language === "ar";

  const filteredWorlds = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return worlds;

    return worlds.filter((world) =>
      [
        world.names[langIndex],
        world.names[1],
        world.descriptions[langIndex],
        world.tags[langIndex]
      ].some((item) => item.toLowerCase().includes(value))
    );
  }, [search, langIndex]);

  return (
    <main className="ww-home" dir={currentLanguage?.dir || (isArabic ? "rtl" : "ltr")}>
      <Navbar />

      <section className="ww-hero">
        <div className="ww-hero-grid">
          <div className="ww-hero-copy">
            <div className="ww-eyebrow">
              <span className="ww-live-dot" />
              {text.eyebrow}
            </div>

            <h1>
              {text.title}
              <span>{text.subtitle}</span>
            </h1>

            <p>{text.welcome}</p>

            <div className="ww-hero-buttons">
              <a href="#worlds" className="ww-primary-button">
                {text.explore} <span>↗</span>
              </a>

              <Link to="/world/ai" className="ww-secondary-button">
                {text.start} <span>→</span>
              </Link>
            </div>

            <div className="ww-hero-stats">
              <div><strong>08</strong><span>{text.digital}</span></div>
              <i />
              <div><strong>12</strong><span>{text.languages}</span></div>
              <i />
              <div><strong>∞</strong><span>{text.possibilities}</span></div>
            </div>
          </div>

          <div className="ww-hero-art">
            <div className="ww-orbit ww-orbit-one" />
            <div className="ww-orbit ww-orbit-two" />
            <div className="ww-orbit ww-orbit-three" />
            <div className="ww-orbit-core"><span>W</span><small>WORLD</small></div>
            <div className="ww-orbit-label ww-label-top">{text.innovation}</div>
            <div className="ww-orbit-label ww-label-right">AI</div>
            <div className="ww-orbit-label ww-label-bottom">{text.future}</div>
            <div className="ww-orbit-label ww-label-left">CYBER</div>
            <div className="ww-art-caption">EXPLORE • LEARN • CREATE</div>
          </div>
        </div>

        <div className="ww-hero-bottom">
          <span>WASEEM WORLD — YOUR WORLD</span>
          <div className="ww-scroll-line" />
          <span>{text.beyond}</span>
        </div>
      </section>

      <section className="ww-worlds-section" id="worlds">
        <div className="ww-section-heading">
          <div>
            <div className="ww-eyebrow"><span className="ww-live-dot" />{text.platform}</div>
            <h2>{text.discover}</h2>
            <p>{text.intro}</p>
          </div>
          <div className="ww-world-total"><strong>08</strong><span>WORLDS</span></div>
        </div>

        <div className="ww-search-wrap">
          <span>⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={text.search}
            aria-label={text.searchLabel}
          />
          {search && (
            <button type="button" onClick={() => setSearch("")} aria-label={text.clear}>×</button>
          )}
          <kbd>SEARCH</kbd>
        </div>

        <div className="ww-world-grid">
          {filteredWorlds.map((world) => {
            const originalIndex = worlds.findIndex((item) => item.id === world.id);
            return (
              <Link to={`/world/${world.id}`} className="ww-world-card" key={world.id}>
                <div className="ww-card-top">
                  <span className="ww-card-number">WORLD / {String(originalIndex + 1).padStart(2, "0")}</span>
                  <span className="ww-card-icon">{world.icon}</span>
                </div>
                <div className="ww-card-content">
                  <span className="ww-card-tag">{world.tags[langIndex]}</span>
                  <h3>{world.names[langIndex]}</h3>
                  <span className="ww-card-en">{world.names[1]}</span>
                  <p>{world.descriptions[langIndex]}</p>
                </div>
                <div className="ww-card-bottom">
                  <span>{text.exploreWorld}</span>
                  <span className="ww-card-arrow">{isArabic ? "←" : "→"}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredWorlds.length === 0 && (
          <div className="ww-empty">
            <h3>{text.noResults}</h3>
            <p>{text.tryAgain}</p>
          </div>
        )}
      </section>

      {/* HYBRID CARS ACADEMY */}
      <section className="ww-hybrid-promo" dir="rtl">
        <div className="ww-hybrid-image">
          <img
            src="https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=85"
            alt="سيارة هايبرد"
            loading="lazy"
          />
          <div className="ww-hybrid-image-overlay" />
          <span className="ww-hybrid-image-label">HYBRID TECHNOLOGY</span>
        </div>

        <div className="ww-hybrid-content">
          <span className="ww-hybrid-kicker">SPECIALIZED LEARNING ACADEMY</span>
          <span className="ww-hybrid-symbol">H</span>
          <h2>HYBRID CARS <span>ACADEMY</span></h2>
          <h3>أكاديمية عالم السيارات الهجينة</h3>
          <p>
            اكتشف عالم سيارات الهايبرد من الصفر. تعلّم المحركات والبطاريات
            والأنظمة الكهربائية والميكانيكية والصيانة والتشخيص، من خلال
            دروس تعليمية مصوّرة وشروحات عربية ومصطلحات فنية إنجليزية.
          </p>

          <div className="ww-hybrid-features">
            <span>⚙️ شرح مكونات السيارة</span>
            <span>⚡ أنظمة الهايبرد</span>
            <span>🔧 الصيانة والتشخيص</span>
            <span>📚 دروس واختبارات</span>
          </div>

          <Link to="/hybrid-academy" className="ww-hybrid-button">
            اكتشف الأكاديمية <span>←</span>
          </Link>

          <small>AN EDUCATIONAL JOURNEY INTO HYBRID VEHICLES</small>
        </div>
      </section>

      <section className="ww-manifesto">
        <div className="ww-eyebrow"><span className="ww-live-dot" />WASEEM WORLD</div>
        <h2>{text.manifesto}<span> {text.manifesto2}</span></h2>
        <p>{text.manifestoDesc}</p>
        <a href="#worlds">{text.startExplore} ↗</a>
      </section>

      <footer className="ww-footer">
        <span>© {new Date().getFullYear()} WASEEM WORLD. ALL RIGHTS RESERVED.</span>
        <span>{text.footer}</span>
      </footer>
    </main>
  );
}
