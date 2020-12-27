## yarn 使用

需要在`package.json`中添加`postinstall`

```json
  "scripts": {
    "postinstall": "type-sync"
  }
```

## TODO

1. 完全匹配安装命令（add、install）
2. 删除包（uninstall、remove）操作处理
3. 卸载时，删除.hooks/postinstall

## Record
1. npm install xxx 后执行 ./hooks/postinstall 只能安装一个包
2. `exec('npm install @types/xxx')` 执行太慢
