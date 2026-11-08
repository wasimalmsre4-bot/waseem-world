
import { useEffect, useState } from "react";
import "./BuiltInTools.css";

const toolTabs = [
  { id: "calculator", name: "الآلة الحاسبة", icon: "＋" },
  { id: "converter", name: "محوّل الوحدات", icon: "⇄" },
  { id: "counter", name: "عداد النصوص", icon: "Aa" },
  { id: "notes", name: "الملاحظات", icon: "▤" },
  { id: "tasks", name: "منظم المهام", icon: "✓" },
  { id: "password", name: "مولّد كلمات المرور", icon: "⌑" },
];

const conversions = {
  length: {
    label: "الطول",
    units: {
      متر: 1,
      كيلومتر: 1000,
      سنتيمتر: 0.01,
      مليمتر: 0.001,
      ميل: 1609.344,
      قدم: 0.3048,
    },
  },
  weight: {
    label: "الوزن",
    units: {
      كيلوغرام: 1,
      غرام: 0.001,
      مليغرام: 0.000001,
      رطل: 0.453592,
      طن: 1000,
    },
  },
  temperature: {
    label: "الحرارة",
    units: {
      مئوية: "c",
      فهرنهايت: "f",
      كلفن: "k",
    },
  },
};

export default function BuiltInTools() {
  const [activeTool, setActiveTool] = useState("calculator");

  // Calculator
  const [firstNumber, setFirstNumber] = useState("0");
  const [secondNumber, setSecondNumber] = useState("");
  const [operator, setOperator] = useState("+");
  const [calcResult, setCalcResult] = useState(null);

  function calculate() {
    const a = Number(firstNumber);
    const b = Number(secondNumber);

    if (secondNumber === "" || !Number.isFinite(a) || !Number.isFinite(b)) {
      setCalcResult("أدخل الرقمين أولاً");
      return;
    }

    let result;
    if (operator === "+") result = a + b;
    if (operator === "-") result = a - b;
    if (operator === "×") result = a * b;
    if (operator === "÷") {
      if (b === 0) {
        setCalcResult("لا يمكن القسمة على صفر");
        return;
      }
      result = a / b;
    }

    setCalcResult(String(Number(result.toFixed(10))));
  }

  // Converter
  const [conversionType, setConversionType] = useState("length");
  const [fromUnit, setFromUnit] = useState("متر");
  const [toUnit, setToUnit] = useState("كيلومتر");
  const [conversionValue, setConversionValue] = useState("1");

  const currentUnits = conversions[conversionType].units;

  function convertValue() {
    const value = Number(conversionValue);
    if (!Number.isFinite(value)) return "أدخل قيمة صحيحة";

    if (conversionType === "temperature") {
      let celsius = value;

      if (fromUnit === "فهرنهايت") celsius = (value - 32) * 5 / 9;
      if (fromUnit === "كلفن") celsius = value - 273.15;

      if (toUnit === "فهرنهايت") return (celsius * 9 / 5 + 32).toFixed(2);
      if (toUnit === "كلفن") return (celsius + 273.15).toFixed(2);
      return celsius.toFixed(2);
    }

    const baseValue = value * currentUnits[fromUnit];
    return (baseValue / currentUnits[toUnit]).toLocaleString("en-US", {
      maximumFractionDigits: 8,
    });
  }

  // Text counter
  const [textValue, setTextValue] = useState("");

  const wordCount = textValue.trim()
    ? textValue.trim().split(/\s+/).length
    : 0;

  // Notes
  const [notes, setNotes] = useState(() => {
    try {
      return localStorage.getItem("ww-built-in-notes") || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("ww-built-in-notes", notes);
    } catch {
      // Storage may be unavailable.
    }
  }, [notes]);

  // Tasks
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ww-built-in-tasks") || "[]");
    } catch {
      return [];
    }
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("ww-built-in-tasks", JSON.stringify(tasks));
    } catch {
      // Storage may be unavailable.
    }
  }, [tasks]);

  function addTask(event) {
    event.preventDefault();
    if (!newTask.trim()) return;

    setTasks((current) => [
      ...current,
      {
        id: Date.now(),
        title: newTask.trim(),
        done: false,
      },
    ]);
    setNewTask("");
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  // Password generator
  const [passwordLength, setPasswordLength] = useState(16);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");

  function generatePassword() {
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) characters += "0123456789";
    if (includeSymbols) characters += "!@#$%^&*_-+=";

    const randomValues = new Uint32Array(passwordLength);
    window.crypto.getRandomValues(randomValues);

    const password = Array.from(
      randomValues,
      (number) => characters[number % characters.length]
    ).join("");

    setGeneratedPassword(password);
  }

  async function copyText(value) {
    try {
      await navigator.clipboard.writeText(value);
      alert("تم النسخ بنجاح");
    } catch {
      alert("تعذر النسخ. يمكنك تحديد النص ونسخه يدوياً.");
    }
  }

  return (
    <section className="built-tools">
      <div className="built-tools-heading">
        <span className="built-tools-eyebrow">WASEEM WORLD · BUILT-IN TOOLS</span>
        <h2>أدواتك، في مكان واحد.</h2>
        <p>
          أدوات رقمية عملية صممناها لتعمل مباشرة داخل WASEEM WORLD.
        </p>
      </div>

      <div className="built-tools-layout">
        <aside className="built-tools-sidebar">
          {toolTabs.map((tool) => (
            <button
              key={tool.id}
              className={activeTool === tool.id ? "built-tab active" : "built-tab"}
              onClick={() => setActiveTool(tool.id)}
            >
              <span className="built-tab-icon">{tool.icon}</span>
              {tool.name}
              <span className="built-tab-arrow">←</span>
            </button>
          ))}
        </aside>

        <div className="built-tool-content">
          {activeTool === "calculator" && (
            <div className="built-panel">
              <div className="built-panel-heading">
                <span className="built-panel-icon">＋</span>
                <div>
                  <h3>الآلة الحاسبة</h3>
                  <p>نفّذ العمليات الحسابية الأساسية بسهولة.</p>
                </div>
              </div>

              <div className="calculator-fields">
                <label>
                  الرقم الأول
                  <input
                    type="number"
                    value={firstNumber}
                    onChange={(e) => setFirstNumber(e.target.value)}
                    placeholder="أدخل الرقم الأول"
                  />
                </label>

                <label>
                  العملية
                  <select value={operator} onChange={(e) => setOperator(e.target.value)}>
                    <option value="+">جمع (+)</option>
                    <option value="-">طرح (-)</option>
                    <option value="×">ضرب (×)</option>
                    <option value="÷">قسمة (÷)</option>
                  </select>
                </label>

                <label>
                  الرقم الثاني
                  <input
                    type="number"
                    value={secondNumber}
                    onChange={(e) => setSecondNumber(e.target.value)}
                    placeholder="أدخل الرقم الثاني"
                  />
                </label>
              </div>

              <button className="built-primary-button" onClick={calculate}>
                احسب النتيجة
              </button>

              {calcResult !== null && (
                <div className="built-result">
                  <span>النتيجة</span>
                  <strong>{calcResult}</strong>
                </div>
              )}
            </div>
          )}

          {activeTool === "converter" && (
            <div className="built-panel">
              <div className="built-panel-heading">
                <span className="built-panel-icon">⇄</span>
                <div>
                  <h3>محوّل الوحدات</h3>
                  <p>حوّل بين وحدات الطول والوزن ودرجة الحرارة.</p>
                </div>
              </div>

              <label className="built-label">
                نوع التحويل
                <select
                  value={conversionType}
                  onChange={(e) => {
                    const type = e.target.value;
                    const units = Object.keys(conversions[type].units);
                    setConversionType(type);
                    setFromUnit(units[0]);
                    setToUnit(units[1]);
                  }}
                >
                  {Object.entries(conversions).map(([id, item]) => (
                    <option key={id} value={id}>{item.label}</option>
                  ))}
                </select>
              </label>

              <label className="built-label">
                القيمة
                <input
                  type="number"
                  value={conversionValue}
                  onChange={(e) => setConversionValue(e.target.value)}
                />
              </label>

              <div className="calculator-fields">
                <label>
                  من
                  <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
                    {Object.keys(currentUnits).map((unit) => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </label>

                <label>
                  إلى
                  <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
                    {Object.keys(currentUnits).map((unit) => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="built-result">
                <span>النتيجة</span>
                <strong>{conversionValue === "" ? "—" : convertValue()}</strong>
                <small>{toUnit}</small>
              </div>
            </div>
          )}

          {activeTool === "counter" && (
            <div className="built-panel">
              <div className="built-panel-heading">
                <span className="built-panel-icon">Aa</span>
                <div>
                  <h3>عداد الكلمات والحروف</h3>
                  <p>اكتب أو الصق النص واحصل على إحصائيات فورية.</p>
                </div>
              </div>

              <textarea
                className="built-textarea"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder="ابدأ بكتابة النص هنا..."
                rows={9}
              />

              <div className="counter-stats">
                <div><strong>{wordCount}</strong><span>كلمة</span></div>
                <div><strong>{textValue.length}</strong><span>حرف مع المسافات</span></div>
                <div><strong>{textValue.replace(/\s/g, "").length}</strong><span>حرف بدون مسافات</span></div>
                <div><strong>{textValue ? textValue.split(/\n/).length : 0}</strong><span>سطر</span></div>
              </div>

              <button className="built-secondary-button" onClick={() => setTextValue("")}>
                مسح النص
              </button>
            </div>
          )}

          {activeTool === "notes" && (
            <div className="built-panel">
              <div className="built-panel-heading">
                <span className="built-panel-icon">▤</span>
                <div>
                  <h3>ملاحظاتي</h3>
                  <p>اكتب ملاحظاتك وسيتم حفظها تلقائياً على هذا الجهاز.</p>
                </div>
              </div>

              <textarea
                className="built-textarea notes-area"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="اكتب أفكارك وملاحظاتك هنا..."
                rows={12}
              />

              <div className="built-note-footer">
                <span>✓ الحفظ التلقائي مفعّل</span>
                <button className="built-secondary-button" onClick={() => setNotes("")}>
                  مسح الملاحظات
                </button>
              </div>
            </div>
          )}

          {activeTool === "tasks" && (
            <div className="built-panel">
              <div className="built-panel-heading">
                <span className="built-panel-icon">✓</span>
                <div>
                  <h3>منظم المهام</h3>
                  <p>أضف مهامك اليومية وتابع إنجازك.</p>
                </div>
              </div>

              <form className="built-task-form" onSubmit={addTask}>
                <input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="ما المهمة التي تريد إنجازها؟"
                />
                <button className="built-primary-button" type="submit">إضافة</button>
              </form>

              <div className="built-task-summary">
                <span>كل المهام: {tasks.length}</span>
                <span>المكتملة: {tasks.filter((task) => task.done).length}</span>
              </div>

              <div className="built-task-list">
                {tasks.length === 0 ? (
                  <p className="built-empty">لا توجد مهام حتى الآن. أضف مهمتك الأولى!</p>
                ) : (
                  tasks.map((task) => (
                    <div className={task.done ? "built-task done" : "built-task"} key={task.id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() => toggleTask(task.id)}
                        />
                        <span>{task.title}</span>
                      </label>
                      <button onClick={() => deleteTask(task.id)} aria-label="حذف المهمة">
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTool === "password" && (
            <div className="built-panel">
              <div className="built-panel-heading">
                <span className="built-panel-icon">⌑</span>
                <div>
                  <h3>مولّد كلمات المرور</h3>
                  <p>أنشئ كلمة مرور عشوائية بإعدادات تختارها.</p>
                </div>
              </div>

              <label className="built-label">
                طول كلمة المرور: {passwordLength}
                <input
                  type="range"
                  min="8"
                  max="40"
                  value={passwordLength}
                  onChange={(e) => setPasswordLength(Number(e.target.value))}
                />
              </label>

              <label className="built-check">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                />
                تضمين الأرقام
              </label>

              <label className="built-check">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                />
                تضمين الرموز
              </label>

              <button className="built-primary-button" onClick={generatePassword}>
                إنشاء كلمة مرور
              </button>

              {generatedPassword && (
                <div className="built-password-result">
                  <code>{generatedPassword}</code>
                  <button
                    className="built-secondary-button"
                    onClick={() => copyText(generatedPassword)}
                  >
                    نسخ
                  </button>
                </div>
              )}

              <p className="built-security-note">
                ملاحظة: احفظ كلمة المرور في مكان آمن ولا تشاركها مع الآخرين.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
