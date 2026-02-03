import { cookies } from "next/headers";

export type Locale = "en" | "zh";

export const locales: Locale[] = ["en", "zh"];
export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  zh: "中文",
};

/** Get locale from cookie on the server (for server components). */
export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get("NEXT_LOCALE")?.value;
  return value === "zh" ? "zh" : "en";
}

/** Translation map: key (English UI string) -> Chinese. */
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
  "Back to Environments": "返回环境",
  "Back to Local Environment": "返回本地环境",
  "Pro Content": "Pro 内容",
  "Language": "语言",
  "Pro": "Pro",
  "Dashboard": "仪表盘",
  "Sign Up": "注册",
  "Sign In": "登录",
  "Create account": "创建账户",
  "Go to Dashboard": "前往仪表盘",
  // App shell
  "Skip to main content": "跳到主内容",
  "MLOps Academy": "MLOps 学院",
  "Open menu": "打开菜单",
  "Expand sidebar": "展开侧边栏",
  "Collapse sidebar": "收起侧边栏",
  // Blank / pipeline
  "Local Environment": "本地环境",
  "Development Environment": "开发环境",
  "Staging Environment": "预发布环境",
  "Production Environment": "生产环境",
  "Set up and optimize your local development workspace": "设置并优化本地开发环境",
  "Best practices for development workflows and collaboration": "开发工作流与协作最佳实践",
  "Testing and validation strategies before production": "上线前的测试与验证策略",
  "Deployment, monitoring, and operational excellence": "部署、监控与运营卓越",
  "MLOps Environments": "MLOps 环境",
  "From laptop to production — one pipeline.": "从笔记本到生产环境，一条流水线。",
  "Explore best practices and concepts for each stage (Local → Dev → Staging → Prod).": "探索各阶段的最佳实践与概念（本地 → 开发 → 预发布 → 生产）。",
  "Share": "分享",
  "Access Pro Content": "访问 Pro 内容",
  "First principles": "第一性原理",
  // Roles
  "Curated MLOps roles by location and type: London, USA, China, Contract. We'll be updating these manually for now.": "按地区和类型精选的 MLOps 职位：伦敦、美国、中国、合同制。我们会持续手动更新。",
  "You're browsing as a signed-in user": "您已登录",
  "You\u2019re browsing as a signed-in user": "您已登录",
  "Want to save your progress?": "想保存学习进度？",
  "Head to your dashboard for subscription and account settings.": "前往仪表盘管理订阅与账户设置。",
  "Create an account (or sign in) to access personalized features, learning paths, and Pro content.": "创建账户（或登录）以使用个性化功能、学习路径与 Pro 内容。",
  "No roles added yet. Check back soon!": "暂无职位，敬请期待！",
  "View role": "查看职位",
  "Contact recruiter": "联系招聘方",
  // Principles
  "First Principles of MLOps": "MLOps 第一性原理",
  "Tools change; these principles don't. Think from first principles when designing or reviewing ML systems.": "工具在变，这些原则不变。在设计或审视 ML 系统时，从第一性原理出发。",
  "Reproducibility": "可复现性",
  "Same inputs, same outputs — every time.": "相同输入，相同输出——每次如此。",
  "Environments, code, data, and model artifacts must be versioned and replayable. If you can't reproduce a run, you can't debug or improve it.": "环境、代码、数据与模型制品必须可版本化、可重放。若无法复现一次运行，就无法调试或改进。",
  "Automation": "自动化",
  "Remove manual steps; reduce human error.": "减少人工步骤，降低人为错误。",
  "Build, test, deploy, and monitor via pipelines. Manual handoffs and one-off scripts don't scale. Automate the path from commit to production.": "通过流水线完成构建、测试、部署与监控。人工交接与一次性脚本无法扩展。将提交到生产的路径自动化。",
  "Observability": "可观测性",
  "You can't fix what you can't see.": "看不见就无法修复。",
  "Logs, metrics, traces, and model/feature drift signals. Know when things break or degrade before users do. Define SLOs and alert on them.": "日志、指标、追踪与模型/特征漂移信号。在用户之前发现故障或退化。定义 SLO 并设置告警。",
  "Versioning": "版本管理",
  "Code, data, and models are first-class versioned assets.": "代码、数据与模型是一等版本化资产。",
  "Track which model, which dataset, and which code produced a given outcome. Versioning enables rollback, audit, and reproducible experiments.": "追踪哪个模型、哪份数据、哪段代码产生了某个结果。版本管理支持回滚、审计与可复现实验。",
  "Governance & Safety": "治理与安全",
  "Control who can change what, and what gets to production.": "控制谁可以改什么，以及什么能进入生产。",
  "Access control, approval gates, and compliance. Production changes should be auditable and gated. Model risk and fairness belong in the loop.": "访问控制、审批关卡与合规。生产变更应可审计、可管控。模型风险与公平性应纳入闭环。",
  "Environment Separation": "环境隔离",
  "Local → Dev → Staging → Prod. Don't skip steps.": "本地 → 开发 → 预发布 → 生产。不要跳过阶段。",
  "Clear boundaries between environments prevent \"works on my machine\" and protect production. Each stage has a purpose: build, integrate, validate, run.": "环境间的清晰边界避免「在我机器上能跑」并保护生产。每个阶段都有目的：构建、集成、验证、运行。",
  // Share
  "Share with your team": "分享给团队",
  "Copy link": "复制链接",
  "Copied!": "已复制！",
  "Share on X": "分享到 X",
  "Share on LinkedIn": "分享到 LinkedIn",
  // Local env
  "Local": "本地",
  "Set up and optimize your local development workspace": "设置并优化本地开发环境",
  "Testing": "测试",
  "Unit tests, integration tests, and testing strategies for ML code": "ML 代码的单元测试、集成测试与测试策略",
  "Docker": "Docker",
  "Containerization and container management for local development": "本地开发的容器化与容器管理",
  "Shell Commands": "Shell 命令",
  "Essential command-line tools and workflows for ML development": "ML 开发必备的命令行工具与工作流",
  "Local Setup": "本地设置",
  "Configure and optimize your local development environment": "配置并优化本地开发环境",
  "Programming": "编程",
  "LeetCode questions and answers on data structures and software engineering": "数据结构与软件工程相关的 LeetCode 题目与解答",
  "Learn testing frameworks, unit testing for ML models, integration testing, mocking strategies, and test-driven development for ML projects.": "学习测试框架、ML 模型单元测试、集成测试、模拟策略与 ML 项目的测试驱动开发。",
  "Master Docker basics, Dockerfiles for ML, docker-compose, container orchestration, and best practices for local ML development environments.": "掌握 Docker 基础、ML 用 Dockerfile、docker-compose、容器编排与本地 ML 开发环境最佳实践。",
  "Explore essential shell commands, automation scripts, environment management, file operations, and productivity tips for ML engineers.": "探索必备 shell 命令、自动化脚本、环境管理、文件操作与 ML 工程师效率技巧。",
  "Learn environment setup, virtual environments, dependency management, IDE configuration, and tools for productive local ML development.": "学习环境配置、虚拟环境、依赖管理、IDE 配置与高效本地 ML 开发工具。",
  "Practice coding with LeetCode problems covering data structures, algorithms, and software engineering principles essential for MLOps development.": "通过涵盖数据结构、算法与 MLOps 必备软件工程原理的 LeetCode 题目练习编程。",
  // Home
  "Master MLOps. Build production ML systems that last.": "掌握 MLOps，构建可持续的生产级 ML 系统。",
  "Curated, no-fluff curriculum from real-world experience. Tools change, fundamentals don't.": "来自实战的精选课程，去芜存菁。工具在变，基础不变。",
  "Get Pro Access": "获取 Pro 权限",
  "MLOps for Starters!": "MLOps 入门！",
  "Preview curriculum": "预览课程",
  "The next generation of best-prepared innovators are MLOps engineers": "下一代最有准备的创新者是 MLOps 工程师",
  "Why MLOps engineers?": "为什么是 MLOps 工程师？",
  "Bridge theory and production": "连接理论与生产",
  "MLOps engineers uniquely combine machine learning expertise with systems engineering, turning research into real-world impact.": "MLOps 工程师独特地结合机器学习与系统工程，将研究转化为实际影响。",
  "Master complexity at scale": "驾驭规模化复杂度",
  "They navigate the full ML lifecycle—from data pipelines to model deployment—building systems that work reliably at scale.": "他们贯穿 ML 全生命周期——从数据管道到模型部署——构建可规模可靠运行的系统。",
  "Drive business outcomes": "驱动业务结果",
  "By ensuring models perform in production, MLOps engineers directly connect technical work to measurable business value.": "通过确保模型在生产中表现良好，MLOps 工程师将技术工作与可衡量的业务价值直接挂钩。",
  "Future-proof skills": "面向未来的技能",
  "As AI adoption accelerates, the demand for engineers who can operationalize ML systems continues to grow exponentially.": "随着 AI 普及加速，能够将 ML 系统落地运营的工程师需求持续指数增长。",
  "Foundations": "基础",
  "Data versioning & lineage": "数据版本与血缘",
  "Experiment tracking": "实验追踪",
  "Reproducibility": "可复现性",
  "Systems": "系统",
  "Pipelines (batch/stream)": "流水线（批/流）",
  "Training orchestration": "训练编排",
  "CI/CD for ML": "ML 的 CI/CD",
  "Operations": "运营",
  "Monitoring & drift": "监控与漂移",
  "Governance & risk": "治理与风险",
  "Cost & SLOs": "成本与 SLO",
  "Essential Shell Commands": "必备 Shell 命令",
  "Quick reference for common shell commands used in MLOps workflows": "MLOps 工作流常用 shell 命令速查",
  "Pro Access": "Pro 权限",
  "All current and future content. One subscription.": "当前及未来全部内容，一次订阅。",
  "Subscribe": "订阅",
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
