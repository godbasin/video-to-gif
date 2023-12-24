# 被删的视频转 Gif 小工具

因为想给家里啊猪猫猫和小朋友们做表情包，发现网上免费的工具转出来的 Gif 图都太大啦，而手机上好用的 APP 又要花钱，所以就打算自己做一个啦~

## 支持的功能

1. MP4 视频转 Gif。
2. 选择视频开始和结束时间。
3. 选择裁剪视频范围。
4. 设置视频 FPS 和生成 GIF 图宽度。

## [点击此处访问页面](https://godbasin.github.io/video-to-gif/)

![](https://github-imglib-1255459943.cos.ap-chengdu.myqcloud.com/video2gif-website.png)

## 简单介绍

使用到的框架和库包括：

- React + Vite + Typescript
- [ffmpeg](https://github.com/ffmpegwasm/ffmpeg.wasm)
- [cropperjs](https://github.com/fengyuanchen/cropperjs)

## 如何使用

```cmd
// 安装依赖
npm install

// 本地构建
npm run dev

// 打包构建
npm run build
```
