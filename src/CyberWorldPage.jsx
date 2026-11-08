
import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import {
  cyberCategories,
  cyberResources,
} from "./data/cyberResources";

const tracks = [
  { icon: "🌐", title: "Network Security", ar: "أمن الشبكات", desc: "الشبكات والبروتوكولات وتحليل حركة البيانات", category: "network" },
  { icon: "🐧", title: "Linux & Systems", ar: "لينكس والأنظمة", desc: "أنظمة التشغيل وإدارة بيئات العمل", category: "linux" },
  { icon: "🔎", title: "OSINT Intelligence", ar: "الاستخبارات مفتوحة المصدر", desc: "البحث والتحقق وتحليل المعلومات العامة", category: "osint" },
  { icon: "🛡️", title: "Blue Team & SOC", ar: "الدفاع ومراكز العمليات", desc: "مراقبة الأنظمة وتحليل التنبيهات الأمنية", category: "blue" },
  { icon: "🧩", title: "Web Security", ar: "أمن تطبيقات الويب", desc: "فهم الثغرات وممارسات تطوير التطبيقات الآمنة", category: "web" },
  { icon: "💽", title: "Digital Forensics", ar: "التحليل الجنائي الرقمي", desc: "تحليل الأدلة الرقمية والاستجابة للحوادث", category: "forensics" },
  { icon: "🔐", title: "Privacy & Protection", ar: "الخصوصية والحماية", desc: "حماية الحسابات والبيانات والهوية الرقمية", category: "privacy" },
  { icon: "🏆", title: "Certifications", ar: "الشهادات المهنية", desc: "شهادات ومسارات مهنية معروفة", category: "certifications" },
];

const featured = [
  { name: "TryHackMe", type: "TRAINING PLATFORM", desc: "تعلم تفاعلي من البداية مع مختبرات تعليمية.", url: "https://tryhackme.com", tag: "مجاني ومدفوع" },
  { name: "Cisco Skills for All", type: "LEARNING", desc: "مسارات مجانية في الشبكات والأمن السيبراني.", url: "https://skillsforall.com", tag: "مجاني" },
  { name: "PortSwigger Academy", type: "WEB SECURITY", desc: "مكتبة تعليمية ومختبرات مجانية لأمن الويب.", url: "https://portswigger.net/web-security", tag: "مجاني" },
  { name: "Hack The Box Academy", type: "PRACTICAL LEARNING", desc: "مسارات تدريبية منظمة وتطبيق عملي.", url: "https://academy.hackthebox.com", tag: "مجاني ومدفوع" },
];

const careers = [
  {
    icon: "🛡️",
    title: "SOC Analyst",
    ar: "محلل مركز العمليات الأمنية",
    desc: "مراقبة التنبيهات وتحليل السجلات والاستجابة للحوادث الأمنية.",
    skills: ["Networking", "Linux", "SIEM", "Incident Response"],
    certs: ["Security+", "ISC2 CC"],
    level: "ENTRY LEVEL",
  },
  {
    icon: "🌐",
    title: "Network Security",
    ar: "أمن الشبكات",
    desc: "فهم الشبكات ومراقبتها وحماية أجهزتها وخدماتها.",
    skills: ["TCP/IP", "Routing", "Firewalls", "Wireshark"],
    certs: ["CCNA", "Security+"],
    level: "FOUNDATION",
  },
  {
    icon: "☁️",
    title: "Cloud Security",
    ar: "أمن الحوسبة السحابية",
    desc: "حماية الخدمات السحابية والهويات والبيانات والبنية التحتية.",
    skills: ["AWS", "Azure", "IAM", "Cloud Monitoring"],
    certs: ["AWS Security", "AZ-500"],
    level: "INTERMEDIATE",
  },
  {
    icon: "💻",
    title: "Application Security",
    ar: "أمن التطبيقات",
    desc: "فهم مخاطر التطبيقات وبناء برمجيات أكثر أماناً.",
    skills: ["Programming", "OWASP", "Secure Coding", "Testing"],
    certs: ["Security+", "CSSLP"],
    level: "INTERMEDIATE",
  },
  {
    icon: "🔬",
    title: "Digital Forensics",
    ar: "التحليل الجنائي الرقمي",
    desc: "تحليل الأدلة الرقمية وفهم الحوادث وحفظ المعلومات.",
    skills: ["Windows", "Linux", "Logs", "Forensics"],
    certs: ["GCFE", "CHFI"],
    level: "SPECIALIZATION",
  },
  {
    icon: "🔐",
    title: "Security Engineer",
    ar: "مهندس الأمن السيبراني",
    desc: "تصميم أنظمة الحماية وإدارة أدوات الدفاع والسياسات الأمنية.",
    skills: ["Networking", "Linux", "Automation", "Security Architecture"],
    certs: ["Security+", "CCSP"],
    level: "ADVANCED",
  },
];

