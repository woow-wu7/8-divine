module.exports = {
  title: "8-divine",
  description: "Just playing around",
  head: [
    // 注入到当前页面的 HTML <head> 中的标签
    ["link", { rel: "icon", href: "./logo.jpg" }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: "/", // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false, // 代码块显示行号
  },
  themeConfig: {
    logo: "/logo.jpg",
    nav: [
      // 导航栏配置
      { text: "源码仓库", link: "https://github.com/woow-wu7/8-divine" },
      {
        text: "选择语言",
        items: [
          { text: "Chinese", link: "/language/chinese/" },
          { text: "Japanese", link: "/language/japanese/" },
        ],
      },
      { text: "掘金", link: "https://juejin.cn/user/1063982989065799/posts" },
    ],
    sidebar: "auto", // 侧边栏配置
    sidebarDepth: 2, // 侧边栏显示2级
  },
};
