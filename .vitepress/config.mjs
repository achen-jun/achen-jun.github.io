import { defineConfig } from 'vitepress'
import { set_sidebar } from "./utils/auto_sidebar.mjs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/achen-jun.github.io/",
  title: "阿晨君的文章库",
  description: "阿晨君的文章库",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // 目录
    outlineTitle: "文章目录",
    outline: [1,6],
    // 头部导航栏
    nav: [
      { text: 'Home', link: '/' },
      { text: 'AI玩法分享', link: '/ai-gameplay' },
      { text: 'Debug', link: '/debug' },
      { text: 'MTR', link: '/mtr' },
      { text: '关于', link: '/about' }

    ],
    // 侧边栏
    sidebar: {
      "/ai-gameplay": set_sidebar("/ai-gameplay"),
      "/debug": set_sidebar("/debug"),
      "/mtr": set_sidebar("/mtr"),
    },
    // 搜索框
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/achen-jun' }
    ]
  }
})
