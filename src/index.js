const fs = require('fs');
const path = require('path');
const axios = require('axios');
const sharp = require('sharp'); // 使用sharp库进行图片格式转换，确保已安装：npm install sharp


// 从本地文件路径读取图片
function readImageFromPath(filePath) {
  return fs.promises.readFile(filePath);
}

// 从URL读取图片
async function readImageFromUrl(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'binary');
}

// 压缩图片
async function compressImage(buffer) {
  const webpBuffer = await sharp(buffer)
    .toFormat('webp')
    .toBuffer()
  return webpBuffer
}
// 获取文件名（不包含扩展名）
function getBaseName(filename, extensions) {
  const extensionRegex = new RegExp(`\\.${extensions.join('|')}$`, 'i');
  return filename.replace(extensionRegex, '');
}

// 主函数，接收图片源（本地路径或URL）
async function processImage(source) {
  let buffer;


  try {
    if (source && source.indexOf('http') === 0) {
      // 如果源是URL，从URL读取图片
      buffer = await readImageFromUrl(source);
    } else {
      // 否则，从本地路径读取图片
      buffer = await readImageFromPath(source);

    }

    // 压缩图片
    const compressedBuffer = await compressImage(buffer);

    // 返回压缩后的图片Buffer
    return compressedBuffer;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
}

module.exports = (ctx) => {
  const register = () => {
    ctx.helper.beforeTransformPlugins.register('to-webp', {
      async handle(ctx) {
        const possibleExtensions = ['.jpg', '.png', '.jpeg']
        let webpPath
        let upload_Image = []
        let files = ctx.input
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          const ext = path.extname(file).toLowerCase();
          // 检查文件扩展名是否在possibleExtensions中
          if (!possibleExtensions.includes(ext)) {
            // 如果不是指定的图片类型，则直接添加到结果数组中
            upload_Image.push(file);
            continue;
          }
          try {
            const imgBuffer = await processImage(file)
            const baseName = getBaseName(path.basename(file), possibleExtensions);
            webpPath = path.join('./webpout', baseName + '.webp')
            if (!fs.existsSync('./webpout')) {
              fs.mkdirSync('./webpout', { recursive: true });
            }
            fs.writeFile(webpPath, imgBuffer, (err) => {
              if (err) throw err;
              console.log(webpPath);
            });
          }
          catch (error) {
            console.error('转换图片失败:', error)
          }
          upload_Image.push(webpPath)
        }
        ctx.input = upload_Image
      }
    })
  }
  return {
    register
  }
}
