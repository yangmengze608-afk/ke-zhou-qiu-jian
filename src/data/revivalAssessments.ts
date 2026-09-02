export type Readiness = 'HIGH' | 'MIXED' | 'LOW' | 'BLOCKED' | 'UNRATED'
export type Confidence = 'HIGH' | 'MEDIUM' | 'LOW'
export type DimensionLevel = 'STRONG' | 'MIXED' | 'WEAK' | 'UNKNOWN'

export type RevivalDimensionKey = 'demand' | 'constraintShift' | 'aiLeverage' | 'buildability' | 'rightsSafety' | 'networkIndependence'

export type RevivalDimension = { label: string; level: DimensionLevel; note: string }
export type RevivalAssessment = {
  readiness: Readiness
  confidence: Confidence
  thesis: string
  blocker?: string
  dimensions: Record<RevivalDimensionKey, RevivalDimension>
}

const labels: Record<RevivalDimensionKey, string> = {
  demand: '需求仍存在', constraintShift: '原始约束已改变', aiLeverage: 'AI 杠杆', buildability: '重建可行性', rightsSafety: '权利安全', networkIndependence: '网络独立性',
}
const d = (key: RevivalDimensionKey, level: DimensionLevel, note: string): RevivalDimension => ({ label: labels[key], level, note })

