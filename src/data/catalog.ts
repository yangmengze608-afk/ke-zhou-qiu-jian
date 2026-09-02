import { artifacts as baseArtifacts } from './artifacts'
import { researchOverrides } from './researchOverrides'
import type { Artifact } from '../types'

export type CatalogArtifact = Artifact & {
  exhibit: {
    collectionNo: string
    englishName: string
    eventYear: number | null
    eventLabel: string
    accent: string
    mainExhibit: boolean
    side: 'left' | 'right'
    lane: number
  }
}

const demoArtifact = (
  id: string,
  name: string,
  englishName: string,
  category: string,
  born: number | null,
  eventYear: number | null,
  eventLabel: string,
  accent: string,
): Artifact => ({
  id,
  name,
  category,
  lifecycle: { born, ended: eventYear, status: `${eventLabel} · 待正式考据` },
  verification_status: 'demo-unverified',
  summary: '该条目用于主河与河床遗址的信息架构演示。年份与关键事件在正式发布前仍需逐条进入来源核验流程。',
  product_dna: ['待研究'],
  why_it_mattered: ['待研究'],
  why_it_disappeared: ['待研究'],
  what_survived: ['待研究'],
  ai_changes: ['待研究'],
  revival: {
    score: null,
    score_status: '暂不评分：等待历史事实与 Revival 评分方法完成校准。',
    blueprint: { keep: ['待研究'], kill: ['待研究'], ai_mutation: ['待研究'], mvp_features: ['待研究'] },
  },
  rights_status: 'unknown',
  sources: [],
})

const additions: Artifact[] = [
  demoArtifact('artifact-07', '校内网', 'XIAONEI', '校园 SNS', 2005, 2009, '更名人人网', '#4d9aa0'),
  demoArtifact('artifact-08', 'VeryCD', 'VERYCD', '资源索引 / P2P 社区', 2003, 2011, '停止主要影音下载服务', '#5a855d'),
  demoArtifact('artifact-09', '千千静听', 'TTPLAYER', '桌面音乐播放器', 2002, 2013, '品牌整合更名', '#d3aa48'),
  demoArtifact('artifact-10', '射手网', 'SHOOTER', '字幕索引 / 协作社区', 2000, 2014, '网站关闭', '#8a6e42'),
  demoArtifact('artifact-11', '网易博客', 'NETEASE BLOG', '博客 / 个人空间', 2006, 2018, '停止运营', '#88a34f'),
  demoArtifact('artifact-12', '腾讯微博', 'TENCENT WEIBO', '微博客', 2010, 2020, '停止服务和运营', '#4d9aa0'),
  demoArtifact('artifact-13', '飞信', 'FETION', '即时通讯 / 短信互通', 2006, 2022, '和飞信停止服务', '#3f8d45'),
  demoArtifact('artifact-14', '人人影视', 'YYETS', '字幕协作 / 影视社区', 2004, 2014, '阶段性关闭', '#6f7b9b'),
  demoArtifact('artifact-15', '朋友网', 'PENGYOU', '实名熟人 SNS', 2011, 2017, '停止服务和运营', '#bc4a3c'),
]

const researchedArtifacts = [...baseArtifacts, ...additions].map((artifact) => {
  const override = researchOverrides[artifact.id]
  if (!override) return artifact

  return {
    ...artifact,
    ...override,
    lifecycle: override.lifecycle ?? artifact.lifecycle,
    revival: override.revival ?? artifact.revival,
    sources: override.sources ?? artifact.sources,
  }
}) as Artifact[]

