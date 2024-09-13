## picgo-plugin-to-webpPicgo图片处理插件

Image to webp.
> ClI only, GUI plugin is not tested.
## 图片处理工具
> 本项目提供了一套完整的图片处理工具，包括从本地文件路径或 URL 读取图片、压缩图片并将其转换为 WebP 格式的功能。以下是详细的使用说明和配置指南。

### Install安装
```bash
picgo add to-webp
```
### Usage使用方法
```bash
picgo use plugins
```
### Options注意事项
1. 安全性
- 确保提供的 URL 是合法的，避免注入攻击。
- 确保提供的本地文件路径是有效的。
2. 异常处理
- 程序中已经包含了异常处理逻辑，确保在发生错误时能够捕获并记录错误信息。
3. 性能优化
- 使用 Promise.all 批量处理文件，提高并发性能。
4. 目录创建
- 程序会自动创建 ./webpout 目录用于保存转换后的 WebP 图片。
### 贡献指南
欢迎贡献代码和提出改进建议。请遵循以下步骤：

1. 克隆仓库。
2. 创建一个新的分支。
3. 提交你的更改。
4. 提交 Pull Request。
   
### 鸣谢
本项目感谢以下开源库和工具：
- [sharp](https://github.com/lovell/sharp)

### 许可证
本项目采用 MIT 许可证。

如有任何问题或建议，请随时联系我！