# SSR-PPT-SKILL

面向 Codex 的 PPT 制作与美化 Skill。通过视觉定调、逐页策划、代表页校准和实际审美验收，制作有辨识度的演示文稿；支持离线 HTML 与原生可编辑 PPTX。

显示名称为 **SSR-PPT-SKILL**，调用名为 **`$ssr-ppt-skill`**。

## 功能

- 根据受众、用途和已有资料组织演示内容，需要外部事实时检索并保留来源。
- 根据主题确定视觉概念，明确字体层级、配色、构图与素材处理，尊重现有品牌和模板。
- 保留逐页策划稿，明确核心信息、依据、视觉焦点、阅读顺序、构图和编辑要求。
- 较长演示先用代表页验证视觉方向，覆盖典型内容和复杂页面；短演示直接整体制作。
- 输出单文件 HTML，支持翻页按钮、方向键、页码、全屏与打印。
- 输出 PPTX，要求正文、表格、数据图表和指定的示意图使用原生可编辑对象。
- 实际打开 HTML，重新读取并渲染最终 PPTX；同时检查整套节奏、逐页审美、阅读效果和编辑能力。
- 需求明确时连续完成，大纲、策划稿和内部代表页校准都不成为强制确认关卡。

用户未指定格式时，默认交付 HTML、PPTX 和 `planning.md`。用户只要求一种格式或只要求大纲时，按该范围执行。

## 安装

将本仓库的 `ssr-ppt-skill` 文件夹放入 Codex 的技能目录：设置了 `CODEX_HOME` 时使用其下的 `skills`；否则使用 `~/.codex/skills`。

### Windows / PowerShell

```powershell
git clone https://github.com/EuronSSR-01/SSR-PPT-SKILL.git
$ssrSkillsDir = if ($env:CODEX_HOME) {
    Join-Path $env:CODEX_HOME 'skills'
} else {
    Join-Path $HOME '.codex/skills'
}
$ssrSkillTarget = Join-Path $ssrSkillsDir 'ssr-ppt-skill'
if (Test-Path -LiteralPath $ssrSkillTarget) {
    throw '已存在同名 Skill，请先决定是否更新。'
}
New-Item -ItemType Directory -Path $ssrSkillsDir -Force | Out-Null
Copy-Item -LiteralPath './SSR-PPT-SKILL/ssr-ppt-skill' -Destination $ssrSkillTarget -Recurse
```

### macOS / Linux

```bash
git clone https://github.com/EuronSSR-01/SSR-PPT-SKILL.git
ssr_skills_dir="${CODEX_HOME:-$HOME/.codex}/skills"
mkdir -p "$ssr_skills_dir"
if [ -e "$ssr_skills_dir/ssr-ppt-skill" ]; then
  printf '%s\n' '已存在同名 Skill，请先决定是否更新。'
else
  cp -R ./SSR-PPT-SKILL/ssr-ppt-skill "$ssr_skills_dir/"
fi
```

## 使用

在 Codex 中明确调用：

```text
使用 $ssr-ppt-skill，基于这些资料制作面向管理层的 10 页汇报，
交付 HTML 演示和可编辑 PPTX，保留策划稿。
资料和需求已完整，请连续完成并实际预览验收。
```

已有演示也可以只做视觉优化：

```text
使用 $ssr-ppt-skill 美化这份演示，保留事实、数据、总页数和原生可编辑对象。
根据主题自主确定视觉方向，重点改善构图、中文排版、数据图表和整套节奏，完成后实际预览。
```

也可以限定工作范围：

```text
使用 $ssr-ppt-skill，把这篇报告做成 8 页离线 HTML 演示，只交付 HTML 和策划稿。
```

```text
使用 $ssr-ppt-skill，先为这份产品介绍整理大纲和逐页策划，暂不制作成品。
```

提供受众、目的、总页数、模板或品牌要求、素材与输出格式，可以减少需要澄清的信息。精确的总页数包含封面和结束页。

## 工作方式

需求与证据整理 → 大纲与逐页策划 → 视觉定调 → 代表页校准 → 整套制作 → 实际预览与修复 → 交付。

根据任务规模缩短流程，局部修改沿用现有视觉体系。两种格式使用相同内容和数据，分别制作、分别验收。布局由内容决定，可使用主视觉、大字、图表、关系图或信息分组；不强套某一种配色、卡片模板或固定的明暗交替。

视觉指导包含主题定调、构图选择、图片裁剪与一致性、中文断行、数据强调和整套节奏。审美验收以实际页面为依据，不以评分代替看图，也不承诺所有主题和受众都会获得相同的审美效果。

## 环境与编辑范围

这是工作指令和 HTML 播放器资源。PPTX 由执行环境中已有的制作引擎生成，仓库不包含 Office 或 PPTX 转换引擎。

- Codex 桌面环境优先使用已提供的 `presentations:Presentations`、bundled runtime 与 `@oai/artifact-tool`。
- 其他环境可使用已安装的 PptxGenJS 等原生 PPTX 工具，并须具备实际渲染和浏览器检查能力。
- 照片、标志和插画仍是图片；文字、表格和数据图表的原生编辑能力单独验证。
- HTML 动画和复杂网页效果不保证在 PPTX 中原样保留；整页截图或整页 SVG 不算原生可编辑 PPTX。
- 默认由当前 Codex 执行，不要求 Gemini、Grok 或外部 CLI。Web Brain / Inner Web Brain 仅在用户为当前任务明确要求时使用。

缺少必要能力时，Skill 要求说明已完成内容与未完成的验收项，不把未检查的文件称为完成。

## 已验证范围

本次视觉更新使用六页中文概念演示进行本地验证，内容包含封面、典型内容页、数据图、关系图、活动表格和结束页，全部方案与数据均为虚构。验证包括：

- Skill 结构、UTF-8 元数据与内部文档链接。
- 先实际查看两种格式的封面、数据页和表格代表页，再完成全套制作。
- HTML 离线打开、按钮与键盘翻页、首尾页边界、隐藏页隔离、小视口缩放、全屏和六页打印；浏览器无错误。
- HTML 与最终 PPTX 的完整尺寸逐页预览及缩略总览，检查中文排版、焦点、数据强调、构图与页面节奏。
- PPTX 导出检查、最终文件重新导入与逐页渲染；在副本中修改原生标题、表格单元格及图表值，保存、重载并渲染确认修改生效。

PPTX 验证使用生成库，尚未在 PowerPoint 中实机测试。这份样例主要覆盖文字与原生对象构图，未覆盖摄影或生成图片的设计效果。样例用于检验流程与交付能力，不代表不同主题的审美效果已经得到普遍验证。

## 文件结构

```text
ssr-ppt-skill/
├── SKILL.md
├── agents/openai.yaml
├── assets/
│   ├── player.css
│   └── player.js
└── references/
    ├── planning.md
    ├── art-direction.md
    ├── visual-review.md
    ├── html.md
    └── pptx.md
```

播放器资源应内联进入最终 HTML，不引用技能安装目录。逐页策划和两种格式的具体验收要求见对应 `references` 文档。
