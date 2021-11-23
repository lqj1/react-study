## jira笔记

### 一、 项目初始化与配置

在项目上传之前格式化：

```
npx mrm lint-staged
```

JSON Server: 符合rest api，用于做模拟服务端

```json
// 全局安装
npm i json-server -g
// 局部安装
yarn add json-server -D
// 局部安装后在package的scripts中添加 
// "json-server": "json-server __json_server_mock__/db.json --watch"
```

启动命令

```
json-server --watch filename
```

