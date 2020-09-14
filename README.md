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
