import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

import en from "../src/jsons/en.json";
import zh from "../src/jsons/zh.json";

i18n
// .use(LanguageDetector)
.use(initReactI18next)
.init({
    debug: true,
    lng: navigator.language.indexOf("zh")==-1 ? "en" : "zh",
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    },
    resources: {
        en: {
            translation: en
        },
        zh: {
            translation: zh
        }
    }
})

export default i18n;