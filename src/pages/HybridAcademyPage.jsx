
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { hybridModules as detailedModules } from "../data/hybridLessons";
import "./HybridAcademyPage.css";

const moduleCatalog = [
  {
    id: 1,
    number: "01",
    title: "مقدمة إلى سيارات الهايبرد",
    subtitle: "HYBRID FUNDAMENTALS",
    icon: "🚘",
    description: "افهم فكرة السيارات الهجينة وكيف تجمع بين محرك البنزين والمحرك الكهربائي.",
    lessonTitles: [
      "ما هي سيارة الهايبرد؟",
      "كيف تعمل السيارة الهجينة؟",
      "الفرق بين البنزين والكهرباء والهايبرد",
      "تاريخ تطور السيارات الهجينة",
      "مميزات وقيود نظام الهايبرد",
    ],
  },
  {
    id: 2,
    number: "02",
    title: "أنواع أنظمة الهايبرد",
    subtitle: "HYBRID SYSTEMS",
    icon: "⚡",
    description: "تعرّف على الأنظمة المختلفة وطريقة عمل كل نوع.",
    lessonTitles: [
      "نظام HEV",
      "نظام PHEV",
      "نظام MHEV",
      "الفرق بين الأنظمة الثلاثة",
      "كيف تختار النظام المناسب؟",
    ],
  },
  {
    id: 3,
    number: "03",
    title: "مكونات سيارة الهايبرد",
    subtitle: "VEHICLE COMPONENTS",
    icon: "⚙️",
    description: "تعرف على أجزاء السيارة ووظيفة كل قطعة واسمها بالعربية والإنجليزية.",
    lessonTitles: [
      "محرك الاحتراق الداخلي",
      "المحرك الكهربائي",
      "بطارية الجهد العالي",
      "الإنفرتر",
      "وحدات التحكم ECU",
      "ناقل الحركة",
      "محول التيار DC-DC",
    ],
  },
  {
    id: 4,
    number: "04",
    title: "أنظمة السيارة بالتفصيل",
    subtitle: "VEHICLE SYSTEMS",
    icon: "🔧",
    description: "استكشف الأنظمة الميكانيكية والكهربائية والإلكترونية في السيارة.",
    lessonTitles: [
      "نظام التبريد",
      "نظام الفرامل واسترجاع الطاقة",
      "نظام التكييف",
      "نظام التوجيه والتعليق",
      "نظام الوقود",
      "الحساسات ووحدات التحكم",
    ],
  },
  {
    id: 5,
    number: "05",
    title: "الصيانة والتشخيص",
    subtitle: "MAINTENANCE & DIAGNOSTICS",
    icon: "🛠️",
    description: "تعلم أساسيات الصيانة وقراءة بيانات السيارة وفهم رموز الأعطال.",
    lessonTitles: [
      "الصيانة الدورية",
      "أجهزة فحص السيارات OBD",
      "قراءة رموز الأعطال DTC",
      "فهم بيانات السيارة الحية",
      "تشخيص الأعطال نظرياً",
      "متى تحتاج إلى فني مختص؟",
    ],
  },
  {
    id: 6,
    number: "06",
    title: "الشركات والموديلات",
    subtitle: "BRANDS & MODELS",
    icon: "🏁",
    description: "اكتشف تقنيات الهايبرد لدى أشهر الشركات المصنعة.",
    lessonTitles: [
      "Toyota Hybrid",
      "Lexus Hybrid",
      "Honda Hybrid",
      "Hyundai Hybrid",
      "Kia Hybrid",
      "مقارنة الأنظمة بين الشركات",
    ],
  },
  {
    id: 7,
    number: "07",
    title: "التطبيق والفهم العملي",
    subtitle: "PRACTICAL KNOWLEDGE",
    icon: "📘",
    description: "اربط المعلومات النظرية بأمثلة ورسومات توضيحية لأجزاء السيارة.",
    lessonTitles: [
      "قراءة مخطط مكونات السيارة",
      "التعرف على أجزاء المحرك",
      "فهم مسارات الطاقة",
      "تحليل حالات تشغيل السيارة",
      "دراسة أمثلة من سيارات حقيقية",
    ],
  },
  {
    id: 8,
    number: "08",
    title: "الاختبارات والتقييم",
    subtitle: "TESTS & ASSESSMENT",
    icon: "🎓",
    description: "اختبر فهمك بعد كل وحدة وراجع المعلومات التي تعلمتها.",
    lessonTitles: [
      "اختبار أساسيات الهايبرد",
      "اختبار الأنظمة والمكونات",
      "اختبار أنظمة السيارة",
      "اختبار الصيانة والتشخيص",
      "الاختبار النهائي",
    ],
  },
];

