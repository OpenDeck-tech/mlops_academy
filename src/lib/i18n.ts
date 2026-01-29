export type Locale = "en" | "zh";

export const locales: Locale[] = ["en", "zh"];
export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  zh: "中文",
};

/** Translation map: key (English UI string) -> Chinese. Used for sidebar, header, etc. */
const zhTranslations: Record<string, string> = {
  // Sidebar group titles
  "Pipeline": "流程",
  "Learn": "学习",
  "Community & Jobs": "社区与招聘",
  "Reference": "参考",
  // Sidebar items
  "Environments": "环境",
  "Principles": "原则",
  "Learning Paths": "学习路径",
  "Playbooks": "手册",
  "Readiness": "准备",
  "Blog": "博客",
  "MLOps Roadmap": "MLOps 路线图",
  "Abbreviations": "缩写",
  "Podcasts": "播客",
  "Tweets": "推文",
  "Practitioners on LinkedIn": "LinkedIn 从业者",
  "Recruiters": "招聘",
  "MLOps Community": "MLOps 社区",
  "Reddit": "Reddit",
  "Roles": "职位",
  "MCP": "MCP",
  // Common
  "Theme": "主题",
  "Resources": "资源",
  "Back to Home": "返回首页",
  "Pro Content": "Pro 内容",
  "Language": "语言",
};

export function translate(locale: Locale, key: string): string {
  if (locale === "zh" && zhTranslations[key]) {
    return zhTranslations[key];
  }
  return key;
}

export function getTranslations(locale: Locale) {
  return {
    t: (key: string) => translate(locale, key),
  };
}