export const revivalAssessments: Record<string, RevivalAssessment> = {
  'artifact-07': { readiness:'MIXED', confidence:'MEDIUM', thesis:'校园身份与高密度真实关系仍有价值，但重新造一个大众 SNS 会再次撞上关系图谱冷启动。更可行的是把校园身份图谱做成服务层。', blocker:'核心风险是关系图谱冷启动与毕业后的持续留存。', dimensions:{
    demand:d('demand','STRONG','校友、同学、校园组织与职业早期关系需求仍在。'), constraintShift:d('constraintShift','MIXED','身份验证更容易，但社交入口更集中。'), aiLeverage:d('aiLeverage','MIXED','AI 可增强关系检索与校园知识，但不能替代真实社交图谱。'), buildability:d('buildability','STRONG','产品技术实现不难，难在分发与密度。'), rightsSafety:d('rightsSafety','STRONG','新品牌 clean-room 重建边界清晰。'), networkIndependence:d('networkIndependence','WEAK','价值高度依赖同校用户同时存在。') } },
  'artifact-08': { readiness:'MIXED', confidence:'MEDIUM', thesis:'资源发现与知识聚合需求仍强，AI 显著增强索引；但若重新回到未授权下载，旧版权约束几乎原样存在。', blocker:'核心必须从“提供下载”改写为“合法来源发现、知识索引与可追溯聚合”。', dimensions:{
    demand:d('demand','STRONG','跨站资源发现持续存在。'), constraintShift:d('constraintShift','MIXED','搜索与云能力进步，内容授权约束未消失。'), aiLeverage:d('aiLeverage','STRONG','语义检索、去重、来源解释很适合 AI。'), buildability:d('buildability','STRONG','合法元数据索引 MVP 容易实现。'), rightsSafety:d('rightsSafety','WEAK','托管或引导未授权内容会迅速触及硬约束。'), networkIndependence:d('networkIndependence','STRONG','搜索工具冷启动也能产生单人价值。') } },
  'artifact-09': { readiness:'HIGH', confidence:'MEDIUM', thesis:'本地媒体库与“我拥有的音乐”并未消失。AI 能把元数据整理、语义搜索、播放列表与个人媒体记忆重新变成高价值体验，而且不必经营版权曲库。', dimensions:{
    demand:d('demand','MIXED','大众播放转向流媒体，但本地收藏与个人媒体库仍有稳定人群。'), constraintShift:d('constraintShift','STRONG','跨端同步、设备性能与开放元数据远胜桌面播放器时代。'), aiLeverage:d('aiLeverage','STRONG','自动标签、语义搜索、个人音乐知识图谱价值直接。'), buildability:d('buildability','STRONG','无需自建曲库即可做有价值 MVP。'), rightsSafety:d('rightsSafety','STRONG','围绕用户自有文件和公开元数据构建。'), networkIndependence:d('networkIndependence','STRONG','核心价值单人即可成立。') } },
  'artifact-10': { readiness:'MIXED', confidence:'MEDIUM', thesis:'字幕发现、翻译与跨语言理解仍有需求，AI 让字幕工具比 2014 年更强；但公开字幕库的版权与来源边界仍决定产品上限。', blocker:'更稳妥的现代形态是用户授权媒体上的翻译/学习工具，而非灰色字幕仓库。', dimensions:{
    demand:d('demand','STRONG','跨语言观看、学习与无障碍字幕需求持续存在。'), constraintShift:d('constraintShift','MIXED','机器翻译质变，但版权结构未消失。'), aiLeverage:d('aiLeverage','STRONG','转写、翻译、对齐与术语一致性高度适配 AI。'), buildability:d('buildability','STRONG','本地或授权视频处理 MVP 技术门槛可控。'), rightsSafety:d('rightsSafety','MIXED','工具可合法构建，公开分发字幕需逐项判断。'), networkIndependence:d('networkIndependence','STRONG','本地工具单人即可产生完整价值。') } },
  'artifact-03': { readiness:'HIGH', confidence:'MEDIUM', thesis:'个人数字空间真正值得复活的不是公开博客，而是把照片、日志、链接和旧平台数据变成用户自己拥有、可搜索、可迁移的长期记忆库。', dimensions:{
    demand:d('demand','STRONG','长期保存和找回个人数字记忆是持续需求。'), constraintShift:d('constraintShift','STRONG','云、端侧数据库与多模态模型显著降低整理成本。'), aiLeverage:d('aiLeverage','STRONG','时间线、聚类、语义搜索是原生 AI 场景。'), buildability:d('buildability','STRONG','可从本地优先和少量导入源做窄 MVP。'), rightsSafety:d('rightsSafety','STRONG','围绕用户自己的内容构建。'), networkIndependence:d('networkIndependence','STRONG','单用户模式本身就有高价值。') } },
  'artifact-11': { readiness:'HIGH', confidence:'MEDIUM', thesis:'长文本写作与个人知识沉淀没有死亡，死亡的是把多年内容锁在单个平台。现代 Revival 应是可导出、可迁移、AI 可检索的长期出版系统。', dimensions:{
    demand:d('demand','STRONG','长文、个人站点、newsletter 与知识库证明需求仍在。'), constraintShift:d('constraintShift','STRONG','开放格式与低成本部署显著降低独立发布门槛。'), aiLeverage:d('aiLeverage','STRONG','AI 可整理旧文、索引主题和修复链接。'), buildability:d('buildability','STRONG','个人出版与迁移工具技术成熟。'), rightsSafety:d('rightsSafety','STRONG','用户自有文章与开放格式边界清晰。'), networkIndependence:d('networkIndependence','STRONG','个人站点不依赖社交网络效应。') } },
  'artifact-12': { readiness:'LOW', confidence:'MEDIUM', thesis:'微博客需求仍在，但“再做一个综合微博”没有新的技术窗口。AI 能改进阅读、搜索和治理，却无法替代关注图谱、创作者供给和实时分发网络。', blocker:'成熟网络效应与内容供给是主要障碍，AI 不是足够强的迁移理由。', dimensions:{
    demand:d('demand','STRONG','公开短内容和实时讨论仍是大需求。'), constraintShift:d('constraintShift','WEAK','核心竞争约束仍是网络规模与内容供给。'), aiLeverage:d('aiLeverage','MIXED','AI 更像现有平台增强功能，而非独立入口。'), buildability:d('buildability','STRONG','做出产品容易，做出有密度的网络极难。'), rightsSafety:d('rightsSafety','STRONG','新建微博客机制本身无明显 clean-room 障碍。'), networkIndependence:d('networkIndependence','WEAK','没有创作者与关注图谱时价值迅速坍塌。') } },
  'artifact-02': { readiness:'MIXED', confidence:'HIGH', thesis:'深度音乐发现、Taste Graph 与社区策展非常适合 AI，但只要产品仍需自己拥有完整曲库，就会再次进入版权与授权成本战。现代版本应成为音乐发现与理解层。', blocker:'音乐版权与完整曲库授权仍是核心结构性约束。', dimensions:{
    demand:d('demand','STRONG','高质量音乐发现与口味表达仍有明确需求。'), constraintShift:d('constraintShift','MIXED','推荐与语义理解进步，曲库授权成本仍在。'), aiLeverage:d('aiLeverage','STRONG','自然语言发现、Taste Graph 与可解释推荐高度适配。'), buildability:d('buildability','MIXED','发现层容易，完整播放器与曲库业务完全不同。'), rightsSafety:d('rightsSafety','WEAK','托管音乐或复制完整曲库会直接遇到版权约束。'), networkIndependence:d('networkIndependence','MIXED','个人发现可成立，社区策展仍需一定密度。') } },
  'artifact-13': { readiness:'LOW', confidence:'MEDIUM', thesis:'飞信最独特的价值来自互联网消息与运营商短信/手机号体系互通。今天跨平台沟通需求仍在，但决定性资源是运营商、平台与协议接入，不是 AI 模型。', blocker:'如果拿不到跨网络消息与手机号体系的合法接口，核心差异化无法复现。', dimensions:{
    demand:d('demand','MIXED','统一通信仍有需求，但用户已被成熟 IM 覆盖。'), constraintShift:d('constraintShift','WEAK','大型通信平台与运营商接口仍封闭且受监管。'), aiLeverage:d('aiLeverage','MIXED','AI 可统一摘要，但无法提供底层通信权限。'), buildability:d('buildability','MIXED','普通聊天容易，真正互通依赖外部合作。'), rightsSafety:d('rightsSafety','MIXED','数据、隐私与运营商接入要求较高。'), networkIndependence:d('networkIndependence','WEAK','核心价值依赖他人与外部网络接入。') } },
  'artifact-01': { readiness:'MIXED', confidence:'HIGH', thesis:'天涯最值得复活的不是旧 UI，而是长期公共讨论与社区记忆。AI 能让二十多年档案重新可探索，但活社区的治理、网络效应、商业模式与信任仍是主要难题。', blocker:'档案 Revival 很强；完整社区 Revival 仍受治理和网络效应制约。', dimensions:{
    demand:d('demand','STRONG','长讨论、主题社区与可引用公共档案仍有需求。'), constraintShift:d('constraintShift','MIXED','检索与治理工具进步，社区商业约束仍在。'), aiLeverage:d('aiLeverage','STRONG','历史长帖语义搜索、时间线与主题图谱价值高。'), buildability:d('buildability','MIXED','只读档案容易，恢复高质量活社区更难。'), rightsSafety:d('rightsSafety','MIXED','历史用户内容、品牌与数据迁移需要明确授权。'), networkIndependence:d('networkIndependence','WEAK','活社区强依赖参与者密度；档案则不依赖。') } },
}

export const getRevivalAssessment = (artifactId: string): RevivalAssessment => revivalAssessments[artifactId] ?? {
  readiness:'UNRATED', confidence:'LOW', thesis:'该遗物尚未完成 Revival Readiness 评估。', dimensions:{
    demand:d('demand','UNKNOWN','待研究'), constraintShift:d('constraintShift','UNKNOWN','待研究'), aiLeverage:d('aiLeverage','UNKNOWN','待研究'), buildability:d('buildability','UNKNOWN','待研究'), rightsSafety:d('rightsSafety','UNKNOWN','待研究'), networkIndependence:d('networkIndependence','UNKNOWN','待研究'),
  },
}
