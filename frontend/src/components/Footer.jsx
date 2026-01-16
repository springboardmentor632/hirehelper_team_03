import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="mt-auto py-4 px-4 border-t border-[var(--color-border)] bg-[var(--color-bg-app)]">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-text-muted">
          <button
            onClick={() => navigate("/faq")}
            className="hover:text-[var(--color-primary)] transition-colors underline"
          >
            FAQ
          </button>
          <span className="hidden sm:inline">•</span>
          <button
            onClick={() => navigate("/privacy-policy")}
            className="hover:text-[var(--color-primary)] transition-colors underline"
          >
            Privacy Policy
          </button>
          <span className="hidden sm:inline">•</span>
          <button
            onClick={() => navigate("/terms-and-conditions")}
            className="hover:text-[var(--color-primary)] transition-colors underline"
          >
            Terms & Conditions
          </button>
        </div>
        <p className="text-center text-xs text-text-muted mt-3">
          © {new Date().getFullYear()} Hire-a-Helper. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
