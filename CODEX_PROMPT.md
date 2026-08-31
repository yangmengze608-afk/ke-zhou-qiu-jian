# Codex Build Prompt — 刻舟求剑 / Ke Zhou Qiu Jian

你正在从零创建一个 GitHub 项目：

**项目名：刻舟求剑**  
**英文副标题：Product Archaeology for the Chinese Internet**

你的任务不是写方案，而是直接创建一个可运行、可继续迭代、适合公开到 GitHub 的高完成度前端项目。

## 0. 核心产品定义

“刻舟求剑”不是普通怀旧网站，不是软件墓地，也不是盗版资源仓库。

它做三件事：

1. **Archive**：记录中文互联网中已经关闭、衰落、消失或退出主流的产品、网站、软件、社区、游戏生态。
2. **Archaeology**：分析它们真正有价值的 Product DNA、死亡原因与被后世继承的思想。
3. **Revival**：判断 AI 是否改变了当年限制，并给出 2026 年重新实现这个创意的 Revival Blueprint。

核心问题：

> 船已经走了，剑还在原地吗？

核心副文案：

> 打捞被时代错杀的产品创意，并重新计算它们在 AI 时代的位置。

## 1. 第一版目标

只做 **单页高完成度 MVP 首页**。

不要：
- 登录
- 支付
- 后台
- 数据库服务
- 真 AI API
- 用户系统
- 复杂 CMS

必须：
- 本地可运行
- npm install 后可直接启动
- TypeScript
- 响应式
- 可部署到 Vercel / GitHub Pages
- 代码结构干净
- 所有主要按钮有效
- 动画尊重 prefers-reduced-motion

推荐技术栈：
- Vite
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- 必要时 GSAP
- Canvas / SVG 用于流体与河道效果

优先性能和视觉完整性，不要为了技术炫技引入过重依赖。

## 2. 视觉方向

关键词：

**黑水 / 墨迹 / 沉船档案 / 博物馆标本 / 数字考古 / 中文互联网遗迹 / 克制 / 电影感 / 编辑部设计**

主色：
- 深黑
- 墨灰
- 暖白
- 青灰
- 少量暗金作为“被发现 / 被复活”的信号

禁止：
- 蓝紫渐变 AI SaaS 风
- 赛博朋克霓虹
- 玻璃拟态大卡片堆叠
- 常规企业落地页模板
- 过度圆角
- 五颜六色 icon wall

字体：
- 中文标题要有文化感，但正文必须清晰
- 优先系统可用字体组合，不要引入需要私有授权的字体文件

## 3. 页面叙事必须由滚动驱动

整个首页像一次“顺河打捞”。

### Scene A — Hero / 河流

首屏：
- 巨大中文标题：**刻舟求剑**
- 小英文：Product Archaeology for the Chinese Internet
- 文案：
  - 船已经走了，剑还在原地吗？
  - 打捞被时代错杀的产品创意，并重新计算它们在 AI 时代的位置。
- CTA：**进入河流**

背景必须具有流体 / 墨水 / 河水质感。

鼠标移动：
- 轻微扰动流体
- 不要强跟手
- 不要廉价粒子特效
- 鼠标离开后缓慢恢复

滚动开始后：
- 自由水流逐步收束
- 最终形成一条“历史河道 / 时间线”

### Scene B — Timeline / 水下遗物

时间线不要做成普通直线。

桌面端：
- 一条弯曲、漂移的长河道
- 产品节点散布在河道两侧
- 节点有年代刻度
- 滚动时河道形态缓慢变化

移动端：
- 可以退化成纵向时间线
- 但仍保留“水下遗物”的感觉

Hover：
- 节点从模糊变清晰
- 轻微放大
- 文本显影
- 出现类似水波 / 折射 / 浮出水面的感觉

Click：
- 锁定节点
- 打开产品考古详情面板
- 再次点击或关闭按钮可退出

首批样例：
- 天涯社区
- 虾米音乐
- 百度空间
- 开心网
- Flash 小游戏生态
- 早期独立论坛生态

注意：
**这些首批记录属于 UI demo，任何生命周期年份、死亡原因、历史事实都必须标记为待核验，不要凭常识补事实。**

页面明显显示：
> 样例档案 · 数据待最终核验

禁止抓取、嵌入、复制历史网站受版权保护截图。
第一版使用抽象图形、自制纹理、文字、程序化视觉作为封面占位。

