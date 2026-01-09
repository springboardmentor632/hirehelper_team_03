import React, { createContext, useContext, useState, useEffect } from "react";
import enTranslations from "../translations/en";
import esTranslations from "../translations/es";
import frTranslations from "../translations/fr";

const translations = {
  English: enTranslations,
  Spanish: esTranslations,
  French: frTranslations,
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "English";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.setAttribute("lang", language.toLowerCase());
    // Dispatch event to notify other components about language change
    window.dispatchEvent(new CustomEvent("language:change", { detail: language }));
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

