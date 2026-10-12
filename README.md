# SSR-PPT-SKILL

面向 Codex 的 PPT 制作 Skill。保留逐页策划稿，支持离线 HTML 演示与原生可编辑 PPTX，并要求实际打开、逐页预览和编辑能力验证。

显示名称为 **SSR-PPT-SKILL**，调用名为 **`$ssr-ppt-skill`**。

## 功能

- 根据受众、用途和已有资料组织演示内容，需要外部事实时检索并保留来源。
- 制作逐页策划稿，明确每页的核心信息、依据、层级、版式和编辑要求。
- 输出单文件 HTML，支持翻页按钮、方向键、页码、全屏与打印。
- 输出 PPTX，要求正文、表格、数据图表和指定的示意图使用原生可编辑对象。
- 实际打开 HTML，重新读取并渲染最终 PPTX，发现问题后修复并复查。
- 需求明确时连续完成，不把大纲和策划稿变成强制确认关卡。

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

也可以限定工作范围：

```text
使用 $ssr-ppt-skill，把这篇报告做成 8 页离线 HTML 演示，只交付 HTML 和策划稿。
```

```text
使用 $ssr-ppt-skill，先为这份产品介绍整理大纲和逐页策划，暂不制作成品。
```

提供受众、目的、总页数、模板或品牌要求、素材与输出格式，可以减少需要澄清的信息。精确的总页数包含封面和结束页。

## 工作方式

需求与证据整理 → 大纲与逐页策划 → 视觉制作 → 实际预览与修复 → 交付。

两种格式使用相同内容和数据，分别制作、分别验收。布局由内容决定，可使用 Bento 卡片，也可使用整页图表、图片、流程或观点页。

## 环境与编辑范围

这是工作指令和 HTML 播放器资源。PPTX 由执行环境中已有的制作引擎生成，仓库不包含 Office 或 PPTX 转换引擎。

- Codex 桌面环境优先使用已提供的 `presentations:Presentations`、bundled runtime 与 `@oai/artifact-tool`。
- 其他环境可使用已安装的 PptxGenJS 等原生 PPTX 工具，并须具备实际渲染和浏览器检查能力。
- 照片、标志和插画仍是图片；文字、表格和数据图表的原生编辑能力单独验证。
- HTML 动画和复杂网页效果不保证在 PPTX 中原样保留；整页截图或整页 SVG 不算原生可编辑 PPTX。
- 默认由当前 Codex 执行，不要求 Gemini、Grok 或外部 CLI。Web Brain / Inner Web Brain 仅在用户为当前任务明确要求时使用。

缺少必要能力时，Skill 要求说明已完成内容与未完成的验收项，不把未检查的文件称为完成。

## 已验证范围

使用三页本地样例验证了：

- Skill 结构、UTF-8 元数据与内部文档链接。
- HTML 离线打开、按钮与键盘翻页、首尾页边界、隐藏页焦点、小视口缩放、全屏和三页打印；浏览器无错误。
- PPTX 导出检查、最终文件重新导入与逐页渲染；原生文字、表格单元格及图表值修改后，保存、重载与渲染结果一致。

PPTX 验证使用生成库，尚未在 PowerPoint 中实机测试。上述验证覆盖样例与播放器，不保证任意主题或任意执行环境都无需修正。

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
    ├── html.md
    └── pptx.md
```

播放器资源应内联进入最终 HTML，不引用技能安装目录。逐页策划和两种格式的具体验收要求见对应 `references` 文档。
