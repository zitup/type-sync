## TOFIX
1. npm install package 
@types/package 不在package.json添加
2. npm install --ignore-scripts 仍然触发 ./hooks/postinstall
3. npm install @types/package -D --ignore-scrpts 仍然触发 type-sync scirpts postinstall
(2,3 无实际影响，有一些干扰信息)

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