const STORAGE_KEY = "waseem-world-hybrid-progress";

function readProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { completed: [], scores: {} };
  } catch {
    return { completed: [], scores: {} };
  }
}

export default function HybridAcademyPage() {
  const [activeModule, setActiveModule] = useState(1);
  const [activeLessonId, setActiveLessonId] = useState(
    detailedModules[0]?.lessons?.[0]?.id || null
  );
  const [progress, setProgress] = useState(readProgress);
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const currentModule = moduleCatalog.find(
    (module) => module.id === activeModule
  );

  const detailedModule = detailedModules.find(
    (module) => module.id === activeModule
  );

  const currentLesson = useMemo(() => {
    return detailedModule?.lessons?.find(
      (lesson) => lesson.id === activeLessonId
    );
  }, [detailedModule, activeLessonId]);

  const allDetailedLessons = detailedModules.flatMap(
    (module) => module.lessons || []
  );

  const completedCount = progress.completed.length;
  const totalDetailedLessons = allDetailedLessons.length;
  const progressPercent = totalDetailedLessons
    ? Math.round((completedCount / totalDetailedLessons) * 100)
    : 0;

  const selectModule = (moduleId) => {
    setActiveModule(moduleId);
    setAnswers({});
    setQuizSubmitted(false);

    const module = detailedModules.find((item) => item.id === moduleId);
    setActiveLessonId(module?.lessons?.[0]?.id || null);
  };

  const selectLesson = (lessonId) => {
    setActiveLessonId(lessonId);
    setAnswers({});
    setQuizSubmitted(false);
  };

  const markCompleted = () => {
    if (!currentLesson) return;

    setProgress((previous) => ({
      ...previous,
      completed: previous.completed.includes(currentLesson.id)
        ? previous.completed
        : [...previous.completed, currentLesson.id],
    }));
  };

  const submitQuiz = () => {
    if (!currentLesson?.quiz?.length) return;

    const score = currentLesson.quiz.reduce((total, question, index) => {
      return total + (answers[index] === question.correct ? 1 : 0);
    }, 0);

    setProgress((previous) => ({
      ...previous,
      scores: {
        ...previous.scores,
        [currentLesson.id]: score,
      },
    }));

    setQuizSubmitted(true);
  };

  const score = currentLesson?.quiz?.reduce((total, question, index) => {
    return total + (answers[index] === question.correct ? 1 : 0);
  }, 0);

  return (
    <main className="hybrid-academy" dir="rtl">
      <Navbar />

      <section className="hybrid-hero">
        <div className="hybrid-hero-content">
          <span className="hybrid-eyebrow">
            WASEEM WORLD / SPECIALIZED ACADEMY
          </span>

          <div className="hybrid-hero-symbol">H</div>

          <h1>
            HYBRID CARS
            <span>ACADEMY</span>
          </h1>

          <p>
            موسوعة تعليمية لفهم سيارات الهايبرد من الصفر، من طريقة عمل
            المحركات والبطاريات إلى الأنظمة والصيانة والتشخيص.
          </p>

          <div className="hybrid-hero-actions">
            <a href="#hybrid-learning">ابدأ التعلّم ↓</a>
            <Link to="/">العودة للرئيسية</Link>
          </div>
        </div>

        <div className="hybrid-car-visual">
          <div className="hybrid-car-glow" />
          <div className="hybrid-car-icon">🚙</div>
          <span className="hybrid-floating-label label-engine">
            ENGINE SYSTEM
          </span>
          <span className="hybrid-floating-label label-electric">
            ELECTRIC POWER
          </span>
          <span className="hybrid-floating-label label-battery">
            HYBRID BATTERY
          </span>
        </div>
      </section>

      <section className="hybrid-overview">
        <div>
          <strong>08</strong>
          <span>وحدات تعليمية</span>
        </div>
        <div>
          <strong>{allDetailedLessons.length}+</strong>
          <span>دروس مجهزة حالياً</span>
        </div>
        <div>
          <strong>{progressPercent}%</strong>
          <span>نسبة إنجازك</span>
        </div>
      </section>

      <section className="hybrid-progress-section">
        <div className="hybrid-progress-heading">
          <div>
            <span className="hybrid-section-label">YOUR LEARNING JOURNEY</span>
            <h2>تقدمك في الأكاديمية</h2>
          </div>
          <strong>{completedCount} درس مكتمل</strong>
        </div>

        <div className="hybrid-progress-track">
          <div
            className="hybrid-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p>يتم حفظ تقدمك على هذا الجهاز تلقائياً.</p>
      </section>

      <section className="hybrid-intro">
        <span className="hybrid-section-label">ABOUT THE ACADEMY</span>
        <h2>افهم السيارة من الداخل</h2>
        <p>
          تعلّم بأسلوب متدرج يجمع بين الشرح العربي والمصطلحات الإنجليزية
          والصور والرسومات والاختبارات، من المبادئ الأساسية حتى فهم
          أنظمة السيارة وتشخيصها نظرياً.
        </p>
      </section>

      <section className="hybrid-learning" id="hybrid-learning">
        <div className="hybrid-learning-title">
          <span className="hybrid-section-label">COMPLETE LEARNING PROGRAM</span>
          <h2>مركز التعلّم</h2>
          <p>اختر وحدة، ثم اختر الدرس الذي تريد دراسته.</p>
        </div>

        <div className="hybrid-learning-layout">
          <aside className="hybrid-sidebar">
            <div className="hybrid-sidebar-heading">
              <span>المسار التعليمي</span>
              <span>08 وحدات</span>
            </div>

            {moduleCatalog.map((module) => (
              <button
                key={module.id}
                className={`hybrid-sidebar-module ${
                  activeModule === module.id ? "active" : ""
                }`}
                onClick={() => selectModule(module.id)}
              >
                <span className="hybrid-sidebar-icon">{module.icon}</span>
                <span className="hybrid-sidebar-module-text">
                  <strong>{module.title}</strong>
                  <small>{module.lessonTitles.length} دروس</small>
                </span>
                <span className="hybrid-sidebar-number">{module.number}</span>
              </button>
            ))}
          </aside>

          <div className="hybrid-learning-main">
            {currentModule && (
              <>
                <div className="hybrid-current-module">
                  <span>{currentModule.subtitle}</span>
                  <h2>{currentModule.title}</h2>
                  <p>{currentModule.description}</p>
                </div>

                <div className="hybrid-lesson-navigation">
                  <h3>دروس الوحدة</h3>

                  {currentModule.lessonTitles.map((title, index) => {
                    const detail = detailedModule?.lessons?.[index];
                    const isCompleted = detail
                      ? progress.completed.includes(detail.id)
                      : false;

                    return (
                      <button
                        key={`${currentModule.id}-${index}`}
                        className={`hybrid-lesson-nav-item ${
                          detail && activeLessonId === detail.id ? "active" : ""
                        }`}
                        onClick={() =>
                          detail ? selectLesson(detail.id) : null
                        }
                        disabled={!detail}
                      >
                        <span className="hybrid-lesson-nav-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="hybrid-lesson-nav-title">
                          {title}
                          {!detail && <small>سيضاف الشرح قريباً</small>}
                        </span>
                        <span className="hybrid-lesson-status">
                          {isCompleted ? "✓" : detail ? "←" : "•"}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {currentLesson ? (
                  <article className="hybrid-lesson-content">
                    <div className="hybrid-lesson-cover">
                      <img
                        src={currentLesson.image}
                        alt={currentLesson.title}
                        loading="lazy"
                      />
                      <div className="hybrid-lesson-cover-overlay" />
                      <div className="hybrid-lesson-cover-text">
                        <span>HYBRID CARS ACADEMY</span>
                        <h2>{currentLesson.title}</h2>
                        <small>مدة الدرس: {currentLesson.duration}</small>
                      </div>
                    </div>

                    <div className="hybrid-lesson-body">
                      <div className="hybrid-lesson-introduction">
                        <span className="hybrid-section-label">
                          LESSON INTRODUCTION
                        </span>
                        <p>{currentLesson.introduction}</p>
                      </div>

                      {currentLesson.sections.map((section, index) => (
                        <section
                          className="hybrid-content-section"
                          key={`${currentLesson.id}-section-${index}`}
                        >
                          <h3>
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            {section.heading}
                          </h3>

                          {section.paragraphs.map((paragraph, paragraphIndex) => (
                            <p key={paragraphIndex}>{paragraph}</p>
                          ))}
                        </section>
                      ))}

                      {currentLesson.visual && (
                        <section className="hybrid-visual-section">
                          <span className="hybrid-section-label">
                            VISUAL LEARNING
                          </span>
                          <h3>{currentLesson.visual.title}</h3>

                          <div className="hybrid-visual-grid">
                            {currentLesson.visual.items.map((item, index) => (
                              <div
                                className="hybrid-visual-card"
                                key={`${item.title}-${index}`}
                              >
                                <span>{item.icon}</span>
                                <strong>{item.title}</strong>
                                <p>{item.description}</p>
                              </div>
                            ))}
                          </div>
                        </section>
                      )}

                      {currentLesson.terms?.length > 0 && (
                        <section className="hybrid-terms-section">
                          <span className="hybrid-section-label">
                            TECHNICAL VOCABULARY
                          </span>
                          <h3>المصطلحات الفنية</h3>

                          <div className="hybrid-terms-grid">
                            {currentLesson.terms.map((term) => (
                              <div className="hybrid-term" key={term.en}>
                                <strong>{term.en}</strong>
                                <span>{term.ar}</span>
                              </div>
                            ))}
                          </div>
                        </section>
                      )}

                      {currentLesson.summary?.length > 0 && (
                        <section className="hybrid-summary-section">
                          <span className="hybrid-section-label">
                            LESSON SUMMARY
                          </span>
                          <h3>خلاصة الدرس</h3>
                          <ul>
                            {currentLesson.summary.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </section>
                      )}

                      <div className="hybrid-complete-area">
                        <div>
                          <strong>أنهيت دراسة هذا الدرس؟</strong>
                          <p>احفظ إنجازك للعودة إليه لاحقاً.</p>
                        </div>
                        <button
                          onClick={markCompleted}
                          disabled={progress.completed.includes(currentLesson.id)}
                        >
                          {progress.completed.includes(currentLesson.id)
                            ? "✓ تم إكمال الدرس"
                            : "إكمال الدرس"}
                        </button>
                      </div>

                      {currentLesson.quiz?.length > 0 && (
                        <section className="hybrid-quiz-section">
                          <span className="hybrid-section-label">
                            KNOWLEDGE CHECK
                          </span>
                          <h3>اختبر فهمك</h3>
                          <p className="hybrid-quiz-description">
                            أجب عن الأسئلة التالية ثم اضغط على تصحيح الاختبار.
                          </p>

                          {currentLesson.quiz.map((question, questionIndex) => (
                            <div
                              className="hybrid-quiz-question"
                              key={`${currentLesson.id}-q-${questionIndex}`}
                            >
                              <h4>
                                {questionIndex + 1}. {question.question}
                              </h4>

                              <div className="hybrid-quiz-options">
                                {question.options.map((option, optionIndex) => {
                                  const isCorrect =
                                    quizSubmitted &&
                                    optionIndex === question.correct;
                                  const isWrong =
                                    quizSubmitted &&
                                    answers[questionIndex] === optionIndex &&
                                    optionIndex !== question.correct;

                                  return (
                                    <button
                                      key={optionIndex}
                                      className={`hybrid-quiz-option ${
                                        answers[questionIndex] === optionIndex
                                          ? "selected"
                                          : ""
                                      } ${isCorrect ? "correct" : ""} ${
                                        isWrong ? "wrong" : ""
                                      }`}
                                      onClick={() => {
                                        if (quizSubmitted) return;
                                        setAnswers((previous) => ({
                                          ...previous,
                                          [questionIndex]: optionIndex,
                                        }));
                                      }}
                                      disabled={quizSubmitted}
                                    >
                                      <span>
                                        {String.fromCharCode(65 + optionIndex)}
                                      </span>
                                      {option}
                                      {isCorrect && <b>✓</b>}
                                      {isWrong && <b>×</b>}
                                    </button>
                                  );
                                })}
                              </div>

                              {quizSubmitted && (
                                <p className="hybrid-quiz-explanation">
                                  {question.explanation}
                                </p>
                              )}
                            </div>
                          ))}

                          {!quizSubmitted ? (
                            <button
                              className="hybrid-submit-quiz"
                              onClick={submitQuiz}
                              disabled={
                                Object.keys(answers).length !==
                                currentLesson.quiz.length
                              }
                            >
                              تصحيح الاختبار
                            </button>
                          ) : (
                            <div className="hybrid-quiz-result">
                              <strong>
                                نتيجتك: {score} من {currentLesson.quiz.length}
                              </strong>
                              <p>
                                {score === currentLesson.quiz.length
                                  ? "ممتاز! أجبت عن جميع الأسئلة بشكل صحيح."
                                  : "راجع الإجابات والتفسيرات وحاول الاستفادة منها."}
                              </p>
                              <button
                                onClick={() => {
                                  setAnswers({});
                                  setQuizSubmitted(false);
                                }}
                              >
                                إعادة الاختبار
                              </button>
                            </div>
                          )}
                        </section>
                      )}
                    </div>
                  </article>
                ) : (
                  <div className="hybrid-coming-soon">
                    <span>{currentModule.icon}</span>
                    <span className="hybrid-section-label">
                      CONTENT IN DEVELOPMENT
                    </span>
                    <h3>هذه الوحدة ضمن المسار التعليمي</h3>
                    <p>
                      تم تجهيز هيكل الوحدة وعناوين دروسها. سنضيف الشروحات
                      والصور والمصطلحات والاختبارات التفصيلية لها في المراحل
                      التالية.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <section className="hybrid-safety">
        <span>IMPORTANT SAFETY NOTE</span>
        <h2>التعلّم يبدأ بالمعرفة والسلامة</h2>
        <p>
          تتضمن الأكاديمية شرحاً تعليمياً لأنظمة الجهد العالي ومكوناتها.
          أما فحص البطاريات أو التعامل مع دوائر الجهد العالي عملياً فيجب
          أن يتم بواسطة فني مؤهل ووفق تعليمات الشركة المصنعة.
        </p>
      </section>

      <footer className="hybrid-footer">
        <span>WASEEM WORLD</span>
        <span>HYBRID CARS ACADEMY</span>
      </footer>
    </main>
  );
}
