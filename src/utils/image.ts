// 图片加载优化工具
// 使用 jsDelivr CDN 加速 GitHub Pages 上的静态资源

const CDN_PREFIX = 'https://cdn.jsdelivr.net/gh/SDTCU/SDTCU.github.io@gh-pages';

/**
 * 解析图片路径
 * 在开发环境下直接返回原始路径
 * 在生产环境下将本地路径转换为 jsDelivr CDN 路径
 * @param path 图片路径 (e.g., '/logos/sdu.png')
 */
export const resolveImage = (path: string): string => {
  // 如果是完整的 URL (http/https)，直接返回
  if (path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }

  // 尝试使用 WebP (简单地替换扩展名)
  // 注意：这需要确保对应的 WebP 文件确实存在
  // 我们将在构建脚本中生成这些 WebP 文件
  const webpPath = path.replace(/\.(png|jpg|jpeg)$/i, '.webp');

  // 开发环境使用本地文件
  if (import.meta.env.DEV) {
    return webpPath;
  }

  // 生产环境使用 CDN
  // 移除开头的 / 以避免双重斜杠
  const cleanPath = webpPath.startsWith('/') ? webpPath.slice(1) : webpPath;
  return `${CDN_PREFIX}/${cleanPath}`;
};
