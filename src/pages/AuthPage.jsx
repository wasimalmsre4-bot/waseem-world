
import { useState } from "react";
import {
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import "./AuthPage.css";

export default function AuthPage() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const googleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const sendCode = async () => {
    try {
      if (!phone.startsWith("+")) {
        setMessage("اكتب رقمك مع مفتاح الدولة، مثال: +9627XXXXXXXX");
        return;
      }

      setLoading(true);
      setMessage("");

      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          { size: "normal" }
        );
      }

      const result = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );

      setConfirmation(result);
      setMessage("تم إرسال رمز التحقق إلى هاتفك.");
    } catch (error) {
      setMessage("تعذر إرسال الرمز: " + error.message);
      window.recaptchaVerifier?.clear();
      window.recaptchaVerifier = null;
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    try {
      setLoading(true);
      await confirmation.confirm(code);
      setMessage("تم تسجيل الدخول بنجاح!");
    } catch (error) {
      setMessage("رمز التحقق غير صحيح أو انتهت صلاحيته.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-logo">W</div>
        <span className="auth-tag">YOUR WORLD. YOUR FUTURE.</span>

        <h1>مرحباً بك في WASEEM WORLD</h1>
        <p>سجّل دخولك واكتشف عالماً من الخدمات والمعرفة.</p>

        <button
          className="google-btn"
          onClick={googleLogin}
          disabled={loading}
        >
          <span>G</span>
          المتابعة باستخدام Google
        </button>

        <div className="auth-divider">
          <span>أو باستخدام رقم الهاتف</span>
        </div>

        {!confirmation ? (
          <>
            <label>رقم الهاتف</label>
            <input
              type="tel"
              placeholder="+9627XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              dir="ltr"
            />

            <div id="recaptcha-container"></div>

            <button
              className="phone-btn"
              onClick={sendCode}
              disabled={loading}
            >
              {loading ? "يرجى الانتظار..." : "إرسال رمز التحقق"}
            </button>
          </>
        ) : (
          <>
            <label>رمز التحقق SMS</label>
            <input
              type="text"
              placeholder="أدخل الرمز المرسل"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              dir="ltr"
            />

            <button
              className="phone-btn"
              onClick={verifyCode}
              disabled={loading}
            >
              {loading ? "جارٍ التحقق..." : "تأكيد الرمز"}
            </button>
          </>
        )}

        {message && <div className="auth-message">{message}</div>}

        <small>بتسجيل الدخول، أنت توافق على شروط استخدام المنصة.</small>
      </section>
    </main>
  );
}
