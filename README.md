# 左手右手像素故事 MV

本仓库是原创动画源项目，不包含用户提供的歌曲视频或歌词正文。目标素材为本机 public/source/left-hand-right-hand.mp4，时长 71.169 秒；复制到该路径后本机预览和渲染。音源遵循 .gitignore，切勿推送到公开仓库。

## 快速开始
1. 运行 npm install
2. 把上传的视频复制到 public/source/left-hand-right-hand.mp4
3. 运行 npm run studio，在 Studio 中选择横版或竖版 composition
4. 运行 npm run render:landscape 和 npm run render:portrait

输出在 out/。两版分别为 1920×1080 与 1080×1920，30 fps，2135 帧（约 71.167 秒）。竖版独立构图，不从横版裁切。

## 素材与时间
上传文件规格：71.169 秒、576×1280、H.264 + AAC。公开发行页列出的全曲时长为 2:41，因此本项目只制作用户选定的 71 秒片段。公开 LRC cue 仅作初始位置，见 captions/cues.json；最终字幕时间须在本机按实际素材校准。歌词文本保持空白，未获用户提供/授权的歌词不要补写。

## 创作方向
原创像素旅人芽芽与光灵点点：遇到断路后用方向与希望互补，通过合拍让道路连起来，最终并肩前行。不要使用《喜羊羊与灰太狼》的角色、美术、标志或截图。Canvas 使用按帧确定的绘图，关闭图像平滑以保持像素边缘。

## 技术
React + Remotion compositions 与 CLI 渲染；Canvas 2D 按 Remotion 当前帧绘图。官方文档：Composition https://www.remotion.dev/docs/composition 、Rendering https://www.remotion.dev/docs/render 、Audio https://www.remotion.dev/docs/using-audio 。

Remotion 的许可需按个人/组织规模和使用用途查看官方条款。
