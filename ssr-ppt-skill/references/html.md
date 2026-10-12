# HTML 演示制作与验收

## 交付约定

默认生成单个 `index.html`，CSS、播放器脚本和必要媒体内联，直接打开即可演示。字体优先用已确认可用的系统字体；需要随文件携带的字体须有可用文件与相应使用许可。不要依赖 CDN、远端字体或构建服务器才能打开。素材很大时，可按用户要求交付完整目录，确保相对路径与全部资源随包提供。

默认 16:9，画布 1280×720；用户模板比例优先。用固定画布整体缩放，保持窄视口下页面完整可见，而不是把页面正文重新排成网页长文。两种格式共享内容与配色；网页交互和动画无需搬成 PPTX，保证静态核心内容完整。

## 复用播放器

`assets/player.css` 和 `assets/player.js` 处理画布缩放、前后页、键盘、页码、全屏和打印。把文件内容内联在 HTML 的 `<style>` 与末尾 `<script>` 中；不要在成品中引用技能安装目录。它们不会读取外部服务。

按下述 DOM 契约制作页面内容与视觉。画布尺寸可通过数据属性修改，脚本会设置对应 CSS 变量。

```html
<div class="ssr-player">
  <main class="ssr-stage" aria-label="演示画布">
    <div id="ssr-deck" data-width="1280" data-height="720">
      <section class="ssr-slide" aria-label="第 1 页：页面标题">
        <!-- 放入该页实际正文、图表与素材 -->
      </section>
      <!-- 按策划稿添加其余 .ssr-slide -->
    </div>
  </main>
  <nav class="ssr-controls" aria-label="演示控制">
    <button type="button" data-ssr-prev>上一页</button>
    <output data-ssr-count aria-live="polite"></output>
    <button type="button" data-ssr-next>下一页</button>
    <button type="button" data-ssr-fullscreen>全屏</button>
    <span data-ssr-status role="status"></span>
  </nav>
</div>
```

在实际成品中替换示例注释为内容，不留空页。给页面自定义背景、字体、版式和图表样式；播放器不提供统一卡片模板。播放器至少要有一页，方向键、PageUp/PageDown、Home/End 可翻页；编辑输入时不截获按键。

页面图表可用 HTML/CSS、内联 SVG 或已有图表工具；两种格式都要时，图表数据同时用于原生 PPTX 图表。普通文本保留真实文字。需要动画时遵守减少动态效果偏好，避免动画结束前核心内容不可见。

## 实际打开检查

使用可用的浏览器工具或已安装 Playwright 等工具打开**最终 HTML**。桌面 Codex 的 `open_in_codex` 仅展示文件，检查仍需浏览器实际操作或自动化工具。

1. 等待字体就绪与图片加载；监听控制台错误、页面异常和失败的资源请求。
2. 逐页截图并查看最终显示效果，检查页面边缘、换行、标签和重叠；DOM 尺寸检查只用于定位，不能替代看图。
3. 测试前后按钮、方向键、Home/End、首尾页边界及页码；确认隐藏页不参与键盘焦点。
4. 在常用宽屏与小视口打开，检查缩放后页面完整可见、控制区可操作。
5. 测试全屏（环境允许时）以及打印预览；打印必须包含所有页面且隐藏控制区。若自定义比例，同步打印纸张尺寸。
6. 关闭网络或拦截外部请求后重新载入，确认默认单文件交付可以离线使用。

修复本次错误后重新查看受影响页面。验收记录保留于构建目录，用户未要求时无需逐项汇报。