export default function CyberWorldPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [pricing, setPricing] = useState("all");
  const [level, setLevel] = useState("all");

  const filtered = useMemo(() => {
    return cyberResources.filter((item) => {
      const term = search.trim().toLowerCase();

      const matchesSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.level.toLowerCase().includes(term);

      const matchesCategory =
        category === "all" || item.category === category;

      const matchesPricing =
        pricing === "all" || item.pricing === pricing;

      const matchesLevel =
        level === "all" || item.level.includes(level);

      return matchesSearch && matchesCategory && matchesPricing && matchesLevel;
    });
  }, [search, category, pricing, level]);

  const countFree = cyberResources.filter((x) => x.pricing === "free").length;
  const countFreemium = cyberResources.filter((x) => x.pricing === "freemium").length;
  const countPaid = cyberResources.filter((x) => x.pricing === "paid").length;

  const showCategory = (id) => {
    setCategory(id);
    document.getElementById("cyber-directory")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className="cyber-page">
      <Navbar />

      {/* HERO */}
      <section className="cyber-hero cyber-hero-pro">
        <div className="cyber-hero-content">
          <div className="cyber-eyebrow">
            <span className="cyber-live-dot"></span>
            WASEEM WORLD / WORLD 02
          </div>

          <div className="cyber-hero-kicker">THE DIGITAL DEFENSE UNIVERSE</div>

          <h1>
            CYBER
            <br />
            <span>SECURITY</span>
            <br />
            WORLD<span className="cyber-title-dot">.</span>
          </h1>

          <p>
            اكتشف عالم الأمن السيبراني في مكان واحد.
            تعلم، استكشف، تدرب، واكتشف أهم المنصات
            والأدوات والمراجع من جميع أنحاء العالم.
          </p>

          <div className="cyber-hero-actions">
            <a href="#cyber-directory" className="cyber-main-button">
              استكشف المكتبة <span>↗</span>
            </a>
            <a href="#cyber-tracks" className="cyber-secondary-button">
              اكتشف المجالات
            </a>
          </div>

          <div className="cyber-hero-mini">
            <span>LEARN</span>
            <i>✦</i>
            <span>EXPLORE</span>
            <i>✦</i>
            <span>PROTECT</span>
          </div>
        </div>

        <div className="cyber-hero-visual">
          <div className="cyber-visual-grid"></div>
          <div className="cyber-orbit orbit-one"></div>
          <div className="cyber-orbit orbit-two"></div>
          <div className="cyber-orbit orbit-three"></div>
          <div className="cyber-shield">
            <span>W</span>
            <small>CYBER</small>
          </div>
          <div className="cyber-floating-tag tag-top">SYSTEM ONLINE</div>
          <div className="cyber-floating-tag tag-bottom">DIGITAL DEFENSE</div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="cyber-stats cyber-stats-pro">
        <div><strong>{cyberResources.length}+</strong><span>منصة وأداة ومصدر</span></div>
        <div><strong>{countFree}+</strong><span>مصادر مجانية</span></div>
        <div><strong>{countFreemium}+</strong><span>مجاني ومدفوع</span></div>
        <div><strong>{countPaid}+</strong><span>مصادر مدفوعة</span></div>
      </section>

      {/* INTRO */}
      <section className="cyber-intro">
        <div>
          <span className="cyber-section-label">ONE WORLD. MANY SPECIALTIES.</span>
          <h2>عالم كامل.<br /><span>مجال وراء مجال.</span></h2>
        </div>
        <p>
          سواء كنت تبدأ رحلتك من الصفر أو تبحث عن أدوات
          ومراجع متخصصة، ستجد هنا نقطة انطلاق منظمة
          لاكتشاف المجالات المختلفة في الأمن السيبراني.
        </p>
      </section>

      {/* TRACKS */}
      <section className="cyber-paths cyber-tracks-pro" id="cyber-tracks">
        <div className="cyber-section-heading">
          <span>01 / EXPLORE SPECIALTIES</span>
          <h2>اكتشف تخصصات العالم السيبراني</h2>
          <p>كل تخصص له عالمه الخاص، ومصادره وأدواته ومساراته التعليمية.</p>
        </div>

        <div className="cyber-track-grid">
          {tracks.map((track, index) => (
            <button
              key={track.category}
              className="cyber-track-card"
              onClick={() => showCategory(track.category)}
            >
              <div className="cyber-track-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span className="cyber-track-arrow">↗</span>
              </div>
              <div className="cyber-track-icon">{track.icon}</div>
              <span className="cyber-track-en">{track.title}</span>
              <h3>{track.ar}</h3>
              <p>{track.desc}</p>
              <div className="cyber-track-bottom">استكشف التخصص <span>→</span></div>
            </button>
          ))}
        </div>
      </section>

      {/* LEARNING PATH */}
      <section className="cyber-learning-section">
        <div className="cyber-section-heading">
          <span>02 / YOUR LEARNING JOURNEY</span>
          <h2>ابدأ من الصفر وتقدم بثبات</h2>
          <p>مسار مقترح لبناء المعرفة قبل الانتقال إلى التخصصات المتقدمة.</p>
        </div>

        <div className="cyber-journey">
          <div className="cyber-journey-step">
            <span>01</span>
            <div><h3>Foundation</h3><p>أساسيات الحاسوب والإنترنت والشبكات.</p></div>
            <b>المستوى التأسيسي</b>
          </div>
          <div className="cyber-journey-step">
            <span>02</span>
            <div><h3>Systems & Networking</h3><p>Linux وأنظمة التشغيل ومبادئ الشبكات.</p></div>
            <b>المستوى الأساسي</b>
          </div>
          <div className="cyber-journey-step">
            <span>03</span>
            <div><h3>Security Fundamentals</h3><p>مفاهيم الحماية وإدارة المخاطر والخصوصية.</p></div>
            <b>المستوى المتوسط</b>
          </div>
          <div className="cyber-journey-step">
            <span>04</span>
            <div><h3>Choose Your Specialty</h3><p>اختر تخصصك وابدأ التدريب في بيئات قانونية.</p></div>
            <b>مرحلة التخصص</b>
          </div>
        </div>
      </section>

      {/* CAREER ROADMAP */}
      <section className="cyber-career-section" id="cyber-careers">
        <div className="cyber-section-heading">
          <span>03 / CYBER CAREER ROADMAP</span>
          <h2>اكتشف مستقبلك المهني</h2>
          <p>تعرّف على التخصصات والمهارات والشهادات المرتبطة بكل مسار.</p>
        </div>

        <div className="cyber-career-grid">
          {careers.map((career, index) => (
            <article className="cyber-career-card" key={career.title}>
              <div className="cyber-career-top">
                <span>{career.icon}</span>
                <small>CAREER / 0{index + 1}</small>
              </div>
              <span className="cyber-career-level">{career.level}</span>
              <h3>{career.title}</h3>
              <h4>{career.ar}</h4>
              <p>{career.desc}</p>

              <div className="cyber-career-info">
                <strong>CORE SKILLS</strong>
                <div>
                  {career.skills.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </div>

              <div className="cyber-career-info">
                <strong>CERTIFICATIONS</strong>
                <div>
                  {career.certs.map((cert) => <span key={cert}>{cert}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FEATURED PLATFORMS */}
      <section className="cyber-featured-section">
        <div className="cyber-section-heading">
          <span>04 / FEATURED PLATFORMS</span>
          <h2>منصات تستحق أن تبدأ منها</h2>
          <p>مجموعة مختارة من المنصات التعليمية والمختبرات المعروفة.</p>
        </div>

        <div className="cyber-featured-grid">
          {featured.map((item, index) => (
            <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className="cyber-featured-card">
              <div className="cyber-featured-number">FEATURED / 0{index + 1}<span>↗</span></div>
              <span className="cyber-featured-type">{item.type}</span>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <div className="cyber-featured-bottom">
                <span>{item.tag}</span>
                <strong>زيارة المنصة ↗</strong>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* DIRECTORY */}
      <section className="cyber-resources cyber-directory-pro" id="cyber-directory">
        <div className="cyber-section-heading">
          <span>05 / THE GLOBAL DIRECTORY</span>
          <h2>مكتبة الأمن السيبراني الشاملة</h2>
          <p>استكشف المنصات والأدوات والمراجع والشهادات واستخدم البحث والتصنيفات.</p>
        </div>

        <div className="cyber-library-stats">
          <div><span>ALL RESOURCES</span><strong>{cyberResources.length}</strong></div>
          <div><span>FREE</span><strong>{countFree}</strong></div>
          <div><span>FREEMIUM</span><strong>{countFreemium}</strong></div>
          <div><span>PAID</span><strong>{countPaid}</strong></div>
        </div>

        <div className="cyber-directory-controls">
          <div className="cyber-search-wrap">
            <span>⌕</span>
            <input
              type="search"
              placeholder="ابحث عن أداة، منصة، شهادة أو مجال..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <kbd>SEARCH</kbd>
          </div>

          <div className="cyber-filter-row">
            <div className="cyber-filter-group">
              <label>السعر</label>
              <select value={pricing} onChange={(e) => setPricing(e.target.value)}>
                <option value="all">كل الخطط</option>
                <option value="free">مجاني</option>
                <option value="freemium">مجاني ومدفوع</option>
                <option value="paid">مدفوع</option>
              </select>
            </div>

            <div className="cyber-filter-group">
              <label>المستوى</label>
              <select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="all">كل المستويات</option>
                <option value="مبتدئ">مبتدئ</option>
                <option value="متوسط">متوسط</option>
                <option value="متقدم">متقدم</option>
              </select>
            </div>

            <button className="cyber-reset-button" onClick={() => {
              setSearch("");
              setCategory("all");
              setPricing("all");
              setLevel("all");
            }}>
              إعادة ضبط ↺
            </button>
          </div>

          <div className="cyber-category-tabs">
            {cyberCategories.map((item) => (
              <button
                key={item.id}
                className={category === item.id ? "active" : ""}
                onClick={() => setCategory(item.id)}
              >
                <span>{item.icon}</span> {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="cyber-directory-result">
          <div><span className="cyber-live-dot"></span> DIRECTORY RESULTS</div>
          <strong>{filtered.length} مورد متاح</strong>
        </div>

        <div className="cyber-resource-grid cyber-resource-grid-pro">
          {filtered.map((item) => (
            <article className="cyber-resource-card cyber-resource-card-pro" key={item.id}>
              <div className="cyber-resource-top">
                <span className={`pricing-tag ${item.pricing}`}>{item.pricingLabel}</span>
                <span className="cyber-resource-number">#{String(item.id).padStart(2, "0")}</span>
              </div>
              <div className="cyber-resource-category">
                {cyberCategories.find((c) => c.id === item.category)?.name}
              </div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="cyber-resource-meta"><span>المستوى: {item.level}</span></div>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="cyber-resource-link">
                افتح المصدر <span>↗</span>
              </a>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="cyber-empty">
            <span>⌕</span>
            <h3>لا توجد نتائج مطابقة</h3>
            <p>غيّر كلمة البحث أو خيارات التصفية وحاول مرة أخرى.</p>
            <button onClick={() => {
              setSearch("");
              setCategory("all");
              setPricing("all");
              setLevel("all");
            }}>
              عرض جميع الموارد
            </button>
          </div>
        )}
      </section>

      {/* KNOWLEDGE REFERENCES */}
      <section className="cyber-knowledge-section">
        <div>
          <span>06 / KNOWLEDGE & STANDARDS</span>
          <h2>المعرفة والمعايير العالمية</h2>
          <p>مراجع موثوقة تساعدك على فهم الأمن الرقمي وممارسات الحماية.</p>
        </div>
        <div className="cyber-knowledge-links">
          <a href="https://www.nist.gov/cyberframework" target="_blank" rel="noreferrer">
            <span>NIST</span><strong>Cybersecurity Framework ↗</strong>
          </a>
          <a href="https://www.cisa.gov" target="_blank" rel="noreferrer">
            <span>CISA</span><strong>Cybersecurity Resources ↗</strong>
          </a>
          <a href="https://attack.mitre.org" target="_blank" rel="noreferrer">
            <span>MITRE</span><strong>ATT&CK Knowledge Base ↗</strong>
          </a>
          <a href="https://owasp.org" target="_blank" rel="noreferrer">
            <span>OWASP</span><strong>Application Security ↗</strong>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <section className="cyber-footer-banner cyber-footer-pro">
        <span>WASEEM WORLD / CYBER SECURITY</span>
        <h2>Knowledge is your first line of defense.</h2>
        <p>تعلم بمسؤولية. تدرب بأمان. ابنِ مستقبلك الرقمي.</p>
        <a href="#cyber-directory">استكشف المكتبة من جديد ↑</a>
      </section>
    </main>
  );
}
