declare const LANGUAGES: {
    NEXT_STEP: {
        zh: string;
        en: string;
        ja: string;
    };
    I_KNOW: {
        zh: string;
        en: string;
        ja: string;
    };
    STEP_NUMBER: {
        zh: (idx: number, length: number) => string;
        en: (idx: number, length: number) => string;
        ja: (idx: number, length: number) => string;
    };
    PREV_STEP: {
        zh: string;
        en: string;
        ja: string;
    };
    SKIP_STEP: {
        zh: string;
        en: string;
        ja: string;
    };
};
type languages = typeof LANGUAGES;
type langType = 'zh' | 'en' | 'ja';
export type StepNumber = (idx: number, length: number) => string;
export default function i18n(lang?: langType): (key: keyof languages) => string | StepNumber;
export {};