## 4. Detail Panel / 产品考古页

点击遗物后出现详情，至少显示：
- Name
- Category
- Lifecycle
- Status
- Product DNA
- Why it mattered
- Why it disappeared
- What survived
- AI changes the equation
- Revival Score
- Sources status

Revival Score 第一版必须注明：
> Demo score — methodology under development

不要伪装成已经经过严谨量化验证。

## 5. Revival Section / 从墓碑到新产品

标题：
# 如果今天重新做，它还会死吗？

这里是整个网站最重要的价值转折。

视觉从黑暗 / 墓碑 / 压缩 / 凝固，逐渐变成展开 / 出现空间 / 暗金与暖白提高 / 产品重新获得生命。

展示四步：
**遗物 → Product DNA → AI Opportunity → 2026 MVP**

加入 CTA：**生成 Revival Blueprint**

第一版不接真实 AI。点击后打开一个高质量前端 mock blueprint，至少显示：
- Keep
- Kill
- AI Mutation
- MVP Features
- UX Principle
- Suggested Stack
- Build Prompt Preview

## 6. Manifesto / 法律与项目边界

必须有一段简洁 manifesto：

“刻舟求剑”不是盗版资源仓库。

第一版原则：
- 不托管 ROM
- 不托管破解资源
- 不托管泄露源码
- 不复制整站内容
- 不把“停止维护”理解为版权消失
- 以 metadata、来源索引、历史研究、产品思想分析为主
- Revival 偏向 clean-room reimplementation
- 后续为每条记录加入 rights_status

## 7. Footer

显示：**刻舟求剑 / Ke Zhou Qiu Jian**

以及可点击占位：
- GitHub
- Submit a forgotten product
- Methodology
- About

暂时可以指向本页 section，但按钮必须有合理反馈，不能是死按钮。

## 8. 数据结构

不要把六个样例硬编码在组件中。

从 `src/data/artifacts.ts` 或 JSON 数据层读取。

数据结构必须兼容未来数百条记录。
使用仓库中的：
- `schema/artifact.schema.json`
- `data/sample-artifacts.json`
作为参考。

## 9. 组件建议

建议但不强制：
- AppShell
- FluidHero
- ScrollRiver
- ArtifactNode
- ArtifactTimeline
- ArtifactDetail
- RevivalSection
- BlueprintModal
- Manifesto
- Footer
- ReducedMotionFallback

不要为了组件化而组件化。

## 10. 动画要求

必须有：
1. Pointer-reactive fluid background
2. Scroll-driven hero → river transition
3. Artifact hover reveal
4. Selected artifact state
5. Timeline / river scroll progression
6. Revival section visual “re-opening”
7. Blueprint modal transition

动画原则：慢、有惯性、不喧闹、不弹簧玩具感。鼠标只是“扰动历史”，不是拖着 UI 跑。

性能：
- requestAnimationFrame 正确清理
- Canvas 根据 devicePixelRatio 合理限制
- 页面离屏时停止高开销动画
- 移动端降低采样密度
- prefers-reduced-motion 提供静态但完整体验

## 11. README

README 必须包含：
1. 项目一句话介绍
2. 为什么做
3. 当前 MVP
4. 核心概念：Archive → Archaeology → Revival
5. 本地运行
6. 项目结构
7. 数据贡献方式
8. 法律/版权原则
9. Roadmap
10. License 状态说明

不要宣传尚不存在的功能。

## 12. Git 要求

初始化 Git 仓库。

创建 `.gitignore`。
如果尚未决定最终 License，不要擅自选择强约束许可证；README 中注明 license TBD。

建议首次 commit message：
`feat: bootstrap Ke Zhou Qiu Jian product archaeology MVP`

不要 push 到任何未经明确授权的 remote。

## 13. 验收

结束前必须自己检查：
- npm install 成功
- npm run build 成功
- npm run dev 可启动
- 无明显 TypeScript error
- 无控制台持续报错
- 桌面 1440px 视觉完整
- 390px 手机宽度可用
- 所有 CTA 能触发行为
- 六个 artifact 均可选择
- blueprint modal 可开关
- prefers-reduced-motion 有效果
- README 完整

最后输出：
1. 实际创建了什么
2. 文件树
3. 验证命令与结果
4. 当前仍为 demo / 待核验的内容
5. 下一步建议

**直接动手创建项目，不要先向我提问。**
