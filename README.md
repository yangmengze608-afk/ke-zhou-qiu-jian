# 刻舟求剑 / Ke Zhou Qiu Jian

一个面向中文互联网的 Product Archaeology + AI Revival 开源项目：保存消失产品的元数据与思想，分析其 Product DNA，并重新判断 AI 是否改变了它们曾经失败的条件。

> 当前状态：单页 MVP / UI Demo。六条样例档案均未完成历史核验，不能作为事实来源。

## 为什么做

中文互联网消失的不只是网页和软件，也包括曾经成立过的交互、社区关系与产品想象。我们希望在怀旧和复刻之外，建立一套可追溯的产品考古方法，并追问：如果今天重新做，它还会死吗？

## 当前 MVP

- 黑水与墨迹感的滚动叙事首页
- Pointer-reactive Canvas 水纹
- 河流式样例档案时间线与六个可选遗物
- 产品考古详情面板
- Revival 价值转折与 Blueprint 前端 Mock
- 响应式布局与 `prefers-reduced-motion` 支持

第一版不包含登录、数据库、CMS、真实 AI 调用或经核验的历史资料。

## 核心概念

`Archive → Archaeology → Revival`

发现遗物，验证来源，提取 Product DNA，再把 AI 时代的新条件转化为可检验的 Revival Blueprint。

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

## 项目结构

```text
src/
├── components/       # 水纹、详情、Blueprint 交互
├── data/             # 类型安全的数据入口
├── App.tsx           # 单页叙事与主要交互
├── styles.css        # 视觉系统与响应式规则
└── types.ts          # Artifact 类型
data/                 # UI Demo 样例
schema/               # Artifact JSON Schema
docs/                 # 产品与视觉规格
```

## 数据贡献

新增记录应遵循 `schema/artifact.schema.json`。正式记录必须提供可追溯来源、明确 `verification_status` 与 `rights_status`；不要把推测写成事实。当前 `data/sample-artifacts.json` 仅用于 UI 演示。

## 法律与版权原则

本项目不是盗版资源仓库：不托管 ROM、破解资源或泄露源码，不复制整站内容，也不把停止维护理解为版权消失。研究以 metadata、来源索引和产品思想分析为主；Revival 偏向 clean-room reimplementation。

## Roadmap

- 建立史料核验与引用规范
- 定义 Product DNA / Death Reason taxonomy
- 研究并公开 Revival Score 方法
- 增加贡献校验、可访问性与视觉回归测试
- 完成第一个有来源支持的 Revival case study

## License

License TBD。在许可证确定前，请勿假定仓库内容已授予任何特定开源许可。
