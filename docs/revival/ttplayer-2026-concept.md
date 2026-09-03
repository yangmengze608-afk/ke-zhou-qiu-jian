# Revival Concept 01 — 千千静听 → 声藏 / SHENGCANG

> 工作结论：不要复刻“一个更漂亮的本地播放器”。把千千静听真正值得保留的 Product DNA，重新计算成一个 **local-first personal music memory OS**。

## 1. 为什么是它

Revival Readiness v0.1 将千千静听列为 HIGH：核心价值可以在单用户模式成立，不需要先建立社交网络，也不要求我们自建商业音乐曲库。

旧产品最值得保留的不是品牌、皮肤或旧 UI，而是三件事：

1. 用户拥有自己的音乐文件，播放器首先服务这些文件。
2. 本地播放必须轻、快、稳定，不能为了“智能”牺牲基本播放器体验。
3. 音乐库是长期个人资产，不应该因为平台商业决策而消失。

## 2. 2026 的新机会

今天本地音乐工具已经证明多个关键能力可行：

- Plex 的 Sonic Analysis 会直接分析个人音乐文件的声音特征，用于相似曲目、Radio 与 Mix。这证明“没有完美元数据也能理解本地音乐”已经可行：<https://support.plex.tv/articles/sonic-analysis-music/>
- Roon ARC 可以浏览、播放、下载并管理用户自己的本地音乐库，证明“个人音乐服务器 + 移动端访问”不是边缘技术问题：<https://help.roonlabs.com/portal/en/kb/articles/arc>
- MusicBrainz Picard 提供成熟的开放元数据匹配、标签标准化与写回能力，证明本地媒体 metadata repair 有可复用的开放基础：<https://picard.musicbrainz.org/quick-start/>

因此机会不是“AI 会推荐歌”，而是把这些能力重新组合成更低门槛、中文优先、对普通用户更友好的个人音乐系统。

## 3. 产品命题

### 工作名

**声藏 / SHENGCANG**

“千千静听 2026”仅作为产品考古中的 Revival Concept 名称，不建议把受保护品牌直接用于真实商业发布。

### 一句话

> 不是再做一个流媒体，而是让你拥有的音乐重新有意义。

### 核心用户

- 有 1,000–100,000 首本地音乐文件的人；
- 曾长期保存 MP3 / FLAC / AAC、旧硬盘、NAS、iTunes / Music 文件夹的人；
- 不满足于流媒体“搜歌 → 播放”，更在意收藏、资料、记忆、整理与长期所有权的人。

## 4. MVP

### A. Library Scan

只读扫描本地文件夹 / 外置硬盘 / NAS。

建立：
- 文件索引
- 原始 embedded tags
- 文件 hash / duplicate hints
- 本地声音 embedding（可选）

默认不上传音频。

### B. Memory Search

不是只搜 title / artist。

用户可以问：
- “找我高中那几年常听的、下雨天会循环的女声”
- “比这首安静一点，但不要纯器乐”
- “很久没听、但以前经常放进夜路歌单里的歌”

检索信号可以组合：
- 本地标签
- 文件时间 / 加入时间
- 播放历史（若用户导入）
- 手工歌单
- 声音向量
- 开放音乐 metadata

必须给出“为什么找到它”，而不是黑箱结果。

### C. Metadata Repair Lab

AI 不直接覆盖文件。

先显示：
- 原始标签
- MusicBrainz / 其他开放来源候选
- 冲突字段
- confidence
- 将要写回的值

用户批准后再写回。

### D. Personal Taste Graph

Taste Graph 是用户自己的长期索引，不是广告画像。

原则：
- 可导出
- 可删除
- 能解释来源
- 不要求社区网络效应

### E. Lightweight Player

AI 不能吃掉播放器本身。

第一版必须保证：
- 秒开
- gapless / queue / playlist 等基础体验可靠
- 本地文件不因 AI 服务不可用而无法播放
- offline-first

## 5. 明确不做

- 不自建商业音乐曲库
- 不通过“免费听全网音乐”作为增长点
- 不复制千千静听旧界面或品牌资产
- 不默认上传整首音频到云端
- 不用 AI 自动改写用户文件而不给 diff
- 不把社交 / UGC 当 MVP 必需条件

## 6. 真正差异化

单独看每个能力都不是全新：Roon、Plexamp、Picard 等分别覆盖了其中一部分。

真正需要验证的假设是：

> 是否存在一群普通用户，愿意为了“自己的音乐库重新变得可搜索、可整理、可记忆、可携带”，使用一个比专业发烧软件更轻、比流媒体更尊重所有权的产品？

这才是 Revival MVP 应测试的问题。

## 7. Prototype scope

站内 Concept Mock 只验证：

1. 用户能一眼看懂“这是我的本地音乐，而不是新流媒体”；
2. Memory Search 比传统播放器搜索更有吸引力；
3. AI 建议始终显示来源 / 理由；
4. Metadata Repair 有明确的人类确认步骤；
5. 权利边界和 local-first 不是免责声明，而是产品卖点。

如果这五点在用户测试里成立，再考虑真实桌面 MVP。