const exhibitMeta: Record<string, CatalogArtifact['exhibit']> = {
  'artifact-01': { collectionNo: 'A-004', englishName: 'TIANYA', eventYear: 2023, eventLabel: '暂停访问（2026 分步恢复）', accent: '#bc4a3c', mainExhibit: true, side: 'left', lane: .86 },
  'artifact-02': { collectionNo: 'A-001', englishName: 'XIAMI MUSIC', eventYear: 2021, eventLabel: '停止音乐服务', accent: '#3f8d45', mainExhibit: true, side: 'right', lane: .72 },
  'artifact-03': { collectionNo: 'A-009', englishName: 'BAIDU SPACE', eventYear: 2015, eventLabel: '关闭并迁移至百度云', accent: '#6b9a63', mainExhibit: true, side: 'right', lane: .74 },
  'artifact-04': { collectionNo: 'A-016', englishName: 'KAIXIN001', eventYear: null, eventLabel: '待定位', accent: '#c16a52', mainExhibit: false, side: 'left', lane: .7 },
  'artifact-05': { collectionNo: 'A-017', englishName: 'FLASH GAME ECOSYSTEM', eventYear: 2020, eventLabel: 'Flash 时代终结', accent: '#b9942f', mainExhibit: false, side: 'right', lane: .7 },
  'artifact-06': { collectionNo: 'A-018', englishName: 'INDEPENDENT FORUMS', eventYear: null, eventLabel: '待定位', accent: '#627c68', mainExhibit: false, side: 'left', lane: .7 },
  'artifact-07': { collectionNo: 'A-008', englishName: 'XIAONEI', eventYear: 2009, eventLabel: '更名人人网', accent: '#4d9aa0', mainExhibit: true, side: 'right', lane: .66 },
  'artifact-08': { collectionNo: 'A-007', englishName: 'VERYCD', eventYear: 2011, eventLabel: '停止主要影音下载服务', accent: '#5a855d', mainExhibit: true, side: 'left', lane: .72 },
  'artifact-09': { collectionNo: 'A-006', englishName: 'TTPLAYER', eventYear: 2013, eventLabel: '整合更名为百度音乐', accent: '#d3aa48', mainExhibit: true, side: 'right', lane: .66 },
  'artifact-10': { collectionNo: 'A-005', englishName: 'SHOOTER', eventYear: 2014, eventLabel: '网站正式关闭', accent: '#8a6e42', mainExhibit: true, side: 'left', lane: .82 },
  'artifact-11': { collectionNo: 'A-010', englishName: 'NETEASE BLOG', eventYear: 2018, eventLabel: '停止运营并迁移 LOFTER', accent: '#88a34f', mainExhibit: true, side: 'right', lane: .7 },
  'artifact-12': { collectionNo: 'A-013', englishName: 'TENCENT WEIBO', eventYear: 2020, eventLabel: '停止服务和运营', accent: '#4d9aa0', mainExhibit: true, side: 'left', lane: .7 },
  'artifact-13': { collectionNo: 'A-012', englishName: 'FETION', eventYear: 2022, eventLabel: '和飞信停止服务', accent: '#3f8d45', mainExhibit: true, side: 'right', lane: .72 },
  'artifact-14': { collectionNo: 'A-011', englishName: 'YYETS', eventYear: 2014, eventLabel: '阶段性关闭', accent: '#6f7b9b', mainExhibit: false, side: 'right', lane: .82 },
  'artifact-15': { collectionNo: 'A-015', englishName: 'PENGYOU', eventYear: 2017, eventLabel: '停止服务和运营', accent: '#bc4a3c', mainExhibit: false, side: 'left', lane: .7 },
}

export const catalogArtifacts = researchedArtifacts.map((artifact) => ({
  ...artifact,
  exhibit: exhibitMeta[artifact.id] ?? {
    collectionNo: artifact.id,
    englishName: artifact.name,
    eventYear: artifact.lifecycle.ended,
    eventLabel: artifact.lifecycle.status,
    accent: '#6b846f',
    mainExhibit: false,
    side: 'left' as const,
    lane: .7,
  },
})) as CatalogArtifact[]

export const mainArtifacts = catalogArtifacts
  .filter((artifact) => artifact.exhibit.mainExhibit)
  .sort((a, b) => (a.exhibit.eventYear ?? 9999) - (b.exhibit.eventYear ?? 9999))

export const siteArtifacts = catalogArtifacts.filter((artifact) => !artifact.exhibit.mainExhibit)
